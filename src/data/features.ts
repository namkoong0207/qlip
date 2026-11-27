/** Features as the app ships them in 1.3.0. Nothing here is unreleased. */
export const FEATURES = [
  { slug: "ai-solver", name: "AI 문제풀이", short: "사진으로 찍은 전공 문제를 단계별로 해설하고, 다른 AI가 다시 풀어 검증해요." },
  { slug: "jokbo", name: "족보 해설", short: "족보 사진·PDF를 문항별 문제집으로 나누고, 고른 문항만 해설받아요." },
  { slug: "review", name: "다시 풀기·복습", short: "해설을 가리고 다시 풀고, 틀린 문제를 시험 전에 모아 봐요." },
  { slug: "concept-questions", name: "개념 질문", short: "문제 없이 개념만 물어봐도 정의·식·예시·흔한 오해까지 정리해 드려요." },
  { slug: "ipad", name: "iPad", short: "문제와 해설을 나란히 보고, Apple Pencil로 직접 다시 풀어요." },
] as const;
