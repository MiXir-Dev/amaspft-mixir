import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/home/HeroSection";
import { PayoutRail } from "@/components/home/PayoutRail";
import { MonthlyResultsRail } from "@/components/home/MonthlyResultsRail";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { SocialLinksSection } from "@/components/home/SocialLinksSection";
import { getMentorshipHomeHead } from "./-meta";

export const Route = createFileRoute("/mentorship/")({
  head: () => getMentorshipHomeHead(),
  component: MentorshipHome,
});

function MentorshipHome() {
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
