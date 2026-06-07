import { CTAButton } from "@/components/ui/CTAButton";
import { MetricPill } from "@/components/ui/MetricPill";
import { APP_CONSTS } from "@/constants/app.const";
import lifetimeImg from "@/assets/lifetime-payout.jpg";

export function FinalCtaSection() {
  return (
    <section className="relative py-20 sm:py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--mint)_8%,transparent),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left: copy + CTA */}
          <div className="text-center md:text-left">
            <span className="font-medium uppercase tracking-[0.22em] text-mint text-xs sm:text-sm">
              APPLY
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-balance leading-[1.05]">
              Built For The <span className="text-mint">1%</span> Who Execute.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-muted-foreground text-balance max-w-md mx-auto md:mx-0">
              If you want structure, accountability, and real trading standards, apply below.
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <CTAButton to="/apply" className="w-full sm:w-auto">
                Apply Now
              </CTAButton>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <MetricPill value={APP_CONSTS.lifetimePayouts} label="payouts" />
              <MetricPill value={`${APP_CONSTS.whopRating}/5`} label="rating" />
              <MetricPill value={`${APP_CONSTS.whopReviewCount}`} label="testimonials" />
            </div>
          </div>

          {/* Right: lifetime payout proof */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-mint/[0.06] blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-1 aspect-[4/3] mint-glow">
              <img
                src={lifetimeImg}
                alt={`${APP_CONSTS.lifetimePayouts} lifetime payouts proof`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
