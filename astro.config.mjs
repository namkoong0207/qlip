// qlip.kr — static site. Every page's text is in the HTML Astro writes at build
// time, so crawlers that never run JavaScript (most AI crawlers) read it all.
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { unified } from "@astrojs/markdown-remark";
import { readFileSync, readdirSync } from "node:fs";

// Pages that exist for people who already have the app, or that carry no
// search intent. They stay reachable; they just don't ask to be indexed.
const NOT_IN_SITEMAP = ["/404"];

// Pages that render with noindex must not be offered in the sitemap. A subject
// hub or the guides index is noindex until something in it is published, so
// read the content status here the same way the pages do.
const status = (file) => /^status:\s*(\S+)/m.exec(readFileSync(file, "utf8"))?.[1];
const LIVE = new Set(["published", "needs-update"]);
const learnDir = "./src/content/learn";
const liveSubjects = new Set(
  readdirSync(learnDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => readdirSync(`${learnDir}/${d.name}`).some((f) => f.endsWith(".mdx") && LIVE.has(status(`${learnDir}/${d.name}/${f}`))))
    .map((d) => d.name),
);
const guidesLive = readdirSync("./src/content/guides").some((f) => f.endsWith(".mdx") && status(`./src/content/guides/${f}`) === "published");
// The URL a page names as its canonical: legacy pages end in .html, every
// other page in a slash. The sitemap must use exactly that form.
const canonicalPath = (pathname) => {
  const bare = pathname.replace(/\/$/, "");
  if (LEGACY_HTML.includes(bare)) return `${bare}.html`;
  return bare === "" ? "/" : `${bare}/`;
};
const isNoindex = (pathname) => {
  const hub = /^\/learn\/([^/]+)\/$/.exec(pathname);
  if (hub) return !liveSubjects.has(hub[1]);
  if (pathname === "/guides/") return !guidesLive;
  return false;
};
// Pages that keep their old `.html` URL. The sitemap must list the same URL the
// page's canonical names, or search engines see two addresses for one page.
const LEGACY_HTML = ["/privacy", "/terms", "/support", "/delete-account"];

export default defineConfig({
  site: "https://qlip.kr",
  // `preserve` keeps `src/pages/privacy.astro` → `privacy.html` (the URL App Store
  // Connect and the app link to) while `src/pages/learn/index.astro` → `learn/index.html`.
  build: { format: "preserve" },
  trailingSlash: "ignore",
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      // MathML output carries the original TeX in <annotation>, so a formula is
      // readable as text by search engines and screen readers, not only drawn.
      rehypePlugins: [[rehypeKatex, { output: "htmlAndMathml", strict: "error", throwOnError: true }]],
      smartypants: false,
    }),
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const pathname = canonicalPath(new URL(page).pathname);
        return !NOT_IN_SITEMAP.some((p) => pathname.startsWith(p)) && !isNoindex(pathname);
      },
      serialize(item) {
        const u = new URL(item.url);
        u.pathname = canonicalPath(u.pathname);
        return { ...item, url: u.toString() };
      },
    }),
  ],
});
