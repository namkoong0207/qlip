# qlip.kr

Qlip 공식 홈페이지. Astro 정적 사이트 → GitHub Pages(qlip.kr, Cloudflare 경유).

## 자주 하는 일

| 하고 싶은 것 | 방법 |
|---|---|
| 로컬에서 보기 (검수 전 글 포함) | `npm install` 후 `npm run dev` → http://localhost:4321 |
| 운영과 똑같이 빌드해 보기 | `npm run build && npm test` |
| 라이브러리 정답 검산 | `scripts/.venv/bin/python scripts/learn/check.py` (처음 한 번: `python3 -m venv scripts/.venv && scripts/.venv/bin/pip install -r scripts/learn/requirements.txt`) |
| 가격·크레딧 바꾸기 | `src/data/pricing.ts` 한 파일. 앱의 `functions/src/credits.ts`, App Store Connect 가격과 맞출 것 |
| 검색엔진 인증 값 넣기 | `src/config/site.ts` → `verification` |
| GA4 켜기 | `src/config/site.ts` → `ga4Id`. **개인정보처리방침 개정과 같은 날** |
| App Store 캠페인 추적 | `src/config/site.ts` → `appStore.providerToken` (App Store Connect의 pt 값) |

## 학습 라이브러리 글 검수·공개하기

글은 `src/content/learn/<과목>/<slug>.mdx`. 파일 경로가 곧 URL(`/learn/<과목>/<slug>/`)이고, **공개 후에는 경로를 바꾸지 않습니다.**

상태(`status`) 흐름:

1. `draft` — 작성 중
2. `ai-verified` — `check.py`가 정답 검산을 모두 통과 (`check.py --mark`가 바꿔 줌)
3. `published` — 사람이 검수함. 이때만 운영 사이트에 나갑니다.

검수 절차:

1. `npm run dev`로 글을 열어 읽습니다(노란 "검수 전" 띠가 보임).
2. 체크리스트: 정답이 맞다 · 단계가 앞 단계에서 이어진다 · 기호·단위가 일관된다 · '자주 하는 실수'가 실제로 흔하다 · 교재 용어와 맞다 · 특정 교재 문제와 같지 않다 · 휴대폰 폭에서 수식이 읽힌다 · 요약 3줄만 읽어도 정확하다.
3. 고칠 게 있으면 본문을 고치고 `updated` 날짜를 바꿉니다. 숫자를 바꿨다면 `checks`도 같이 바꾸고 `check.py`를 다시 돌립니다.
4. 맞으면 frontmatter를 이렇게 바꿉니다.

   ```yaml
   status: published
   review:
     by: 남궁재환
     credential: (선택) 예: 기계공학과
     date: 2026-12-03
   ```

5. 커밋 → main에 병합하면 자동 배포됩니다.

본문에서 다른 라이브러리 글로 직접 링크했다면, 그 글도 공개된 뒤에 함께 공개하세요. 공개 전 글을 가리키는 링크가 있으면 `npm test`(CI)가 배포를 막습니다. frontmatter의 `prerequisites`·`related`는 공개된 글만 자동으로 보여 주므로 신경 쓰지 않아도 됩니다.

가이드(`src/content/guides/*.mdx`)는 `status: draft` → `published`만 있습니다.

## 새 글 쓰기 원칙

- 한 개념 = 한 페이지. 비슷한 문제는 새 페이지가 아니라 같은 페이지의 예제·연습 문제로.
- 예제와 연습 문제는 직접 만든 문제만(`provenance: original`). 교재·족보·사용자 업로드 문제 금지.
- 모든 정답에 SymPy `checks`를 붙입니다. 검산식은 답을 다시 대입하거나 미분하는 식으로, 본문과 독립적으로 확인해야 합니다.
- 필수 구성: 개념 → 핵심 공식 → `<Example>` → `<Step>`들 → `<Answer>` → `<Mistake>`들 → `<Practice>`들.

## 배포

- `main`에 push하면 `.github/workflows/deploy.yml`이 검산 → 빌드 → 테스트 → Pages 배포 → IndexNow 알림 순서로 실행합니다. 한 단계라도 실패하면 배포되지 않습니다.
- 처음 한 번: GitHub 저장소 Settings → Pages → Source를 **GitHub Actions**로 바꿉니다.
- 되돌리기: 이전 커밋으로 `git revert` 후 push. 개편 전 사이트는 태그 `pre-astro-2026-11`.

## 지키는 URL

`/privacy.html`, `/terms.html`, `/support.html`, `/delete-account.html`은 App Store Connect와 앱이 링크하는 주소라 파일명이 바뀌면 안 됩니다. 본문은 `src/legal/*.html`에 예전 그대로 있고, `npm test`가 네 주소가 빌드에 있는지 확인합니다.
