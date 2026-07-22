import { Link } from "@tanstack/react-router";
import logoSrc from "@/assets/logo/logo.webp";
import { AppRoute } from "@/constants/app.const";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
};

export function BrandLogo({
  className,
  imageClassName,
  textClassName,
}: BrandLogoProps) {
  return (
    <Link
      to={AppRoute.HOME}
      className={cn(
        "inline-flex items-center gap-3 text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-mint",
        className,
      )}
    >
      <img
        src={logoSrc}
        alt="AmasPFT logo"
        width={160}
        height={160}
        decoding="async"
        className={cn(
          "h-9 w-9 rounded-full border border-white/10 bg-black object-contain p-1",
          imageClassName,
        )}
      />
      <span className={cn("text-base sm:text-lg", textClassName)}>
        <span>Amas</span>
        <span className="text-mint">PFT</span>
        <span className="text-mint">.</span>
      </span>
    </Link>
  );
}
