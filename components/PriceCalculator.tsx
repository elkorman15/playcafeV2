"use client";
import { useEffect, useRef, useState } from "react";
import { PRICE, entryPrice } from "@/lib/site";

type Key = "kids" | "adults";
const ROWS: { key: Key; label: string; hint: string; less: string; more: string }[] = [
  { key: "kids", label: "Kinder", hint: "0 bis 5 Jahre", less: "Ein Kind weniger", more: "Ein Kind mehr" },
  { key: "adults", label: "Erwachsene", hint: "Eltern, Oma, Opa …", less: "Eine erwachsene Person weniger", more: "Eine erwachsene Person mehr" },
];

export default function PriceCalculator() {
  const [c, setC] = useState({ kids: 1, adults: 1 });
  const total = entryPrice(c.kids, c.adults);
  const totalRef = useRef<HTMLElement>(null);
  const first = useRef(true);

  // Kleiner „Hüpfer“ der Summe bei jeder Änderung (nicht beim ersten Rendern)
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = totalRef.current;
    if (!el) return;
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  }, [total]);

  const change = (k: Key, d: number) => setC((s) => ({ ...s, [k]: Math.min(PRICE.max, Math.max(1, s[k] + d)) }));

  return (
    <div className="calc pop" role="group" aria-labelledby="calc-title">
      <h3 id="calc-title">Was kostet unser Besuch?</h3>
      {ROWS.map((r) => (
        <div className="row" key={r.key}>
          <span id={`calc-${r.key}`}>{r.label}<small>{r.hint}</small></span>
          <div className="step">
            <button type="button" aria-label={r.less} disabled={c[r.key] <= 1} onClick={() => change(r.key, -1)}>−</button>
            <output aria-labelledby={`calc-${r.key}`}>{c[r.key]}</output>
            <button type="button" aria-label={r.more} disabled={c[r.key] >= PRICE.max} onClick={() => change(r.key, 1)}>+</button>
          </div>
        </div>
      ))}
      <div className="total"><span>Euer Eintritt</span><b ref={totalRef}>{total} €</b></div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {c.kids} {c.kids === 1 ? "Kind" : "Kinder"}, {c.adults} {c.adults === 1 ? "Erwachsener" : "Erwachsene"}: {total} Euro Eintritt
      </p>
      <p className="hint">Mindestens ein Erwachsener begleitet die Kinder, die Aufsicht bleibt bei euch.</p>
    </div>
  );
}
