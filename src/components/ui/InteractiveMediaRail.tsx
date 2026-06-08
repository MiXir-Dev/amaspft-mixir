import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Lightbox from "yet-another-react-lightbox";
import { cn } from "@/lib/utils";

type InteractiveMediaRailProps<T> = {
  items: T[];
  duration?: number;
  speed?: number;
  itemClassName?: string;
  getImageSrc: (item: T) => string;
  getImageAlt: (item: T) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
};

export function InteractiveMediaRail<T>({
  items,
  speed = 1.2,
  itemClassName,
  getImageSrc,
  getImageAlt,
  renderItem,
}: InteractiveMediaRailProps<T>) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
    },
    [
      AutoScroll({
        speed,
        startDelay: 400,
        stopOnInteraction: false,
        stopOnFocusIn: true,
      }),
    ],
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoScroll?.play();
  }, [emblaApi]);

  const slides = useMemo(
    () =>
      items.map((item) => ({
        src: getImageSrc(item),
        alt: getImageAlt(item),
      })),
    [getImageAlt, getImageSrc, items],
  );

  return (
    <>
      <div
        ref={emblaRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div className="flex touch-pan-y">
          {items.map((item, index) => {
            const alt = getImageAlt(item);

            return (
              <div
                key={index}
                className={cn("min-w-0 flex-[0_0_auto] px-2.5", itemClassName)}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="block w-full rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  aria-label={`Open image preview: ${alt}`}
                >
                  {renderItem(item, index)}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}
