import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { legal as s } from "@/components/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
  alternates: { canonical: "/datenschutz" },
};

export default function Datenschutz() {
  return (
    <LegalShell footer={<>© {SITE.name} · <Link href="/impressum">Impressum</Link></>}>
      <h1>Datenschutzerklärung</h1>
      <p className={s.lead}>Wir verarbeiten personenbezogene Daten nur auf Grundlage der DSGVO und des österreichischen Datenschutzgesetzes (DSG).</p>
      <div className={s.card}>
        <h2>Verantwortlicher</h2>
        <address>BiBi&apos;s playcafé (in Gründung), DI Akram El-Kormany<br />Handelskai 94–96, Millennium City, 1200 Wien<br />E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></address>
        <h2>Besuch der Website</h2>
        <p>Beim Aufruf der Website speichert unser Hosting-Anbieter technisch notwendige Daten (IP-Adresse, Datum, Uhrzeit, aufgerufene Seite, Browser) in Server-Logfiles. Das dient dem sicheren Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Hosting-Anbieter: Hostinger International Ltd. (Zypern, EU).</p>
        <h2>Cookies und Tracking</h2>
        <p>Wir setzen keine Tracking- oder Marketing-Cookies und keine Analyse-Tools ein.</p>
        <h2>Schriftarten</h2>
        <p>Die Schriften „Fredoka“ und „Nunito“ werden direkt von unserem Server ausgeliefert. Beim Besuch der Website werden dafür keine Daten an Google oder andere Dritte übertragen.</p>
        <h2>Anfrage- und Kontaktformular</h2>
        <p>Wenn ihr uns über das Anfrageformular oder per E-Mail kontaktiert, verarbeiten wir eure Angaben (Art der Anfrage, Name, E-Mail-Adresse, Wunschtermin, Anzahl der Kinder und eure Nachricht), um eure Anfrage zu beantworten (Art. 6 Abs. 1 lit. b DSGVO). Das Formular schickt eure Angaben als E-Mail an unser Postfach; die Website selbst speichert sie nicht. Unser E-Mail-Postfach wird von Hostinger International Ltd. (Zypern, EU) betrieben. Wir löschen die Daten nach Erledigung, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
        <h2>Eure Rechte</h2>
        <p>Ihr habt das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenn ihr glaubt, dass die Verarbeitung eurer Daten gegen das Datenschutzrecht verstößt, könnt ihr euch bei der österreichischen Datenschutzbehörde beschweren: <a href="https://www.dsb.gv.at" rel="noopener">dsb.gv.at</a></p>
      </div>
    </LegalShell>
  );
}
