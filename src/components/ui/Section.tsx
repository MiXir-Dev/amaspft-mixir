import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  align?: "left" | "center";
};

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
  containerClassName,
  align = "left",
}: SectionProps) {
  return (
    <section id={id} className={cn("relative py-16 sm:py-24", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
          containerClassName,
        )}
      >
        {(eyebrow || title) && (
          <header
            className={cn(
              "mb-8 sm:mb-12 flex flex-col gap-3",
              align === "center" && "items-center text-center",
            )}
          >
            {eyebrow && (
              <span className="font-extrabold text-center uppercase tracking-[0.18em] text-mint text-1xl sm:text-3xl md:text-4xl leading-none">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-balance">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
