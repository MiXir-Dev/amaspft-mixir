import { Check } from "lucide-react";

import { CTAButton } from "@/components/ui/CTAButton";
import { AppRoute, PRIMARY_CTA } from "@/constants/app.const";

const MENTORSHIP_BENEFITS = [
  "5 private live trading sessions every week",
  "Daily charting classes",
  "Sunday backtesting sessions",
  "100+ hours of trading education",
  "24/7 support",
] as const;

export function MentorshipOfferSection() {
  return (
    <section
      id="mentorship"
      className="pb-20 sm:pb-28"
      aria-labelledby="mentorship-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-1 p-4 py-6 sm:p-10">
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-mint/[0.07] blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-mint sm:text-sm">
              Private 1-on-1 Mentorship
            </span>

            <h2
              id="mentorship-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Trade With Amas. Every Week.
            </h2>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {MENTORSHIP_BENEFITS.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-sm font-medium text-foreground sm:text-base"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint/10 text-mint">
                    <Check
                      className="h-3.5 w-3.5"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>

                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-6">
              <CTAButton
                to={AppRoute.MENTORSHIP_APPLY}
                className="w-full"
                aria-label="Apply for 1-on-1 Mentorship"
              >
                {PRIMARY_CTA}
              </CTAButton>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Paid mentorship · Application required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}