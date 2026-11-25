import type { CSSProperties } from "react";

// Erlaubt CSS-Custom-Properties (z. B. --c, --d) im style-Prop ohne Typfehler.
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;
export const vars = (v: CSSVars): CSSProperties => v;

export type Tone = "beige" | "sand" | "cream" | "terra" | "blue" | "sage" | "mustard" | "blush" | "lav" | "mint" | "peach" | "butter" | "sky";
export const tone = (t: Tone) => `var(--${t})`;
