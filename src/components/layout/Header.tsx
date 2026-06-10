import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AppRoute } from "@/constants/app.const";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants/navigation.const";
import { CTAButton } from "@/components/ui/CTAButton";
import { BrandLogo } from "@/components/BrandLogo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isMentorshipPage = pathname === AppRoute.MENTORSHIP;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-background/70 backdrop-blur-xl py-2.5"
          : "bg-transparent py-3 sm:py-4",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo />

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {!isMentorshipPage && (
          <CTAButton
            to={AppRoute.MENTORSHIP}
            variant="primary"
            className="shrink-0 px-4 py-2 text-xs sm:text-sm"
            aria-label="Apply to Work With AmasPFT"
          >
            Apply
          </CTAButton>
        )}
      </div>
    </header>
  );
}
