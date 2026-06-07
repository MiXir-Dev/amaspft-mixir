import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-all duration-200 select-none whitespace-nowrap";

const styles: Record<Variant, string> = {
  primary:
    "bg-mint text-primary-foreground hover:bg-mint-hover shadow-[0_8px_30px_-10px_color-mix(in_oklab,var(--mint)_60%,transparent)] hover:shadow-[0_12px_40px_-10px_color-mix(in_oklab,var(--mint)_75%,transparent)]",
  ghost:
    "border border-white/10 bg-white/[0.02] text-foreground hover:bg-white/[0.06] hover:border-white/20",
};

export function CTAButton({
  children,
  to,
  href,
  variant = "primary",
  className,
  onClick,
  "aria-label": ariaLabel,
}: Props) {
  const cls = cn(base, styles[variant], className);
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
