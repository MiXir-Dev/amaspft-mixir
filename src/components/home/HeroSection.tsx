import { CTAButton } from "@/components/ui/CTAButton";
import { VideoFeature } from "./VideoFeature";
import {
  AppRoute,
  PRIMARY_CTA,
  SITE_NAME,
  TRADER_NAME,
} from "@/constants/app.const";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pb-24 sm:pt-36 md:pt-44">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-mint/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--mint)_5%,transparent),transparent_60%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-4xl flex-col items-center text-center">
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block text-mint">{SITE_NAME}</span>
            <span className="block text-foreground">Futures Trader</span>
          </h1>

          <p className="mt-5 max-w-xl text-balance text-sm text-muted-foreground sm:mt-6 sm:text-base md:text-lg">
            Follow the verified results of {TRADER_NAME} and apply for private
            1-on-1 futures trading mentorship.
          </p>
        </div>

        <div className="my-6 w-full sm:my-12">
          <VideoFeature />
        </div>

        <CTAButton
          to={AppRoute.MENTORSHIP_APPLY}
          className="w-auto"
          aria-label="Apply for 1-on-1 Mentorship"
        >
          {PRIMARY_CTA}
        </CTAButton>
      </div>
    </section>
  );
}
