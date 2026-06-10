import {
  ALTERNATE_BRAND_NAME,
  AppRoute,
  BRAND_DESCRIPTION,
  BRAND_IMAGE_PATH,
  OG_IMAGE_PATH,
  OG_X_IMAGE_PATH,
  SAME_AS_LINKS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/constants/app.const";

export function getMentorshipHomeHead(canonicalPath = AppRoute.HOME) {
  return {
    meta: [
      { title: `${SITE_NAME} | Official PFT Website` },
      {
        name: "description",
        content: BRAND_DESCRIPTION,
      },
      { property: "og:title", content: `${SITE_NAME} | Official Website` },
      {
        property: "og:description",
        content:
          "Official AmasPFT website featuring futures trading payouts, monthly results, community proof, and the application page.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: absoluteUrl(canonicalPath) },
      { property: "og:image", content: absoluteUrl(OG_IMAGE_PATH) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${SITE_NAME} | Official Website` },
      {
        name: "twitter:description",
        content:
          "Official website of AmasPFT, also known as Pockets Full Trading.",
      },
      { name: "twitter:image", content: absoluteUrl(OG_X_IMAGE_PATH) },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE_NAME,
          alternateName: ALTERNATE_BRAND_NAME,
          url: SITE_URL,
          description:
            "AmasPFT, also known as Pockets Full Trading, is a futures trader sharing payout proof, monthly results, community testimonials, and application access through his official website.",
          image: absoluteUrl(BRAND_IMAGE_PATH),
          sameAs: SAME_AS_LINKS,
        },
      },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${SITE_NAME} | Official Website`,
          url: absoluteUrl(canonicalPath),
          description: BRAND_DESCRIPTION,
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          },
        },
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(canonicalPath) }],
  };
}

export function getMentorshipApplyHead(
  canonicalPath = AppRoute.MENTORSHIP_APPLY,
) {
  return {
    meta: [
      { title: "Pockets Full Trading Mentorship | AmasPFT" },
      {
        name: "description",
        content:
          "Official mentorship page for AmasPFT. Apply to join the Pockets Full Trading mentorship and futures trading community.",
      },
      {
        property: "og:title",
        content: "Pockets Full Trading Mentorship | AmasPFT",
      },
      {
        property: "og:description",
        content:
          "Official mentorship page for traders interested in the Pockets Full Trading community and AmasPFT mentorship experience.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: absoluteUrl(canonicalPath) },
      { property: "og:image", content: absoluteUrl(OG_IMAGE_PATH) },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Pockets Full Trading Mentorship | AmasPFT",
      },
      {
        name: "twitter:description",
        content: "Official mentorship page for AmasPFT.",
      },
      { name: "twitter:image", content: absoluteUrl(OG_X_IMAGE_PATH) },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Pockets Full Trading Mentorship",
          url: absoluteUrl(canonicalPath),
          description:
            "Official mentorship page for AmasPFT. Apply to join the Pockets Full Trading mentorship and futures trading community.",
          about: {
            "@type": "Person",
            name: SITE_NAME,
            alternateName: ALTERNATE_BRAND_NAME,
            url: SITE_URL,
          },
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          },
        },
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(canonicalPath) }],
  };
}
