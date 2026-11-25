import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { Todo, legal as s } from "@/components/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
  alternates: { canonical: "/impressum" },
};

export default function Impressum() {
  return (
    <LegalShell footer={<>© {SITE.name} · <Link href="/datenschutz">Datenschutz</Link></>}>
      <h1>Impressum</h1>
      <p className={s.lead}>Informationspflicht laut § 5 E-Commerce-Gesetz und Offenlegung laut § 25 Mediengesetz.</p>
      <div className={s.card}>
        <h2>Medieninhaber und Betreiber</h2>
        <address>
          BiBi&apos;s playcafé (in Gründung)<br />
          Inhaber: DI Akram El-Kormany<br />
          Millennium City, Bauteil 2, Top 02-04.0<br />
          Handelskai 94–96, 1200 Wien<br />
          Österreich
        </address>
        <h2>Kontakt</h2>
        <p>Telefon: <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a><br />E-Mail: <Todo>Geschäfts-E-Mail eintragen</Todo></p>
        <h2>Unternehmensangaben</h2>
        <p>
          Unternehmensgegenstand: Gastgewerbe (Kindercafé mit Spielbereich)<br />
          Rechtsform: Einzelunternehmen<br />
          GISA-Zahl: <Todo>nach Gewerbeanmeldung eintragen</Todo><br />
          UID-Nummer: <Todo>falls vorhanden eintragen</Todo><br />
          Gewerbebehörde: Magistratisches Bezirksamt für den 20. Bezirk<br />
          Mitgliedschaft: Wirtschaftskammer Wien, Fachgruppe Gastronomie<br />
          Berufsrecht: Gewerbeordnung, abrufbar unter <a href="https://www.ris.bka.gv.at" rel="noopener">ris.bka.gv.at</a>
        </p>
        <h2>Blattlinie</h2>
        <p>Information über das Angebot von BiBi&apos;s playcafé: Spielbereich, Café, Kurse und Feiern für Familien mit Kindern von 0 bis 4 Jahren.</p>
        <h2>Haftung für Inhalte und Links</h2>
        <p>Wir erstellen die Inhalte dieser Website mit Sorgfalt, übernehmen aber keine Gewähr für Vollständigkeit und Aktualität. Für Inhalte verlinkter externer Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
      </div>
    </LegalShell>
  );
}
