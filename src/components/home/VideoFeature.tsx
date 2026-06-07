import { useState } from "react";
import thumbnailImg from "@/assets/logo/thumbnail.png";

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
            className="group absolute inset-0 h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            aria-label="Play video"
          >
            <img
              src={thumbnailImg}
              alt="Amas at his trading desk"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="relative flex h-18 w-18 items-center justify-center rounded-full border-2 border-mint bg-transparent text-mint shadow-[0_0_60px_-14px_color-mix(in_oklab,var(--mint)_75%,transparent)] backdrop-blur-[1px] transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24">
                <span className="pointer-events-none absolute inset-2 rounded-full border border-black/45" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="relative h-8 w-8 translate-x-[1px] sm:h-10 sm:w-10"
                  aria-hidden="true"
                >
                  <path
                    d="M8 5.75v12.5L18 12 8 5.75Z"
                    className="fill-mint stroke-black/70"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
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
