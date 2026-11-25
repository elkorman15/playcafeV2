"use client";
import { useEffect } from "react";

// Registriert den Service Worker nur in Produktion über HTTPS (schnelle Wiederholungsbesuche, Offline-Ansicht).
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || location.protocol !== "https:" || !("serviceWorker" in navigator)) return;
    const register = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);
  return null;
}
