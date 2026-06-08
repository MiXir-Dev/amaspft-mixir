import { Section } from "@/components/ui/Section";
import { InteractiveMediaRail } from "@/components/ui/InteractiveMediaRail";
import { ProofCard } from "@/components/ui/ProofCard";
import { LIFETIME_PAYOUTS } from "@/constants/app.const";
import { PAYOUTS } from "@/constants/payouts.const";

export function PayoutRail() {
  return (
    <Section
      id="payouts"
      eyebrow={`PAYOUTS (${LIFETIME_PAYOUTS})`}
      containerClassName="max-w-none"
    >
      <InteractiveMediaRail
        items={PAYOUTS}
        speed={1.2}
        itemClassName="w-[320px] sm:w-[420px] lg:w-[520px]"
        getImageSrc={(p) => p.imageSrc}
        getImageAlt={(p) => p.alt}
        renderItem={(p) => (
          <ProofCard
            imageSrc={p.imageSrc}
            alt={p.alt}
            bottomLeft={p.amount}
            topRight={p.live ? "Live" : "Prop Firm"}
            aspect="landscape"
          />
        )}
      />
    </Section>
  );
}
