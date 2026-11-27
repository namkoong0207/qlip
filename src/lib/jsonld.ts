/**
 * Schema.org JSON-LD builders. Everything here is generated from the same data
 * the page shows (site.ts, pricing.ts, content frontmatter), so the markup can
 * never claim something the page does not say. No aggregateRating: the page
 * does not display one, and three App Store ratings are not a basis for one.
 */
import { SITE, absoluteUrl } from "../config/site";
import { PLANS } from "../data/pricing";

const ORG_ID = `${SITE.url}/#organization`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/assets/img/logo-mark.png"),
    email: SITE.email,
    description: SITE.identity,
    sameAs: [SITE.appStore.url, SITE.instagram].filter(Boolean),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "ko-KR",
    publisher: { "@id": ORG_ID },
  };
}

export function appLd() {
  const offers = [
    { "@type": "Offer", name: "무료", price: 0, priceCurrency: "KRW" },
    ...PLANS.filter((p) => p.monthlyKRW).map((p) => ({
      "@type": "Offer",
      name: `${p.name} 월간 구독`,
      price: p.monthlyKRW,
      priceCurrency: "KRW",
    })),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": `${SITE.url}/#app`,
    name: SITE.appStoreName,
    alternateName: SITE.name,
    description: SITE.identity,
    operatingSystem: "iOS 26.2, iPadOS 26.2",
    applicationCategory: "EducationalApplication",
    inLanguage: "ko-KR",
    url: SITE.url,
    installUrl: SITE.appStore.url,
    downloadUrl: SITE.appStore.url,
    publisher: { "@id": ORG_ID },
    audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: "대학생" },
    offers,
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function articleLd(a: {
  title: string;
  description: string;
  path: string;
  published: Date;
  modified: Date;
  author: string;
  reviewer?: string;
  learning?: { subject: string; level?: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": a.learning ? ["Article", "LearningResource"] : "Article",
    headline: a.title,
    description: a.description,
    url: absoluteUrl(a.path),
    mainEntityOfPage: absoluteUrl(a.path),
    inLanguage: "ko-KR",
    datePublished: a.published.toISOString().slice(0, 10),
    dateModified: a.modified.toISOString().slice(0, 10),
    author: { "@type": "Person", name: a.author },
    ...(a.reviewer ? { reviewedBy: { "@type": "Person", name: a.reviewer } } : {}),
    publisher: { "@id": ORG_ID },
    ...(a.learning
      ? {
          learningResourceType: "개념 설명과 예제 해설",
          educationalLevel: "대학교",
          about: a.learning.subject,
          isAccessibleForFree: true,
        }
      : {}),
  };
}
