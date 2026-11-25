import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { legal as s } from "@/components/LegalShell";

export const metadata: Metadata = { title: "Seite nicht gefunden", robots: { index: false } };

export default function NotFound() {
  return (
    <LegalShell center>
      <h1>Hoppla, hier ist niemand zum Spielen.</h1>
      <p className={s.lead}>Diese Seite gibt es nicht oder nicht mehr. Auf der Startseite findet ihr alles über Spielwelt, Eintritt, Karte und Kurse.</p>
      <p style={{ marginTop: "1.5rem" }}><Link className={s.back} href="/">Zur Startseite</Link></p>
    </LegalShell>
  );
}
