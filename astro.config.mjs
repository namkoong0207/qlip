// qlip.kr — static site. Every page's text is in the HTML Astro writes at build
// time, so crawlers that never run JavaScript (most AI crawlers) read it all.
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { unified } from "@astrojs/markdown-remark";

// Pages that exist for people who already have the app, or that carry no
// search intent. They stay reachable; they just don't ask to be indexed.
const NOT_IN_SITEMAP = ["/404"];
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
      filter: (page) => !NOT_IN_SITEMAP.some((p) => new URL(page).pathname.startsWith(p)),
      serialize(item) {
        const u = new URL(item.url);
        if (LEGACY_HTML.includes(u.pathname.replace(/\/$/, ""))) u.pathname = u.pathname.replace(/\/$/, "") + ".html";
        return { ...item, url: u.toString() };
      },
    }),
  ],
});
