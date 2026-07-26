import { GA_MEASUREMENT_ID } from "@/config/site";

const PLACEHOLDER = "G-XXXXXXXXXX";
export const analyticsEnabled = GA_MEASUREMENT_ID !== PLACEHOLDER;
const CONSENT_KEY = "bbc_analytics_consent_v1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __bbcAnalyticsInitialised?: boolean;
  }
}

export function getAnalyticsConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(CONSENT_KEY);
  return saved === "granted" || saved === "denied" ? saved : null;
}

export function setAnalyticsConsent(choice: "granted" | "denied") {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, choice);
}

export function clearAnalyticsConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CONSENT_KEY);
  window.location.reload();
}

export function initialiseAnalytics() {
  if (
    typeof window === "undefined" ||
    !analyticsEnabled ||
    getAnalyticsConsent() !== "granted" ||
    window.__bbcAnalyticsInitialised
  ) {
    return;
  }

  window.__bbcAnalyticsInitialised = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/**
 * Fire an analytics event. Safe no-op unless analytics is configured
 * and the visitor has made an affirmative choice.
 * Never pass personal data in params.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !analyticsEnabled || getAnalyticsConsent() !== "granted") {
    return;
  }
  try {
    initialiseAnalytics();
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
  } catch {
    /* no-op */
  }
}
