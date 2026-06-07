import { Section } from "@/components/ui/Section";
import { MarqueeRail } from "@/components/ui/MarqueeRail";
import { ProofCard } from "@/components/ui/ProofCard";
import { PAYOUTS } from "@/constants/payouts.const";

export function PayoutRail() {
  return (
    <Section
      id="payouts"
      eyebrow="PAYOUT PROOF ($70,000+)"
      containerClassName="max-w-none"
    >
      <MarqueeRail
        items={PAYOUTS}
        duration={70}
        itemClassName="w-[320px] sm:w-[420px] lg:w-[520px]"
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
