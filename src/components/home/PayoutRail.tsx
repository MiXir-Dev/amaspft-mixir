import { Section } from "@/components/ui/Section";
import { MarqueeRail } from "@/components/ui/MarqueeRail";
import { ProofCard } from "@/components/ui/ProofCard";
import { PAYOUTS } from "@/constants/payouts.const";

export function PayoutRail() {
  return (
    <Section
      id="payouts"
      eyebrow="PAYOUT PROOF"
      containerClassName="max-w-none px-0 sm:px-0"
    >
      <MarqueeRail
        items={PAYOUTS}
        duration={70}
        itemClassName="w-[220px] sm:w-[260px] lg:w-[300px]"
        renderItem={(p) => (
          <ProofCard
            imageSrc={p.imageSrc}
            alt={p.alt}
            bottomLeft={p.amount}
            topRight="Payout"
          />
        )}
      />
    </Section>
  );
}
