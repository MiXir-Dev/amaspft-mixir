import {
  AMASPFT_ENTITY_ID,
  ALTERNATE_BRAND_NAME,
  AppRoute,
  BRAND_DESCRIPTION,
  BRAND_IMAGE_PATH,
  OG_IMAGE_PATH,
  OG_X_IMAGE_PATH,
  POCKETS_FULL_TRADING_ENTITY_ID,
  SITE_NAME,
  WEBSITE_ENTITY_ID,
  absoluteUrl,
} from "@/constants/app.const";

export function getMentorshipHomeHead(canonicalPath = AppRoute.HOME) {
  return {
    meta: [
      { title: `${SITE_NAME} | ${ALTERNATE_BRAND_NAME} Official Website` },
      {
        name: "description",
        content: BRAND_DESCRIPTION,
      },
      {
        property: "og:title",
        content: `${SITE_NAME} | ${ALTERNATE_BRAND_NAME}`,
      },
      {
        property: "og:description",
        content: BRAND_DESCRIPTION,
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: absoluteUrl(canonicalPath) },
      { property: "og:image", content: absoluteUrl(OG_IMAGE_PATH) },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: `${SITE_NAME} | ${ALTERNATE_BRAND_NAME}`,
      },
      {
        name: "twitter:description",
        content: BRAND_DESCRIPTION,
      },
      { name: "twitter:image", content: absoluteUrl(OG_X_IMAGE_PATH) },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${absoluteUrl(canonicalPath)}#webpage`,
          name: `${SITE_NAME} | ${ALTERNATE_BRAND_NAME}`,
          url: absoluteUrl(canonicalPath),
          description: BRAND_DESCRIPTION,
          isPartOf: { "@id": WEBSITE_ENTITY_ID },
          about: [
            { "@id": AMASPFT_ENTITY_ID },
            { "@id": POCKETS_FULL_TRADING_ENTITY_ID },
          ],
          primaryImageOfPage: absoluteUrl(BRAND_IMAGE_PATH),
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
            "@id": POCKETS_FULL_TRADING_ENTITY_ID,
          },
          isPartOf: { "@id": WEBSITE_ENTITY_ID },
        },
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(canonicalPath) }],
  };
}
