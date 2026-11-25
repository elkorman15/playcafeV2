"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ANALYTICS_EVENT_NAME, pickCampaignQuery, trackEvent, type AnalyticsData } from "@/lib/analytics";

type Umami = { track: (fn: (props: Record<string, unknown>) => Record<string, unknown>) => void };
declare global {
  interface Window { umami?: Umami }
}

const SCRIPT_ID = "bibis-umami";
const MAX_QUEUE = 50;

// Klicks deklarativ im Markup, damit Server Components nichts importieren müssen:
//   <a data-analytics-event="cta_click" data-analytics-placement="hero">
function readClick(el: HTMLElement) {
  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(el.dataset)) {
    if (key === "analyticsEvent" || !key.startsWith("analytics") || value == null) continue;
    const prop = key.slice("analytics".length);
    data[prop.charAt(0).toLowerCase() + prop.slice(1)] = value;
  }
  return { name: el.dataset.analyticsEvent ?? "", data };
}

/** Lädt das selbst gehostete Umami-Skript; ohne Script-URL oder Website-ID passiert nichts. */
export default function Analytics({ scriptUrl, hostUrl, websiteId }: { scriptUrl?: string; hostUrl?: string; websiteId?: string }) {
  const pathname = usePathname();
  const enabled = Boolean(scriptUrl && websiteId);
  const queue = useRef<{ name: string; data: AnalyticsData }[]>([]);
  const lastPage = useRef("");

  useEffect(() => {
    if (!enabled) return;

    const sendPageview = () => {
      const umami = window.umami;
      if (!umami?.track) return false;
      const path = location.pathname;
      if (lastPage.current !== path) {
        const url = path + pickCampaignQuery(location.search);
        umami.track((p) => ({ ...p, website: websiteId, url, title: document.title }));
        lastPage.current = path;
      }
      return true;
    };
    const sendEvent = (e: { name: string; data: AnalyticsData }) => {
      const umami = window.umami;
      if (!umami?.track) return false;
      umami.track((p) => ({ ...p, website: websiteId, name: e.name, data: e.data }));
      return true;
    };
    const flush = () => {
      if (!sendPageview()) return;
      queue.current = queue.current.filter((e) => !sendEvent(e));
    };

    if (window.umami?.track) flush();
    else if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.defer = true;
      s.src = scriptUrl!;
      s.dataset.websiteId = websiteId;
      s.dataset.autoTrack = "false";
      s.dataset.excludeSearch = "true";
      s.dataset.excludeHash = "true";
      s.dataset.doNotTrack = "true";
      if (hostUrl) s.dataset.hostUrl = hostUrl;
      s.addEventListener("load", flush, { once: true });
      document.head.appendChild(s);
    }

    const onEvent = (ev: Event) => {
      const detail = (ev as CustomEvent<{ name: string; data: AnalyticsData }>).detail;
      if (!detail?.name || sendEvent(detail)) return;
      queue.current = [...queue.current, detail].slice(-MAX_QUEUE);
    };
    const onClick = (ev: MouseEvent) => {
      const el = ev.target instanceof Element ? ev.target.closest<HTMLElement>("[data-analytics-event]") : null;
      if (!el) return;
      const { name, data } = readClick(el);
      trackEvent(name, data);
    };

    window.addEventListener(ANALYTICS_EVENT_NAME, onEvent);
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      window.removeEventListener(ANALYTICS_EVENT_NAME, onEvent);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, [enabled, scriptUrl, hostUrl, websiteId, pathname]);

  return null;
}
