import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemClassName?: string;
  duration?: number;
  className?: string;
};

export function MarqueeRail<T>({
  items,
  renderItem,
  itemClassName,
  duration = 60,
  className,
}: Props<T>) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent" />
      <div
        className="flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <div key={i} className={cn("shrink-0", itemClassName)}>
            {renderItem(item, i % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
