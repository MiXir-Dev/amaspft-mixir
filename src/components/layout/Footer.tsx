import { BrandLogo } from "@/components/BrandLogo";
import { TRADER_NAME } from "@/constants/app.const";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-background">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <BrandLogo className="hover:text-foreground" imageClassName="h-10 w-10" />
          <p className="text-xs text-muted-foreground">
            © {currentYear} {TRADER_NAME}. All rights reserved.
          </p>
        </div>
        <p className="mt-8 text-[11px] leading-relaxed text-muted-foreground/80 max-w-3xl">
          Disclaimer: Trading futures involves substantial risk and is not suitable for every
          investor. All content on this website is for educational and informational purposes only
          and does not constitute financial advice, investment advice, or a guarantee of results.
          Past performance is not indicative of future results.
        </p>
      </div>
    </footer>
  );
}
