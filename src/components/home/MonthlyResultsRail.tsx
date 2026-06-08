import { Section } from "@/components/ui/Section";
import { InteractiveMediaRail } from "@/components/ui/InteractiveMediaRail";
import { ProofCard } from "@/components/ui/ProofCard";
import { MONTHLY_RESULTS } from "@/constants/monthly-results.const";

export function MonthlyResultsRail() {
  return (
    <Section
      id="results"
      eyebrow="MONTHLY RESULTS"
      containerClassName="max-w-none"
    >
      <InteractiveMediaRail
        items={MONTHLY_RESULTS}
        speed={1}
        itemClassName="w-[280px] sm:w-[360px] lg:w-[420px]"
        getImageSrc={(r) => r.imageSrc}
        getImageAlt={(r) => r.alt}
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
