import { createFileRoute } from "@tanstack/react-router";

import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { HeroSection } from "@/components/home/HeroSection";
import { MentorshipOfferSection } from "@/components/home/MentorshipOfferSection";
import { MonthlyResultsRail } from "@/components/home/MonthlyResultsRail";
import { PayoutRail } from "@/components/home/PayoutRail";
import { SocialLinksSection } from "@/components/home/SocialLinksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { PageShell } from "@/components/layout/PageShell";

import { getMentorshipHomeHead } from "./-meta";

export const Route = createFileRoute("/mentorship/")({
  head: () => getMentorshipHomeHead(),
  component: MentorshipHome,
});

function MentorshipHome() {
  return (
    <PageShell>
      <HeroSection />
      <MentorshipOfferSection />
      <PayoutRail />
      <MonthlyResultsRail />
      <TestimonialsSection />
      <FinalCtaSection />
      <SocialLinksSection />
    </PageShell>
  );
}
