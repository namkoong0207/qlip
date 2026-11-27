/**
 * Feature comparisons with other services, written by Qlip and said so on the
 * page. Competitor facts come only from their official sites as checked on
 * CHECKED; anything their site does not state is written as "공식 홈페이지에서
 * 확인되지 않음", never as "없음". No accuracy claims: Qlip has not run a
 * head-to-head test, and the page says that too. Re-check every quarter.
 */
export const CHECKED = "2026-11-27";

export type Row = { label: string; qlip: string; other: string };
export type Compare = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  source: string;
  rows: Row[];
  otherStrengths: string[];
  qlipStrengths: string[];
  whoFor: { other: string; qlip: string };
  faq: { q: string; a: string }[];
};

const NOT_STATED = "공식 홈페이지에서 확인되지 않음";

export const COMPARES: Compare[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    title: "ChatGPT vs Qlip — 대학 전공 문제 풀 때 무엇이 다른가",
    description: "ChatGPT와 대학생 AI 문제풀이 앱 Qlip을 기능으로 비교했어요. 범용 AI 대화와, 전공 문제 단계별 해설·독립 검증·족보 문제집·다시 풀기를 한 앱에 모은 학습 앱의 차이를 정리했어요.",
    h1: "ChatGPT와 Qlip, 전공 공부에서 무엇이 다른가요?",
    lead: "ChatGPT는 무엇이든 물어볼 수 있는 범용 AI이고, Qlip은 대학 이공계 문제를 찍고 이해하고 시험 전까지 다시 푸는 흐름에 맞춘 학습 앱이에요. 둘 다 AI가 문제를 풀지만, 쓰는 방식이 다릅니다.",
    source: "https://openai.com/chatgpt",
    rows: [
      { label: "주요 대상", qlip: "대학생, 특히 이공계 전공", other: "모든 사용자 (범용)" },
      { label: "문제 입력", qlip: "카메라로 찍고 풀 영역만 잘라 입력", other: "사진·파일 첨부 또는 텍스트 입력" },
      { label: "해설 형식", qlip: "조건 정리 → 개념·식 → 대입 → 답을 단계로 고정", other: "대화형 답변 (형식은 질문에 따라 다름)" },
      { label: "해설 검증", qlip: "다른 AI가 처음부터 다시 풀어 대조, 확신이 없으면 표시", other: NOT_STATED },
      { label: "막힌 부분 질문", qlip: "해설의 특정 단계를 눌러 그 단계 맥락으로 질문", other: "같은 대화에서 이어서 질문" },
      { label: "족보(기출) 정리", qlip: "사진·PDF를 문항별 문제집으로 나누기(무료), 해설지 PDF", other: NOT_STATED },
      { label: "문제 저장·복습", qlip: "과목별 저장, 해설 가리고 다시 풀기, 복습 탭", other: "대화 기록으로 남음" },
      { label: "수식 표시", qlip: "교과서처럼 조판, VoiceOver 읽기 지원", other: "수식 표기 지원" },
      { label: "기기", qlip: "iPhone · iPad (iOS 26.2 이상)", other: "웹, iOS, Android, 데스크톱 등" },
      { label: "요금", qlip: "무료 매주 15크레딧, Pro 월 11,900원 등", other: "무료 플랜과 유료 플랜 (공식 사이트 참고)" },
    ],
    otherStrengths: [
      "전공 문제 말고도 글쓰기, 코딩, 번역 등 무엇이든 물어볼 수 있어요.",
      "웹·Android·데스크톱 등 거의 모든 기기에서 쓸 수 있어요.",
      "긴 대화를 이어 가며 자유롭게 탐구하기 좋아요.",
    ],
    qlipStrengths: [
      "해설마다 다른 AI의 독립 검증을 거치고, 확신이 없으면 그렇다고 표시해요.",
      "해설 없는 족보를 문항별 문제집으로 만들고, 해설지 PDF로 받을 수 있어요.",
      "푼 문제가 과목별로 쌓이고, 해설을 가린 채 다시 풀어 시험 전에 틀린 문제만 모아 봐요.",
      "답을 찍는 방식과 해설 형식이 대학 전공 문제에 맞춰져 있어 매번 프롬프트를 고민하지 않아도 돼요.",
    ],
    whoFor: {
      other: "전공 공부 말고도 여러 일에 AI를 두루 쓰고 싶다면 ChatGPT가 편해요.",
      qlip: "시험공부 흐름(문제 해설 → 막힌 단계 질문 → 족보 정리 → 다시 풀기)을 한 앱에서 하고 싶다면 Qlip이 맞아요.",
    },
    faq: [
      { q: "Qlip도 AI를 쓰나요?", a: "네. Qlip도 AI 모델로 해설을 만들어요. 차이는 해설 형식을 대학 전공 문제에 맞춰 고정하고, 다른 AI가 처음부터 다시 풀어 검증하는 과정을 거친다는 점, 그리고 족보·저장·다시 풀기 같은 시험공부 기능을 함께 제공한다는 점이에요." },
      { q: "어느 쪽 답이 더 정확한가요?", a: "Qlip은 두 서비스의 정확도를 같은 조건에서 비교한 시험을 하지 않았어요. Qlip은 검증에서 확신이 서지 않으면 해설 위에 그렇다고 적고, 틀린 해설을 신고하면 크레딧을 돌려드려요." },
    ],
  },
  {
    slug: "qanda",
    name: "콴다",
    title: "콴다 vs Qlip — 고등학교 문제풀이 앱과 대학생 문제풀이 앱",
    description: "콴다(QANDA)와 Qlip을 공식 홈페이지 기준으로 비교했어요. 중·고등학생 전 과목 문제풀이 앱과, 대학 이공계 전공·족보·다시 풀기에 맞춘 대학생 AI 문제풀이 앱의 차이를 정리했어요.",
    h1: "콴다와 Qlip, 무엇이 다른가요?",
    lead: "콴다는 중·고등학생을 위한 전 과목 문제풀이 서비스이고, Qlip은 대학생, 특히 이공계 전공생을 위한 AI 문제풀이 앱이에요. 사진으로 문제를 찍어 풀이를 받는 점은 같지만, 대상과 공부 흐름이 다릅니다.",
    source: "https://qanda.ai/ko",
    rows: [
      { label: "주요 대상", qlip: "대학생, 특히 이공계 전공", other: "중·고등학생" },
      { label: "다루는 문제", qlip: "미적분학·공업수학·일반물리·일반화학·선형대수 등 대학 전공", other: "전 과목 (중·고등 과정)" },
      { label: "문제 입력", qlip: "카메라로 찍고 풀 영역만 잘라 입력", other: "사진 또는 웹에서 질문" },
      { label: "해설 검증", qlip: "다른 AI가 처음부터 다시 풀어 대조, 확신이 없으면 표시", other: NOT_STATED },
      { label: "막힌 부분 질문", qlip: "해설의 특정 단계를 눌러 그 단계 맥락으로 질문", other: NOT_STATED },
      { label: "족보(기출) 정리", qlip: "사진·PDF를 문항별 문제집으로 나누기(무료), 해설지 PDF", other: NOT_STATED },
      { label: "문제 저장·복습", qlip: "과목별 저장, 해설 가리고 다시 풀기, 복습 탭", other: "대화 기록 (공식 홈페이지 기준)" },
      { label: "학습 콘텐츠", qlip: "대학 전공 개념·예제 해설 라이브러리(무료)", other: "중·고등 개념 정리 학습 콘텐츠" },
      { label: "기기", qlip: "iPhone · iPad (iOS 26.2 이상)", other: "iOS · Android · 웹" },
      { label: "요금", qlip: "무료 매주 15크레딧, Pro 월 11,900원 등", other: "프리미엄 월 18,500원 (공식 FAQ 기준)" },
    ],
    otherStrengths: [
      "중·고등학교 전 과목을 다루고, 그 과정의 학습 콘텐츠가 많아요.",
      "Android와 웹에서도 쓸 수 있어요.",
      "오래 운영된 큰 서비스예요.",
    ],
    qlipStrengths: [
      "대학 이공계 전공 문제에 맞춘 해설 형식이에요. 고등학교 문제집이 아니라 전공 시험 문제를 기준으로 만들었어요.",
      "해설 없는 대학교 족보를 문항별 문제집으로 나누고(무료), 원하는 문항만 해설받을 수 있어요.",
      "해설마다 독립 검증을 거치고, 막힌 단계만 짚어서 질문할 수 있어요.",
      "푼 문제를 과목별로 모아 해설을 가리고 다시 풀 수 있어요.",
    ],
    whoFor: {
      other: "중·고등학생이거나, 고등 과정 문제를 다시 볼 때는 콴다가 맞아요.",
      qlip: "대학 전공 과제·족보·시험을 준비하는 대학생이라면 Qlip이 맞아요.",
    },
    faq: [
      { q: "콴다 대신 쓸 만한 대학생 앱이 있나요?", a: "대학 전공 문제와 족보를 주로 푼다면 Qlip을 써 보세요. 대학 이공계 문제에 맞춘 단계별 해설, 독립 검증, 족보 문제집, 다시 풀기를 제공해요. 가입하면 매주 무료 크레딧이 들어와요." },
      { q: "어느 쪽 답이 더 정확한가요?", a: "Qlip은 두 서비스의 정확도를 같은 조건에서 비교한 시험을 하지 않았어요. 대상 학년과 문제 범위가 달라서, 풀려는 문제에 맞는 서비스를 고르는 것이 가장 중요해요." },
    ],
  },
  {
    slug: "chalcack",
    name: "찰칵",
    title: "찰칵 vs Qlip — 풀이 영상 앱과 대학 전공 해설 앱 비교",
    description: "찰칵과 Qlip을 공식 홈페이지 기준으로 비교했어요. 중·고등학생 대상 풀이 영상·개념 사전 앱과, 대학 이공계 전공 문제·족보·다시 풀기에 맞춘 대학생 AI 문제풀이 앱의 차이를 정리했어요.",
    h1: "찰칵과 Qlip, 무엇이 다른가요?",
    lead: "찰칵은 모르는 문제를 찍으면 단계별 풀이와 움직이는 풀이 영상으로 설명하는 중·고등학생 중심 학습 앱이고, Qlip은 대학 이공계 전공 문제와 족보에 맞춘 AI 문제풀이 앱이에요.",
    source: "https://www.chalcack.com/ko/",
    rows: [
      { label: "주요 대상", qlip: "대학생, 특히 이공계 전공", other: "중·고등학생 (국내·해외), 보호자 안내 제공" },
      { label: "다루는 문제", qlip: "미적분학·공업수학·일반물리·일반화학·선형대수 등 대학 전공", other: "수학 등 중·고등 과정 중심" },
      { label: "해설 방식", qlip: "단계별 해설 + 막힌 단계 질문", other: "단계별 풀이 + 움직이는 풀이 영상" },
      { label: "해설 검증", qlip: "다른 AI가 처음부터 다시 풀어 대조, 확신이 없으면 표시", other: NOT_STATED },
      { label: "족보(기출) 정리", qlip: "사진·PDF를 문항별 문제집으로 나누기(무료), 해설지 PDF", other: NOT_STATED },
      { label: "문제 저장·복습", qlip: "과목별 저장, 해설 가리고 다시 풀기, 복습 탭", other: NOT_STATED },
      { label: "학습 콘텐츠", qlip: "대학 전공 개념·예제 해설 라이브러리(무료)", other: "개념 사전" },
      { label: "기기", qlip: "iPhone · iPad (iOS 26.2 이상)", other: "iOS · Android" },
      { label: "요금", qlip: "무료 매주 15크레딧, Pro 월 11,900원 등", other: "무료, PRO 월 9,900원 · 연 79,000원 (공식 홈페이지 기준)" },
    ],
    otherStrengths: [
      "풀이를 움직이는 영상으로 보여 줘요.",
      "개념 사전이 있고, 중·고등 과정과 보호자 안내에 맞춰져 있어요.",
      "Android에서도 쓸 수 있고, 연간 요금제가 있어요.",
    ],
    qlipStrengths: [
      "대학 이공계 전공 문제에 맞춘 해설이에요.",
      "해설 없는 대학교 족보를 문항별 문제집으로 만들고(무료), 해설지 PDF로 받을 수 있어요.",
      "해설마다 독립 검증을 거치고, 막힌 단계만 짚어 질문할 수 있어요.",
      "과목별 저장과 다시 풀기로 시험 직전 복습까지 이어져요.",
    ],
    whoFor: {
      other: "중·고등학생이 영상으로 풀이를 보고 싶다면 찰칵이 맞아요.",
      qlip: "대학 전공 문제와 족보로 시험을 준비한다면 Qlip이 맞아요.",
    },
    faq: [
      { q: "어느 쪽 답이 더 정확한가요?", a: "Qlip은 두 서비스의 정확도를 같은 조건에서 비교한 시험을 하지 않았어요. 대상 학년과 문제 범위가 달라 풀려는 문제에 맞는 서비스를 고르는 것이 가장 중요해요." },
    ],
  },
];
