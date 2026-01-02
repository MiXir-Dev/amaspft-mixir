import type { RefObject } from "react";

type PnLDotsProps = {
  count: number;
  activeIndex: number;
  scrollContainerRef: RefObject<HTMLDivElement>;
};

const PnLDots = ({ count, activeIndex, scrollContainerRef }: PnLDotsProps) => {
  return (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i === activeIndex ? "bg-mintgreen-300" : "bg-gray-700"
          } hover:bg-mintgreen-200 transition-colors cursor-pointer`}
          onClick={() => {
            if (!scrollContainerRef.current) return;
            const width = window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 320 : 360;
            scrollContainerRef.current.scrollTo({
              left: i * width,
              behavior: "smooth",
            });
          }}
        />
      ))}
    </div>
  );
};

export default PnLDots;
