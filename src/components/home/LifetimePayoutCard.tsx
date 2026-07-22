import { LIFETIME_PAYOUTS, TRADER_NAME } from "@/constants/app.const";
import { LightboxImage } from "@/components/ui/LightboxImage";
import lifetimeImg from "@/assets/payouts/lifetime.webp";

export function LifetimePayoutCard() {
  const alt = `AmasPFT lifetime payout proof screenshot showing more than ${LIFETIME_PAYOUTS} in withdrawals`;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface-1 to-background p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-mint/10 blur-3xl" />
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-mint">
                Lifetime Payouts
              </span>
              <div className="mt-4 text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-mint leading-none">
                {LIFETIME_PAYOUTS}
              </div>
              <p className="mt-6 max-w-md text-sm sm:text-base text-muted-foreground">
                Verified payout proof from {TRADER_NAME}. Withdrawn, settled, on
                record.
              </p>
            </div>
            <LightboxImage
              src={lifetimeImg}
              alt={alt}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-surface-2 sm:aspect-[1024/663]">
                <img
                  src={lifetimeImg}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="absolute inset-0 h-full w-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </LightboxImage>
          </div>
        </div>
      </div>
    </section>
  );
}
