import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { isLive } from "../lib/learn";
import { subjectBySlug } from "../data/subjects";

/** New and updated library entries and guides, for readers and for crawlers that follow feeds. */
export async function GET(context: { site: URL }) {
  const learn = (await getCollection("learn")).filter(isLive);
  const guides = (await getCollection("guides")).filter((g) => g.data.status === "published");
  const items = [
    ...learn.map((e) => ({
      title: `[${subjectBySlug(e.data.subject)!.name}] ${e.data.h1}`,
      description: e.data.description,
      link: `/learn/${e.data.subject}/${e.id.split("/").pop()}/`,
      pubDate: e.data.updated,
    })),
    ...guides.map((g) => ({ title: g.data.h1, description: g.data.description, link: `/guides/${g.id}/`, pubDate: g.data.updated })),
  ].sort((a, b) => +b.pubDate - +a.pubDate);
  return rss({
    title: "Qlip 학습 라이브러리",
    description: "대학 이공계 전공 개념과 예제 해설, 공부 가이드",
    site: context.site,
    items,
    customData: "<language>ko-kr</language>",
  });
}
