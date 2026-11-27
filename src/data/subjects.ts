/**
 * Subjects the learning library covers. Each hub's intro is written for that
 * subject — never the same paragraph with the name swapped.
 */
export type Subject = {
  slug: "calculus" | "engineering-math" | "physics" | "chemistry" | "linear-algebra";
  name: string;
  short: string;
  intro: string;
  examTips: string[];
  units: { slug: string; name: string }[];
};

export const SUBJECTS: Subject[] = [
  {
    slug: "calculus",
    name: "미적분학",
    short: "극한·미분·적분·급수·다변수",
    intro:
      "대학 미적분학은 고등학교 미적분과 같은 기호를 쓰지만, 시험에서 묻는 것은 계산 요령보다 '왜 이 방법을 고르는가'입니다. 적분 기법을 고르는 판단, 급수 수렴 판정, 다변수 함수의 편미분과 중적분 좌표 변환에서 점수가 갈립니다.",
    examTips: [
      "적분 문제는 바로 계산하지 말고 치환·부분적분·부분분수·삼각치환 중 무엇을 쓸지 먼저 적어 보세요. 고르는 판단이 시험에서 가장 많이 틀리는 지점입니다.",
      "급수 문제는 판정법 이름과 그 판정법이 성립하는 조건을 답안에 함께 쓰면 부분점수를 받기 쉽습니다.",
      "중적분은 적분 영역 그림을 먼저 그리고, 경계를 새 좌표로 옮긴 뒤 야코비안을 잊지 마세요.",
    ],
    units: [
      { slug: "limits-derivatives", name: "극한과 미분" },
      { slug: "integration", name: "적분 기법" },
      { slug: "series", name: "수열과 급수" },
      { slug: "multivariable", name: "다변수 미적분" },
    ],
  },
  {
    slug: "engineering-math",
    name: "공업수학",
    short: "미분방정식·라플라스·푸리에·벡터해석",
    intro:
      "공업수학은 공대 전공 과목의 공용어입니다. 미분방정식을 세우고 푸는 방법, 라플라스 변환으로 초기값 문제를 대수 문제로 바꾸는 방법, 푸리에 급수로 신호를 나누는 방법이 회로·제어·진동·열전달 과목에서 그대로 다시 나옵니다.",
    examTips: [
      "미분방정식은 풀기 전에 형태(변수분리형, 1계 선형, 완전, 상수계수 2계…)부터 분류하세요. 분류가 맞으면 풀이 절반이 끝납니다.",
      "라플라스 변환 문제의 대부분의 시간은 부분분수 분해에 들어갑니다. 계수를 구한 뒤 원래 식에 대입해 검산하는 습관이 점수를 지킵니다.",
      "푸리에 급수는 함수가 우함수인지 기함수인지 먼저 확인하면 계산할 계수가 절반으로 줄어듭니다.",
    ],
    units: [
      { slug: "first-order-ode", name: "1계 미분방정식" },
      { slug: "second-order-ode", name: "2계 선형 미분방정식" },
      { slug: "laplace", name: "라플라스 변환" },
      { slug: "fourier-pde", name: "푸리에 해석과 편미분방정식" },
      { slug: "vector-calculus", name: "벡터 해석" },
    ],
  },
  {
    slug: "physics",
    name: "일반물리학",
    short: "역학·열·전자기",
    intro:
      "일반물리학 문제는 공식을 아는 것보다 상황을 식으로 옮기는 단계에서 막힙니다. 자유물체도를 그리고, 보존되는 양을 찾고, 부호와 단위를 끝까지 맞추는 과정이 정답을 정합니다.",
    examTips: [
      "역학 문제는 자유물체도부터 그리세요. 힘의 방향과 좌표축을 먼저 정하면 부호 실수가 크게 줄어듭니다.",
      "에너지·운동량 보존을 쓸 수 있는지 먼저 확인하세요. 보존 법칙이 통하면 운동방정식을 풀지 않아도 됩니다.",
      "답을 낸 뒤 단위를 확인하고, 극단적인 경우(질량 0, 각도 90°)를 대입해 말이 되는지 보세요.",
    ],
    units: [
      { slug: "kinematics-dynamics", name: "운동과 힘" },
      { slug: "energy-momentum", name: "에너지와 운동량" },
      { slug: "rotation-oscillation", name: "회전과 진동" },
      { slug: "fluids-thermo", name: "유체와 열" },
      { slug: "electromagnetism", name: "전기와 자기" },
    ],
  },
  {
    slug: "chemistry",
    name: "일반화학",
    short: "화학량론·결합·열역학·평형·산염기",
    intro:
      "일반화학은 계산 문제와 개념 문제가 반씩 섞여 나옵니다. 몰 계산과 유효숫자 같은 기본기가 모든 단원에 깔려 있고, 평형·산염기·전기화학에서는 어떤 근사를 써도 되는지 판단하는 능력이 필요합니다.",
    examTips: [
      "화학량론은 단위를 분수처럼 이어 붙이는 차원 분석으로 풀면 계산 순서를 잃지 않습니다.",
      "평형 문제는 ICE 표를 그리고, 'x가 작다'는 근사를 썼다면 5% 규칙으로 꼭 확인하세요.",
      "산염기 문제는 먼저 강산·강염기인지, 약산·짝염기 쌍(완충)인지 분류하세요. 분류에 따라 쓰는 식이 완전히 다릅니다.",
    ],
    units: [
      { slug: "stoichiometry-gases", name: "화학량론과 기체" },
      { slug: "atoms-bonding", name: "원자 구조와 화학 결합" },
      { slug: "thermochemistry", name: "열화학과 열역학" },
      { slug: "equilibrium-acid-base", name: "화학 평형과 산·염기" },
      { slug: "kinetics-electrochem", name: "반응 속도와 전기화학" },
    ],
  },
  {
    slug: "linear-algebra",
    name: "선형대수학",
    short: "연립방정식·벡터공간·고유값·분해",
    intro:
      "선형대수학은 계산(소거, 행렬식, 고유값)과 증명형 개념(일차독립, 기저, 차원)이 함께 나옵니다. 계산은 손에 익으면 되지만, 개념 문제는 정의를 정확한 문장으로 쓸 수 있어야 풀립니다.",
    examTips: [
      "고유값 계산 뒤에는 대각합 = 고유값의 합, 행렬식 = 고유값의 곱으로 바로 검산할 수 있습니다.",
      "일차독립·기저 문제는 정의를 그대로 식으로 옮기는 것부터 시작하세요. c₁v₁ + … + cₙvₙ = 0을 써 놓는 것이 첫 줄입니다.",
      "행 연산을 할 때는 한 줄에 한 연산만 적으세요. 시험에서 가장 흔한 감점은 연산을 겹치다 생기는 산술 실수입니다.",
    ],
    units: [
      { slug: "systems-matrices", name: "연립방정식과 행렬" },
      { slug: "vector-spaces", name: "벡터공간" },
      { slug: "eigen", name: "고유값과 대각화" },
      { slug: "orthogonality", name: "직교성과 최소제곱" },
      { slug: "decompositions", name: "행렬 분해와 이차형식" },
    ],
  },
];

export const subjectBySlug = (slug: string) => SUBJECTS.find((s) => s.slug === slug);
