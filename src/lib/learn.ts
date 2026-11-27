import { getCollection, type CollectionEntry } from "astro:content";

export type LearnEntry = CollectionEntry<"learn">;

/** Entries live on the public site. In `astro dev`, unreviewed ones too, for review. */
export const isLive = (e: { data: { status: string } }) =>
  e.data.status === "published" || e.data.status === "needs-update";

export const showDrafts = import.meta.env.DEV || process.env.PREVIEW_DRAFTS === "1";

export async function learnEntries(): Promise<LearnEntry[]> {
  const all = await getCollection("learn");
  return all
    .filter((e) => showDrafts || isLive(e))
    .sort((a, b) => a.data.order - b.data.order);
}

/** `engineering-math/laplace-ivp` → `laplace-ivp`. The file path is the URL. */
export const slugOf = (e: LearnEntry) => e.id.split("/").pop()!;
export const pathOf = (e: LearnEntry) => `/learn/${e.data.subject}/${slugOf(e)}/`;

export function guidesFilter(e: { data: { status: string } }) {
  return showDrafts || e.data.status === "published";
}
