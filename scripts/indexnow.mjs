// After a deploy, hand every URL in the live sitemap to IndexNow (Bing, Naver,
// Yandex, Seznam share submissions). Google does not take part; it reads the
// sitemap. The key file public/<key>.txt proves the site is ours.
import { readdirSync } from "node:fs";

const key = readdirSync(new URL("../public/", import.meta.url)).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.slice(0, -4);
if (!key) throw new Error("IndexNow key file missing from public/");

const xml = await (await fetch("https://qlip.kr/sitemap-0.xml")).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: "qlip.kr", key, keyLocation: `https://qlip.kr/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${urlList.length} URLs → HTTP ${res.status}`);
