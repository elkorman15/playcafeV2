"use client";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { vars } from "@/lib/css";

export type MenuPanel = { id: string; tab: string; title: string; color: string; content: ReactNode };

/** Tabs nach WAI-ARIA-Muster: Pfeiltasten, Pos1/Ende, nur der aktive Tab ist im Tab-Fokus. */
export default function MenuTabs({ panels, label }: { panels: MenuPanel[]; label: string }) {
  const [sel, setSel] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = panels.length;
    const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setSel(next);
    refs.current[next]?.focus();
  };

  return (
    <>
      <div className="tabs" role="tablist" aria-label={label}>
        {panels.map((p, i) => (
          <button key={p.id} ref={(el) => { refs.current[i] = el; }} className="tab" role="tab" type="button"
            id={`tab-${p.id}`} aria-controls={`panel-${p.id}`} aria-selected={sel === i} tabIndex={sel === i ? 0 : -1}
            onClick={() => setSel(i)} onKeyDown={(e) => onKey(e, i)}>
            <i style={vars({ "--c": p.color })} aria-hidden="true" />{p.tab}
          </button>
        ))}
      </div>
      {panels.map((p, i) => (
        <div key={p.id} className="panel" role="tabpanel" id={`panel-${p.id}`} aria-labelledby={`tab-${p.id}`} tabIndex={0} hidden={sel !== i}>
          <h3 className="sr-only">{p.title}</h3>
          {p.content}
        </div>
      ))}
    </>
  );
}
