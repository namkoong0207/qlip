/**
 * Facts about Qlip that more than one page states. Change them here, not in a page.
 *
 * The identity sentence is the one description every channel should repeat word
 * for word (App Store, /about, JSON-LD, Instagram bio): assistants trust a
 * description they find stated the same way in several places.
 */
export const SITE = {
  url: "https://qlip.kr",
  name: "Qlip",
  appStoreName: "Qlip - 대학생 AI 문제풀이",
  tagline: "대학생을 위한 AI 문제풀이",
  identity:
    "Qlip은 대학생을 위한 AI 문제풀이 앱입니다. 미적분학·공업수학·일반물리학 같은 전공 문제를 사진으로 찍으면 단계별 해설을 만들고, 다른 AI가 처음부터 다시 풀어 검증합니다. 해설 없는 족보는 문항별로 나눠 문제집으로 만들고, 저장한 문제는 다시 풀기와 복습으로 시험 직전까지 관리합니다. iPhone·iPad용이며 매주 무료 크레딧으로 시작할 수 있습니다.",
  email: "support@qlip.kr",
  instagram: "", // e.g. "https://www.instagram.com/…" — left empty until confirmed
  minOS: "iOS·iPadOS 26.2 이상",
  business: {
    name: "남궁(Namkoooong)",
    owner: "남궁재환",
    registration: "856-01-03862",
  },
  defaultOgImage: "/assets/img/og.png",

  /**
   * Search engine ownership tags. A value that is set is written into the
   * <head> of every page, so a redesign can never drop one.
   * Google is verified by DNS TXT already; fill `google` only if HTML-tag
   * verification is ever needed.
   */
  verification: {
    naver: "0bcca00eafc8b18704cf328968ef412a5b8d03ae",
    google: "",
    bing: "AE21FFFC10A88379DC781F121216CDEF",
  },

  /**
   * GA4 measurement ID ("G-…"). Empty means no analytics script is emitted.
   * Set it only together with the privacy-policy revision that discloses it.
   */
  ga4Id: "",

  appStore: {
    id: "6802022408",
    url: "https://apps.apple.com/kr/app/qlip/id6802022408",
    /** App Store Connect campaign provider token. Campaign codes are ignored without it. */
    providerToken: "",
  },
} as const;

/** App Store link tagged with a campaign code, so App Store Connect can say which page led to an install. */
export function appStoreUrl(campaign: string): string {
  const { url, providerToken } = SITE.appStore;
  if (!providerToken) return url;
  const u = new URL(url);
  u.searchParams.set("pt", providerToken);
  u.searchParams.set("ct", campaign);
  u.searchParams.set("mt", "8");
  return u.toString();
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}
