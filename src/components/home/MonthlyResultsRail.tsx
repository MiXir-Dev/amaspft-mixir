import { Section } from "@/components/ui/Section";
import { MarqueeRail } from "@/components/ui/MarqueeRail";
import { ProofCard } from "@/components/ui/ProofCard";
import { MONTHLY_RESULTS } from "@/constants/monthly-results.const";

export function MonthlyResultsRail() {
  return (
    <Section
      id="results"
      eyebrow="MONTHLY RESULTS"
      containerClassName="max-w-none px-0 sm:px-0"
    >
      <MarqueeRail
        items={MONTHLY_RESULTS}
        duration={80}
        itemClassName="w-[280px] sm:w-[360px] lg:w-[420px]"
        renderItem={(r) => (
          <ProofCard
            imageSrc={r.imageSrc}
            alt={r.alt}
            topLeft={r.month}
            bottomLeft={r.netResult}
            bottomRight={r.record}
            aspect="landscape"
          />
        )}
      />
    </Section>
  );
}
