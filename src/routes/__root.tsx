import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import "yet-another-react-lightbox/styles.css";
import {
  AMASPFT_ENTITY_ID,
  ALTERNATE_BRAND_NAME,
  AppRoute,
  BRAND_DESCRIPTION,
  BRAND_IMAGE_PATH,
  OG_IMAGE_PATH,
  OG_X_IMAGE_PATH,
  POCKETS_FULL_TRADING_ENTITY_ID,
  SAME_AS_LINKS,
  SITE_NAME,
  SITE_URL,
  TRADER_NAME,
  WEBSITE_ENTITY_ID,
  absoluteUrl,
} from "@/constants/app.const";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { getAnalyticsHeadScripts } from "@/lib/analytics";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to={AppRoute.HOME}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            to={AppRoute.HOME}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: `${SITE_NAME} | ${ALTERNATE_BRAND_NAME} Official Website` },
        { name: "description", content: BRAND_DESCRIPTION },
        { name: "author", content: TRADER_NAME },
        { name: "application-name", content: SITE_NAME },
        { name: "theme-color", content: "#050505" },
        {
          property: "og:title",
          content: `${SITE_NAME} | ${ALTERNATE_BRAND_NAME}`,
        },
        { property: "og:description", content: BRAND_DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:url", content: SITE_URL },
        { property: "og:image", content: absoluteUrl(OG_IMAGE_PATH) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@AmasPFT" },
        {
          name: "twitter:title",
          content: `${SITE_NAME} | ${ALTERNATE_BRAND_NAME}`,
        },
        {
          name: "twitter:description",
          content: BRAND_DESCRIPTION,
        },
        { name: "twitter:image", content: absoluteUrl(OG_X_IMAGE_PATH) },
        {
          "script:ld+json": {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": AMASPFT_ENTITY_ID,
                name: SITE_NAME,
                alternateName: ["Amas", "Amas PFT"],
                url: SITE_URL,
                description:
                  "AmasPFT is a futures trader and the creator of Pockets Full Trading.",
                image: absoluteUrl(BRAND_IMAGE_PATH),
                sameAs: SAME_AS_LINKS,
                knowsAbout: [
                  "Futures trading",
                  "Price action trading",
                  "NASDAQ futures",
                  "Trading education",
                ],
              },
              {
                "@type": "Organization",
                "@id": POCKETS_FULL_TRADING_ENTITY_ID,
                name: ALTERNATE_BRAND_NAME,
                alternateName: ["PFT", `${SITE_NAME} Community`],
                url: SITE_URL,
                description:
                  "Pockets Full Trading is the futures trading education and mentorship community created by AmasPFT.",
                logo: absoluteUrl(BRAND_IMAGE_PATH),
                founder: { "@id": AMASPFT_ENTITY_ID },
                sameAs: SAME_AS_LINKS,
              },
              {
                "@type": "WebSite",
                "@id": WEBSITE_ENTITY_ID,
                name: SITE_NAME,
                alternateName: ALTERNATE_BRAND_NAME,
                url: SITE_URL,
                description: BRAND_DESCRIPTION,
                inLanguage: "en",
                publisher: { "@id": POCKETS_FULL_TRADING_ENTITY_ID },
              },
            ],
          },
        },
      ],
      links: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
        },
        { rel: "stylesheet", href: appCss },
      ],
      scripts: getAnalyticsHeadScripts(),
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AnalyticsTracker />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
