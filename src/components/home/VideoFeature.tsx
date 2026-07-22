import { useMemo, useState } from "react";
import thumbnailImg from "@/assets/logo/thumbnail.webp";
import { VIDEO_URL } from "@/constants/app.const";

function getYouTubeVideoId(videoUrl: string) {
  const url = new URL(videoUrl);

  if (url.hostname.includes("youtu.be")) {
    return url.pathname.slice(1);
  }

  return url.searchParams.get("v") ?? "";
}

export function VideoFeature() {
  const [active, setActive] = useState(false);

  const videoId = useMemo(() => {
    return getYouTubeVideoId(VIDEO_URL);
  }, []);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div id="watch" className="relative w-full">
      <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-surface-1 shadow-[0_24px_80px_-48px_rgba(193,225,194,0.35)]">
        {!active ? (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            aria-label="Play AmasPFT futures trading video"
          >
            <img
              src={thumbnailImg}
              alt="AmasPFT explaining a one-candle futures trading strategy"
              width={1280}
              height={720}
              decoding="async"
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/45" />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-mint/60 bg-black/50 text-mint shadow-[0_0_42px_-20px_rgba(193,225,194,0.85)] backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:border-mint group-hover:bg-black/65 sm:h-20 sm:w-20">
                <span className="absolute inset-0 rounded-full bg-mint/[0.07]" />
                <span className="absolute inset-[6px] rounded-full border border-white/10" />
                <span className="absolute -inset-2 rounded-full border border-mint/10 opacity-0 transition duration-300 group-hover:opacity-100" />

                <svg
                  viewBox="0 0 24 24"
                  className="relative h-7 w-7 translate-x-[2px] sm:h-9 sm:w-9"
                  aria-hidden="true"
                >
                  <path
                    d="M8.25 5.25v13.5L18.75 12 8.25 5.25Z"
                    className="fill-mint drop-shadow-[0_0_8px_rgba(193,225,194,0.35)]"
                  />
                </svg>
              </span>
            </div>
          </button>
        ) : (
          <iframe
            src={embedUrl}
            title="AmasPFT video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>

      <div className="pointer-events-none absolute -inset-x-10 -bottom-10 h-40 bg-mint/10 opacity-40 blur-3xl" />
    </div>
  );
}
