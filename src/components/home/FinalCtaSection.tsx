import { CTAButton } from "@/components/ui/CTAButton";
import { AppRoute, LIFETIME_PAYOUTS } from "@/constants/app.const";
import lifetimeImg from "@/assets/payouts/lifetime.webp";

export function FinalCtaSection() {
  return (
    <section className="relative py-20 sm:py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--mint)_8%,transparent),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="font-medium uppercase tracking-[0.22em] text-mint text-xs sm:text-sm">
            APPLY
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-balance leading-[1.05]">
            Join the <span className="text-mint">1%</span>.
          </h2>

          <div className="relative mt-10 w-full">
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-mint/[0.06] blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-1 aspect-[16/10] sm:aspect-[1024/663] mint-glow">
              <img
                src={lifetimeImg}
                alt={`AmasPFT lifetime payout proof screenshot showing more than ${LIFETIME_PAYOUTS} in withdrawals`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <CTAButton
              to={AppRoute.MENTORSHIP}
              className="w-full sm:w-auto"
              aria-label="Apply to Work With AmasPFT"
            >
              Apply Now
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
