import type { CSSProperties } from "react";
import { tone, vars, type Tone } from "@/lib/css";

/** SVG-Sprite für die Pinselstriche am Seitenrand. Einmal pro Seite einbinden. */
export function SquiggleSprite() {
  const stroke = { fill: "none", stroke: "currentColor", strokeLinecap: "round", filter: "url(#brush)" } as const;
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="brush" filterUnits="userSpaceOnUse" x="-40" y="-40" width="320" height="320">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={4} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={1.3} />
        </filter>
        <symbol id="sq-v" viewBox="0 0 74 230"><path d="M32 8C64 42 8 82 38 120C62 150 20 186 42 222" strokeWidth={13} {...stroke} /></symbol>
        <symbol id="sq-h" viewBox="0 0 170 96"><path d="M8 64C34 22 56 88 88 50C114 20 134 74 162 40" strokeWidth={12} {...stroke} /></symbol>
        <symbol id="sq-c" viewBox="0 0 96 200"><path d="M8 10C58 22 80 62 50 96C24 124 30 164 86 190" strokeWidth={13} {...stroke} /></symbol>
        <symbol id="sq-k" viewBox="0 0 90 170"><path d="M80 10C30 30 22 76 56 98C80 114 70 146 20 160" strokeWidth={12} {...stroke} /></symbol>
      </defs>
    </svg>
  );
}

type Pos = Pick<CSSProperties, "top" | "bottom" | "left" | "right">;

/** Dekorativer Pinselstrich. kind: v = senkrecht, h = waagrecht, c/k = Kurven. */
export function Squiggle({ kind, color, ...pos }: { kind: "v" | "h" | "c" | "k"; color: Tone } & Pos) {
  return (
    <svg className={`sq ${kind}`} style={vars({ "--s": tone(color), ...pos })} aria-hidden="true" focusable="false">
      <use href={`#sq-${kind}`} />
    </svg>
  );
}

const WAVES = {
  a: "M0 40c120-30 240-30 360 0s240 30 360 0 240-30 360 0 240 30 360 0v40H0z",
  b: "M0 50c160 30 320 30 480 0s320-30 480 0 320 30 480 0v30H0z",
  c: "M0 40c120 30 240 30 360 0s240-30 360 0 240 30 360 0 240-30 360 0v40H0z",
  d: "M0 50c160-30 320-30 480 0s320 30 480 0 320-30 480 0v30H0z",
} as const;

/** Wellenförmiger Übergang zwischen zwei Farbflächen. */
export function Wave({ shape, from, to }: { shape: keyof typeof WAVES; from?: Tone; to: Tone }) {
  return (
    <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" focusable="false"
      style={from ? { background: tone(from) } : undefined}>
      <path d={WAVES[shape]} fill={tone(to)} />
    </svg>
  );
}

/** Kleine Strich-Icons (24er Raster), rein dekorativ. */
export function LineIcon({ d, children, stroke = "currentColor", width = 2 }: { d?: string; children?: React.ReactNode; stroke?: string; width?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {d ? <path d={d} /> : children}
    </svg>
  );
}
