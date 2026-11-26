"use client";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

// Wird erst im Browser berechnet: Die Seite ist statisch gebaut, das Datum ändert sich täglich.
function useDaysLeft() {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const diff = new Date(SITE.openingDate).getTime() - Date.now();
    setDays(diff > 0 ? Math.ceil(diff / 864e5) : 0);
  }, []);
  return days;
}

export function Countdown() {
  const d = useDaysLeft();
  return (
    <div className="count">
      <div><b>{d ?? "–"}</b><span>Tage</span></div>
      <div><b>{d === null ? "–" : Math.ceil(d / 7)}</b><span>Wochen</span></div>
    </div>
  );
}

export function OpeningStatus() {
  const d = useDaysLeft();
  return (
    <span className="status">
      <i aria-hidden="true" />
      <span>{d === 0 ? "Wir haben geöffnet: Mo–Sa, 9–19 Uhr" : "Wir eröffnen im März 2027"}</span>
    </span>
  );
}

export function Year() {
  const [y, setY] = useState<number | null>(null);
  useEffect(() => setY(new Date().getFullYear()), []);
  return <>{y ?? new Date(SITE.openingDate).getFullYear() - 1}</>;
}
