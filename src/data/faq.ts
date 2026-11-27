/**
 * FAQ shown on /faq (all) and the home page (`home: true`). Answers are plain
 * text so the same string feeds the page and FAQPage JSON-LD. Every claim
 * here must match the app, pricing.ts and the privacy policy.
 */
export type Faq = { id: string; q: string; a: string; link?: { href: string; label: string }; home?: boolean; group: "start" | "use" | "credits" | "data" };

export const FAQ: Faq[] = [
  {
    id: "what",
    group: "start",
    home: true,
    q: "Qlip은 어떤 앱인가요?",
    a: "대학생을 위한 AI 문제풀이 앱이에요. 전공 문제를 사진으로 찍으면 개념과 수식을 담은 단계별 해설을 만들고, 다른 AI가 문제를 처음부터 다시 풀어 검증해요. 해설 없는 족보는 문항별 문제집으로 만들고, 저장한 문제는 다시 풀기와 복습으로 시험 전까지 관리해요.",
    link: { href: "/features/", label: "기능 전체 보기" },
  },
  {
    id: "subjects",
    group: "start",
    home: true,
    q: "어떤 과목을 지원하나요?",
    a: "미적분학, 공업수학, 일반물리학, 일반화학, 선형대수학, 회로이론, 열역학처럼 대학 이공계 전공 문제에 맞춰져 있어요. 이공계 밖의 문제도 해설하지만, 이공계 문제가 가장 정확하다는 안내를 함께 보여 드려요.",
    link: { href: "/learn/", label: "과목별 학습 라이브러리" },
  },
  {
    id: "devices",
    group: "start",
    q: "어떤 기기에서 쓸 수 있나요?",
    a: "iPhone과 iPad에서 쓸 수 있어요(iOS·iPadOS 26.2 이상). iPad에서는 문제와 해설을 나란히 보고 Apple Pencil로 다시 풀 수 있어요. 저장한 문제는 iCloud로 기기 사이에 동기화돼요.",
    link: { href: "/features/ipad/", label: "iPad에서 쓰는 법" },
  },
  {
    id: "android",
    group: "start",
    q: "Android 버전이 있나요?",
    a: "아직 없어요. Android 버전은 개발 중이며, 출시되면 이 페이지와 앱 공지로 알려 드릴게요.",
  },
  {
    id: "free",
    group: "credits",
    home: true,
    q: "무료로 얼마나 쓸 수 있나요?",
    a: "가입하면 7일마다 15크레딧이 다시 채워져요. 문제 해설 1개는 3크레딧(검증에서 걸려 한 번 더 풀면 최대 5), 질문 1개는 1크레딧이에요. 족보 문항 나누기는 하루 10번까지 크레딧 없이 쓸 수 있어요.",
    link: { href: "/pricing/", label: "요금제와 크레딧" },
  },
  {
    id: "refill",
    group: "credits",
    q: "크레딧은 언제 다시 채워지나요?",
    a: "매주 월요일이 아니라 가입한 날(또는 유료 상품을 산 날)부터 7일마다 채워져요. 따로 산 크레딧은 만료되지 않고, 매주 채워지는 크레딧을 먼저 쓴 다음에 쓰여요.",
  },
  {
    id: "wrong",
    group: "use",
    home: true,
    q: "해설이 틀리면 어떻게 되나요?",
    a: "해설마다 다른 AI가 처음부터 다시 풀어 대조하고, 확신이 서지 않으면 해설 위에 그렇다고 적어요. 그래도 틀린 해설을 신고하면 3크레딧을 돌려드리고 새로 풀어 드려요. 사진이 흐려 읽지 못했거나 중간에 멈춘 해설도 크레딧을 자동으로 돌려드려요.",
  },
  {
    id: "jokbo-private",
    group: "data",
    home: true,
    q: "족보를 올리면 다른 사람이 볼 수 있나요?",
    a: "다른 사용자가 내 족보를 둘러보는 기능은 없어요. 같은 문제·자료가 다시 들어오면 이미 만든 결과를 재사용해 속도를 높이고 크레딧을 아끼는데, 이때 다시 쓰이는 문제·해설에는 누가 올렸는지 남지 않아요. 본인이 정당하게 가진 자료만 올려 주세요.",
    link: { href: "/privacy.html", label: "개인정보처리방침" },
  },
  {
    id: "storage",
    group: "data",
    q: "내 문제와 해설은 어디에 저장되나요?",
    a: "저장한 문제, 족보, 해설, 질문 기록, 메모, Apple Pencil 필기는 내 iCloud에 저장돼요. 계정에 남는 이용 기록은 항목별로 30~90일이 지나면 자동으로 지워지고, 탈퇴하면 바로 삭제돼요.",
    link: { href: "/delete-account.html", label: "계정·데이터 삭제 안내" },
  },
  {
    id: "chatgpt",
    group: "use",
    home: true,
    q: "ChatGPT로 풀면 되지 않나요?",
    a: "범용 AI로도 풀 수 있어요. Qlip은 대학 전공 문제에 맞춘 단계별 해설 형식, 다른 AI의 독립 검증, 막힌 단계만 짚어 묻는 질문, 족보를 문항별로 나누는 기능, 과목별 저장과 다시 풀기처럼 시험공부 흐름에 필요한 것을 한 앱에 모았어요.",
  },
  {
    id: "cancel",
    group: "credits",
    q: "구독은 어떻게 해지하나요?",
    a: "iPhone 설정 > Apple ID > 구독에서 언제든지 해지할 수 있고, 앱의 내정보 > 구독 관리에서도 바로 이동할 수 있어요. 7일권은 자동으로 갱신되지 않아요.",
  },
];
