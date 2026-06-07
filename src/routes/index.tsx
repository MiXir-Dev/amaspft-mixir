import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/home/HeroSection";
import { PayoutRail } from "@/components/home/PayoutRail";
import { MonthlyResultsRail } from "@/components/home/MonthlyResultsRail";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { SocialLinksSection } from "@/components/home/SocialLinksSection";
import {
  BRAND_DESCRIPTION,
  BRAND_IMAGE_PATH,
  SAME_AS_LINKS,
  SHARE_IMAGE_PATH,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/constants/app.const";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE_NAME} — Official Website` },
      {
        name: "description",
        content: BRAND_DESCRIPTION,
      },
      { property: "og:title", content: `${SITE_NAME} — Official Website` },
      {
        property: "og:description",
        content:
          "Official AmasPFT website featuring futures trading payouts, monthly results, community proof, and the application page.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:image", content: absoluteUrl(SHARE_IMAGE_PATH) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${SITE_NAME} — Official Website` },
      {
        name: "twitter:description",
        content: "Official website of AmasPFT, futures trader.",
      },
      { name: "twitter:image", content: absoluteUrl(SHARE_IMAGE_PATH) },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE_NAME,
          url: SITE_URL,
          description:
            "AmasPFT is a futures trader sharing payout proof, monthly results, community testimonials, and application access through his official website.",
          image: absoluteUrl(BRAND_IMAGE_PATH),
          sameAs: SAME_AS_LINKS,
        },
      },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${SITE_NAME} — Official Website`,
          url: absoluteUrl("/"),
          description: BRAND_DESCRIPTION,
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          },
        },
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      <HeroSection />
      <PayoutRail />
      <MonthlyResultsRail />
      <TestimonialsSection />
      <FinalCtaSection />
      <SocialLinksSection />
    </PageShell>
  );
}
