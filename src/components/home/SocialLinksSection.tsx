import { SOCIAL_LINKS } from "@/constants/socials.const";

export function SocialLinksSection() {
  return (
    <section className="py-12 sm:py-16 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="font-medium uppercase tracking-[0.22em] text-mint text-xs sm:text-sm">
          FOLLOW THE PROCESS
        </span>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {SOCIAL_LINKS.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] h-11 w-11 sm:w-auto sm:px-5 sm:py-2.5 justify-center text-sm text-muted-foreground hover:text-mint hover:border-mint/40 transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
