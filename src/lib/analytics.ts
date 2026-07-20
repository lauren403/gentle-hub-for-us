import { GA_MEASUREMENT_ID } from "@/config/site";

const PLACEHOLDER = "G-XXXXXXXXXX";
export const analyticsEnabled = GA_MEASUREMENT_ID !== PLACEHOLDER;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire an analytics event. Safe no-op when GA isn't configured.
 * Never pass personal data in params.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
    if (analyticsEnabled && typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
  } catch {
    /* no-op */
  }
}
