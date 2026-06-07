import { APP_CONSTS } from "@/constants/app.const";
import lifetimeImg from "@/assets/lifetime-payout.jpg";

export function LifetimePayoutCard() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface-1 to-background p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-mint/10 blur-3xl" />
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-mint">Lifetime Payouts</span>
              <div className="mt-4 text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight text-mint leading-none">
                {APP_CONSTS.lifetimePayouts}
              </div>
              <p className="mt-6 max-w-md text-sm sm:text-base text-muted-foreground">
                Verified payout proof from {APP_CONSTS.traderName}. Withdrawn, settled, on record.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-2 aspect-[4/3]">
              <img
                src={lifetimeImg}
                alt="Lifetime payouts dashboard screenshot"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
