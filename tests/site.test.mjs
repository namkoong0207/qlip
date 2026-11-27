// Checks on the built site (run `npm run build` first). These are the things
// that silently break search: a lost verification tag, a moved legal URL, a
// link to a page that is not built, two pages with one title, a noindex page
// offered in the sitemap.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname;
const html = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html")) html.push(p);
  }
})(DIST);
const read = (p) => readFileSync(p, "utf8");
const rel = (p) => "/" + p.slice(DIST.length);

test("URLs that App Store Connect and the app link to still exist", () => {
  for (const f of ["privacy.html", "terms.html", "support.html", "delete-account.html", "index.html", "robots.txt", "CNAME"]) {
    assert.ok(existsSync(join(DIST, f)), `${f} missing from the build`);
  }
  assert.equal(read(join(DIST, "CNAME")).trim(), "qlip.kr");
});

test("every page carries the Naver verification tag", () => {
  for (const p of html) {
    assert.match(read(p), /<meta name="naver-site-verification" content="0bcca00eafc8b18704cf328968ef412a5b8d03ae"/, rel(p));
  }
});

test("indexable pages have a unique title, a description and a canonical", () => {
  const seen = new Map();
  for (const p of html) {
    const s = read(p);
    if (/name="robots" content="noindex/.test(s)) continue;
    const title = /<title>([^<]+)<\/title>/.exec(s)?.[1];
    assert.ok(title, `${rel(p)} has no title`);
    assert.ok(!seen.has(title), `${rel(p)} and ${seen.get(title)} share the title "${title}"`);
    seen.set(title, rel(p));
    assert.match(s, /<meta name="description" content="[^"]{40,}"/, `${rel(p)} description`);
    assert.match(s, /<link rel="canonical" href="https:\/\/qlip\.kr\//, `${rel(p)} canonical`);
  }
});

test("internal links point at pages that are built", () => {
  const missing = [];
  for (const p of html) {
    for (const [, href] of read(p).matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) {
      const target = href.endsWith("/") ? join(DIST, href, "index.html") : join(DIST, href);
      if (!existsSync(target) && !existsSync(target + ".html")) missing.push(`${rel(p)} → ${href}`);
    }
  }
  assert.deepEqual(missing, []);
});

test("the sitemap lists no noindex page and every listed page exists", () => {
  const xml = read(join(DIST, "sitemap-0.xml"));
  for (const [, loc] of xml.matchAll(/<loc>https:\/\/qlip\.kr([^<]*)<\/loc>/g)) {
    const file = loc.endsWith("/") ? join(DIST, loc, "index.html") : join(DIST, loc);
    assert.ok(existsSync(file), `sitemap lists ${loc}, not built`);
    assert.doesNotMatch(read(file), /name="robots" content="noindex/, `sitemap lists noindex ${loc}`);
  }
});

test("robots.txt names the sitemap and does not block search crawlers", () => {
  const robots = read(join(DIST, "robots.txt"));
  assert.match(robots, /^Sitemap: https:\/\/qlip\.kr\/sitemap-index\.xml$/m);
  for (const bot of ["Googlebot", "Bingbot", "Yeti", "OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"]) {
    assert.doesNotMatch(robots, new RegExp(`User-agent: ${bot}\\n(User-agent: .*\\n)*Disallow: /\\n`, "i"), bot);
  }
});
