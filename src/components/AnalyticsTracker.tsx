import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { initAnalytics, trackPageView } from "@/lib/analytics";

export function AnalyticsTracker() {
  const location = useLocation({
    select: (state) => ({
      pathname: state.pathname,
      hash: state.hash,
    }),
  });

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(
      `${location.pathname}${window.location.search}${location.hash ?? ""}`,
    );
  }, [location.hash, location.pathname]);

  return null;
}
