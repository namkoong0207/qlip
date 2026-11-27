#!/usr/bin/env python3
"""Check every learning-library entry before a person reviews it.

    scripts/.venv/bin/python scripts/learn/check.py            # report
    scripts/.venv/bin/python scripts/learn/check.py --mark     # also draft → ai-verified when all pass

For each entry:
  1. every `checks[].sympy` expression evaluates to True (answers re-derived
     independently of the prose: differentiate the antiderivative, substitute
     the solution back into the ODE, multiply the matrices, …)
  2. required sections exist (개념, 공식, 예제, 해설, 정답, 실수, 연습)
  3. no two entries are near-duplicates (word-shingle Jaccard ≥ 0.45 fails)

KaTeX syntax is checked by `astro build` itself (rehype-katex throwOnError).
Entry files are this repository's own content, so evaluating them is fine.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import sympy
import yaml

ROOT = Path(__file__).resolve().parents[2] / "src" / "content" / "learn"
REQUIRED = {
    "개념": r"^## .*개념",
    "핵심 공식": r"^## .*공식",
    "예제": r"<Example",
    "단계별 해설": r"<Step ",
    "정답": r"<Answer",
    "자주 하는 실수": r"<Mistake ",
    "연습 문제": r"<Practice ",
}
DUP_THRESHOLD = 0.45


def split(path: Path) -> tuple[dict, str, str]:
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.S)
    if not m:
        raise ValueError("no frontmatter")
    return yaml.safe_load(m.group(1)), m.group(2), text


def run_check(expr: str) -> tuple[bool, str]:
    ns: dict = {}
    exec("from sympy import *", ns)
    ns["sympy"] = sympy
    try:
        value = eval(expr, ns)  # noqa: S307 — repository content, see docstring
    except Exception as e:  # report, don't crash the whole run
        return False, f"error: {type(e).__name__}: {e}"
    if value is True or value == sympy.true:
        return True, ""
    return False, f"evaluated to {value!r}"


def shingles(body: str, k: int = 5) -> set[tuple[str, ...]]:
    plain = re.sub(r"\$[^$]*\$|<[^>]+>|[#*`>{}\\]", " ", body)
    words = plain.split()
    return {tuple(words[i : i + k]) for i in range(max(0, len(words) - k + 1))}


def main() -> int:
    mark = "--mark" in sys.argv
    files = sorted(ROOT.rglob("*.mdx"))
    failures = 0
    bodies: dict[str, set] = {}
    for path in files:
        rel = path.relative_to(ROOT)
        try:
            fm, body, raw = split(path)
        except Exception as e:
            print(f"✗ {rel}: {e}")
            failures += 1
            continue
        problems = []
        for c in fm.get("checks", []):
            ok, why = run_check(c["sympy"])
            if not ok:
                problems.append(f"check {c['id']} ({c['claim']}): {why}")
        for name, pattern in REQUIRED.items():
            if not re.search(pattern, body, re.M):
                problems.append(f"missing section: {name}")
        bodies[str(rel)] = shingles(body)
        if problems:
            failures += 1
            print(f"✗ {rel}")
            for p in problems:
                print(f"    {p}")
        else:
            n = len(fm.get("checks", []))
            print(f"✓ {rel}  ({n} checks)")
            if mark and fm.get("status") == "draft":
                path.write_text(raw.replace("status: draft", "status: ai-verified", 1), encoding="utf-8")
                print("    status: draft → ai-verified")

    names = list(bodies)
    for i, a in enumerate(names):
        for b in names[i + 1 :]:
            sa, sb = bodies[a], bodies[b]
            if sa and sb:
                j = len(sa & sb) / len(sa | sb)
                if j >= DUP_THRESHOLD:
                    failures += 1
                    print(f"✗ near-duplicate ({j:.2f}): {a} ↔ {b}")

    print(f"\n{len(files)} entries, {failures} with problems")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
