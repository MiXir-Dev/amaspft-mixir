import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/home/HeroSection";
import { PayoutRail } from "@/components/home/PayoutRail";
import { MonthlyResultsRail } from "@/components/home/MonthlyResultsRail";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { SocialLinksSection } from "@/components/home/SocialLinksSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AmasPFT — Receipts Over Hype." },
      {
        name: "description",
        content:
          "Futures trading, live execution, payouts, and a community built around discipline. Apply to work with Amas.",
      },
      { property: "og:title", content: "AmasPFT — Receipts Over Hype." },
      {
        property: "og:description",
        content: "$74,000+ in verified payouts. Built for traders who execute.",
      },
    ],
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
