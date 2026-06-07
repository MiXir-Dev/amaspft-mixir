import { Section } from "@/components/ui/Section";
import { MarqueeRail } from "@/components/ui/MarqueeRail";
import { TESTIMONIALS } from "@/constants/testimonials.const";
import { APP_CONSTS } from "@/constants/app.const";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 sm:h-5 sm:w-5 ${i < full ? "text-mint" : "text-white/15"}`}
          fill="currentColor"
        >
          <path d="M12 17.3 5.8 21l1.7-7.1L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.7L18.2 21z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <Section
      id="reviews"
      eyebrow="COMMUNITY PROOF"
      align="center"
      containerClassName="max-w-none px-0 sm:px-0"
    >
      <div className="mx-auto mb-10 sm:mb-14 flex w-[260px] sm:w-auto sm:max-w-sm flex-col items-center gap-3 rounded-2xl border border-white/10 bg-surface-1 px-6 sm:px-8 py-6 sm:py-7 text-center">
        <Stars rating={parseFloat(APP_CONSTS.whopRating)} />
        <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-mint">
          {APP_CONSTS.whopRating}
        </div>
        <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {APP_CONSTS.whopReviewCount} Whop testimonials
        </div>
      </div>

      <MarqueeRail
        items={TESTIMONIALS}
        duration={90}
        itemClassName="w-[240px] sm:w-[300px] lg:w-[320px]"
        renderItem={(t) => (
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-1 aspect-[4/5]">
            <img
              src={t.imageSrc}
              alt={t.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] text-mint border border-mint/30 rounded-full px-2 py-1 bg-black/50 backdrop-blur-sm">
              {t.source}
            </span>
          </div>
        )}
      />
    </Section>
  );
}
