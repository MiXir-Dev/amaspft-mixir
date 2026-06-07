import { CTAButton } from "@/components/ui/CTAButton";
import { VideoFeature } from "./VideoFeature";
import { APP_CONSTS } from "@/constants/app.const";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-mint/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--mint)_5%,transparent),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 justify-center flex flex-col">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-balance leading-[1.05]">
            Receipts <span className="text-muted-foreground">Over</span>{" "}
            <span className="text-mint">Hype.</span>
          </h1>
          <p className="mt-5 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-muted-foreground text-balance">
            Futures trading, live execution, payouts, and a community built around discipline.
          </p>
        </div>

        <div className="mb-4 mt-4 sm:m-12 w-full">
          <VideoFeature />
        </div>
        
        <CTAButton to="/apply" className="w-auto">
          {APP_CONSTS.primaryCta}
        </CTAButton>
      </div>
    </section>
  );
}
