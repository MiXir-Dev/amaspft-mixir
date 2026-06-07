import { useEffect, useMemo, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { MarqueeRail } from "@/components/ui/MarqueeRail";
import { TESTIMONIALS } from "@/constants/testimonials.const";
import { WHOP_RATING, WHOP_REVIEW_COUNT } from "@/constants/app.const";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [isInView]);

  return { ref, isInView };
}

function useCountUp({
  end,
  duration = 1400,
  start,
}: {
  end: number;
  duration?: number;
  start: boolean;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(prefersReducedMotion ? end : 0);

  useEffect(() => {
    if (!start) return;

    if (prefersReducedMotion) {
      setValue(end);
      return;
    }

    let animationFrame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = clamp((now - startedAt) / duration, 0, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setValue(end * easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, end, prefersReducedMotion, start]);

  return value;
}

function Star({ fillRatio }: { fillRatio: number }) {
  const fillPercent = clamp(fillRatio, 0, 1) * 100;

  return (
    <span className="relative block h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 h-full w-full text-white/15"
        fill="currentColor"
      >
        <path d="M12 17.3 5.8 21l1.7-7.1L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.7L18.2 21z" />
      </svg>

      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${fillPercent}%` }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 text-mint sm:h-10 sm:w-10"
          fill="currentColor"
        >
          <path d="M12 17.3 5.8 21l1.7-7.1L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.7L18.2 21z" />
        </svg>
      </span>
    </span>
  );
}

function AnimatedStars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center justify-center gap-1.5 sm:gap-2"
      aria-hidden="true"
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const fillRatio = clamp(rating - index, 0, 1);

        return <Star key={index} fillRatio={fillRatio} />;
      })}
    </div>
  );
}

function RatingCard() {
  const targetRating = useMemo(() => {
    const parsedRating = Number.parseFloat(WHOP_RATING);
    return Number.isFinite(parsedRating) ? parsedRating : 0;
  }, []);

  const { ref, isInView } = useInViewOnce<HTMLDivElement>();

  const animatedRating = useCountUp({
    end: targetRating,
    duration: 1400,
    start: isInView,
  });

  return (
    <div
      ref={ref}
      className="mx-auto mb-8 flex w-full flex-col items-center justify-center gap-2 px-4 text-center sm:mb-12"
    >
      <AnimatedStars rating={animatedRating} />

      <div className="mt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground sm:text-base">
        <span className="font-medium tracking-tight text-mint tabular-nums">
          {animatedRating.toFixed(2)} / 5
        </span>

        <span className="text-white/20">•</span>

        <span className="text-[10px] uppercase tracking-[0.18em] sm:text-xs">
          {WHOP_REVIEW_COUNT} Whop reviews
        </span>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <Section id="reviews" eyebrow="OUR COMMUNITY" containerClassName="max-w-none">
      <RatingCard />

      <MarqueeRail
        items={TESTIMONIALS}
        duration={90}
        itemClassName="w-[240px] sm:w-[300px] lg:w-[320px]"
        renderItem={(t) => (
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-surface-1">
            <img
              src={t.imageSrc}
              alt={t.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

            <span className="absolute right-3 top-3 rounded-full border border-mint/30 bg-black/50 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-mint backdrop-blur-sm">
              {t.source}
            </span>
          </div>
        )}
      />
    </Section>
  );
}
