// Umami (selbst gehostet), aufgebaut wie in fm-app: cookielos, respektiert Do Not Track,
// keine Namen, E-Mail-Adressen oder Freitexte. Events laufen über ein Window-Event, damit
// Client-Komponenten nur trackEvent() aufrufen und nichts über das Umami-Skript wissen müssen.

export const ANALYTICS_EVENT_NAME = "bibis:analytics-event";

// Alle Event-Namen an einer Stelle, damit Code und Umami-Dashboard zusammenpassen.
export const EVENTS = Object.freeze({
  ctaClick: "cta_click",
  inquiryOpen: "inquiry_open",
  inquirySent: "inquiry_sent",
});

const BLOCKED_KEY = /(email|mail|name|phone|note|text|message|id)$/i;
const CAMPAIGN_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export type AnalyticsData = Record<string, string | number | boolean>;

/** Nur einfache Werte, keine personenbezogenen Schlüssel, Länge begrenzt. */
export function sanitizeData(data: Record<string, unknown> = {}): AnalyticsData {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([k, v]) => !BLOCKED_KEY.test(k) && ["string", "number", "boolean"].includes(typeof v))
      .slice(0, 20)
      .map(([k, v]) => [k, typeof v === "string" ? v.slice(0, 100) : v]),
  ) as AnalyticsData;
}

/** Das Skript verwirft alle Query-Parameter; nur UTM-Parameter bleiben, damit Kampagnen messbar sind. */
export function pickCampaignQuery(search = ""): string {
  const params = new URLSearchParams(search);
  const kept = new URLSearchParams();
  for (const key of CAMPAIGN_PARAMS) {
    const value = params.get(key);
    if (value) kept.set(key, value.slice(0, 100));
  }
  const q = kept.toString();
  return q ? `?${q}` : "";
}

export function trackEvent(name: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const n = String(name || "").trim().slice(0, 50);
  if (!n) return;
  window.dispatchEvent(new CustomEvent(ANALYTICS_EVENT_NAME, { detail: { name: n, data: sanitizeData(data) } }));
}

/** Herkunft (Origin) einer URL oder "" – für die Content-Security-Policy. */
export function originOf(value?: string): string {
  try {
    return value ? new URL(value).origin : "";
  } catch {
    return "";
  }
}

export const umamiOrigins = () =>
  [...new Set([originOf(process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL), originOf(process.env.NEXT_PUBLIC_UMAMI_HOST_URL)].filter(Boolean))];
