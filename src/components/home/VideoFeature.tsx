import { useState } from "react";
import heroPoster from "@/assets/hero-poster.jpg";

type Props = {
  videoId?: string;
  label?: string;
};

export function VideoFeature({ videoId }: Props) {
  const [active, setActive] = useState(false);

  return (
    <div id="watch" className="relative w-full">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-1 aspect-video">
        {!active ? (
          <button
            type="button"
            onClick={() => videoId && setActive(true)}
            className="group absolute inset-0 w-full h-full"
            aria-label="Play video"
          >
            <img
              src={heroPoster}
              alt="Amas at his trading desk"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-mint text-primary-foreground shadow-[0_0_60px_-10px_color-mix(in_oklab,var(--mint)_80%,transparent)] transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 translate-x-0.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="Amas intro"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-x-10 -bottom-10 h-40 bg-mint/10 blur-3xl opacity-50" />
    </div>
  );
}
