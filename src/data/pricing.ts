/**
 * Prices and credit amounts as the app sells them. One source for /pricing, the
 * home page summary, the FAQ and the JSON-LD offers.
 *
 * Credit amounts must match `functions/src/credits.ts` in the app repo (the
 * server is the authority). Won prices must match App Store Connect — check
 * there before changing anything here. Last checked: 2026-11-27
 * (credits.ts: free 15 / pro 180 / max 400; Qlip.storekit: 11,900 / 23,900;
 * credit packs 1,500 / 3,300 / 6,900).
 */
export const PRICING_CHECKED = "2026-11-27";

export type Plan = {
  id: "free" | "pro" | "max";
  name: string;
  weeklyCredits: number;
  monthlyKRW: number | null;
  passKRW: number | null;
  summary: string;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "무료",
    weeklyCredits: 15,
    monthlyKRW: null,
    passKRW: null,
    summary: "가입하면 7일마다 15크레딧이 다시 채워져요. 족보 문항 나누기는 크레딧 없이 하루 10번까지.",
  },
  {
    id: "pro",
    name: "Pro",
    weeklyCredits: 180,
    monthlyKRW: 11900,
    passKRW: 4900,
    summary: "시험 기간에도 넉넉하게. 해설 수십 개와 질문을 매주 쓸 수 있어요.",
  },
  {
    id: "max",
    name: "Max",
    weeklyCredits: 400,
    monthlyKRW: 23900,
    passKRW: 9900,
    summary: "족보를 통째로 해설받는 사람을 위한 등급이에요.",
  },
];

export const CREDIT_PACKS = [
  { credits: 40, priceKRW: 1500 },
  { credits: 100, priceKRW: 3300 },
  { credits: 240, priceKRW: 6900 },
];

/** What each action costs. Mirrors `credits.ts` and the in-app explanation. */
export const CREDIT_COSTS = [
  { action: "문제 해설 1개", credits: "3", note: "검증에서 걸려 한 번 더 풀면 최대 5. 시작하려면 5크레딧이 있어야 해요." },
  { action: "단계·개념 질문 1개", credits: "1", note: "" },
  { action: "족보 문항 나누기", credits: "무료", note: "하루 10번까지. 넘으면 페이지당 1." },
  { action: "사진이 흐리거나 중간에 멈춘 해설", credits: "돌려드려요", note: "자동으로 최대 3." },
  { action: "틀린 해설 신고", credits: "돌려드려요", note: "3크레딧을 돌려드리고 새로 풀어 드려요." },
];

export const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;
