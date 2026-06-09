const GA_SCRIPT_SOURCE = "https://www.googletagmanager.com/gtag/js";
const GA_SCRIPT_ID = "google-analytics";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

let analyticsBootstrapped = false;
let lastTrackedPath: string | null = null;

function gtag(...args: unknown[]) {
  window.dataLayer.push(args);
}

function getPagePath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function isAnalyticsEnabled() {
  return typeof window !== "undefined" && Boolean(GA_MEASUREMENT_ID);
}

export function initAnalytics() {
  if (!isAnalyticsEnabled() || analyticsBootstrapped) {
    return;
  }

  analyticsBootstrapped = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || gtag;
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  if (!document.getElementById(GA_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `${GA_SCRIPT_SOURCE}?id=${encodeURIComponent(GA_MEASUREMENT_ID!)}`;
    document.head.append(script);
  }
}

export function trackPageView(path = getPagePath()) {
  if (!isAnalyticsEnabled() || !window.gtag || lastTrackedPath === path) {
    return;
  }

  lastTrackedPath = path;
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
    send_to: GA_MEASUREMENT_ID,
  });
}
