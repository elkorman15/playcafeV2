import Link from "next/link";
import { LineIcon, Squiggle, Wave } from "@/components/Deco";
import Logo from "@/components/Logo";
import { Countdown, OpeningStatus, Year } from "@/components/Opening";
import { vars } from "@/lib/css";
import { FAQ, SITE } from "@/lib/site";

const AMENITIES = [
  { t: "Gratis WLAN", c: "var(--peach)", icon: <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01" /> },
  { t: "Stillfreundlich", c: "var(--lav)", icon: <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" /> },
  { t: "Hochstühle", c: "var(--mint)", icon: <path d="M6 4h12v6H6zM9 10v10M15 10v10M5 20h14" /> },
  { t: "Garderobe & Schuhschrank", c: "var(--butter)", icon: <path d="M4 18h16M6 18V8h12v10M9 8V5h6v3" /> },
];

const HOURS = [
  { th: "Spielbereich & Café", td: "Mo – Sa" },
  { th: "Kurse", td: "vormittags unter der Woche" },
  { th: "Feiern & Raummiete", td: "Mo – Sa, 16 – 19 Uhr" },
  { th: "Sonntag", td: "Feiern & Workshops, 2 Zeitfenster" },
];

export function Visit() {
  const text = { fontFamily: "var(--body)", fontWeight: 800 } as const;
  return (
    <section id="besuch" aria-labelledby="besuch-title">
      <Squiggle kind="v" color="sage" top="38%" left={-14} />
      <Squiggle kind="c" color="terra" bottom="12%" right={-16} />
      <Squiggle kind="k" color="blue" top="2rem" right={-15} />
      <Squiggle kind="h" color="terra" bottom="2rem" left={-40} />
      <div className="wrap">
        <div className="head">
          <span className="kicker" style={vars({ "--k": "var(--sage)" })}>Euer Besuch</span>
          <h2 id="besuch-title">Mitten in der Millennium City, direkt an der U6.</h2>
          <p>Ein Besuch bei uns lässt sich gut mit Einkauf, Arzttermin oder einem Spaziergang an der Donau verbinden.</p>
        </div>
        <div className="visit">
          <div className="card pop">
            <div className="map" aria-hidden="true">
              <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" focusable="false">
                <rect width="400" height="250" fill="#EFE6DC" />
                <path d="M-20 195C80 160 160 230 260 172S380 120 430 140V260H-20z" fill="#A9CFE2" />
                <text x="300" y="218" fontSize="14" fill="#FBF6EF" style={text}>Donau</text>
                <path d="M0 118H400" stroke="#FBF6EF" strokeWidth="14" /><path d="M150 0V250" stroke="#FBF6EF" strokeWidth="10" />
                <path d="M40 118H360" stroke="#8A5426" strokeWidth="4" strokeDasharray="10 7" />
                <circle cx="118" cy="118" r="10" fill="#8A5426" /><text x="84" y="148" fontSize="13" fill="#2F3138" style={text}>U6 Handelskai</text>
                <rect x="190" y="54" width="86" height="46" rx="10" fill="#FBF6EF" /><rect x="212" y="18" width="22" height="42" rx="4" fill="#FBF6EF" />
                <g transform="translate(246 24)"><path d="M0 0c-15 0-25 10-25 24 0 18 25 40 25 40s25-22 25-40C25 10 15 0 0 0z" fill="#EC9B86" /><circle cy="24" r="9" fill="#FBF6EF" /></g>
                <text x="188" y="92" fontSize="13" fill="#2F3138" style={text}>Millennium City</text>
              </svg>
            </div>
            <h3>So findet ihr uns</h3>
            <address style={{ marginBottom: "1.1rem", fontWeight: 600, fontStyle: "normal" }}>
              <b>{SITE.name}</b><br />Millennium City, Bauteil 2<br />Handelskai 94–96, 1200 Wien
            </address>
            <ul className="transit">
              <li><span className="lb lb-u6" aria-label="U-Bahn-Linie U6">U6</span>Station Handelskai, wenige Gehminuten</li>
              <li><span className="lb lb-s" aria-label="S-Bahn">S</span>S-Bahn Handelskai</li>
              <li><span className="lb lb-p" aria-label="Parken">P</span>Parkgarage im Haus</li>
            </ul>
            <p style={{ marginTop: "1.3rem" }}>
              <a className="btn soft" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                Route planen<span className="sr-only"> (öffnet Google Maps in neuem Tab)</span>
              </a>
            </p>
          </div>
          <div className="card pop">
            <OpeningStatus />
            <h3>Öffnungszeiten</h3>
            <table className="hours" aria-describedby="hn">
              <caption className="sr-only">Öffnungszeiten</caption>
              <tbody>
                {HOURS.map((h) => <tr key={h.th}><th scope="row">{h.th}</th><td>{h.td}</td></tr>)}
              </tbody>
            </table>
            <p id="hn" style={{ color: "var(--muted)", fontSize: ".92rem", marginTop: ".9rem", fontWeight: 600 }}>
              Unsere Öffnungszeiten richten sich nach der Gastronomie der Millennium City. Die genauen Uhrzeiten geben wir vor der Eröffnung bekannt.
            </p>
            <h3 style={{ marginTop: "1.8rem" }}>Kontakt</h3>
            <p className="contact" style={{ fontWeight: 600 }}>
              Telefon: <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a><br />
              E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
              Instagram: <a href={SITE.instagram} rel="noopener">{SITE.instagramHandle}</a>
            </p>
          </div>
        </div>
        <ul className="amen" role="list" aria-label="Ausstattung">
          {AMENITIES.map((a) => (
            <li className="pop" key={a.t}>
              <span className="i" style={vars({ "--c": a.c })}><LineIcon stroke="#2F3138">{a.icon}</LineIcon></span>{a.t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="pt-0" aria-labelledby="faq-title">
      <Squiggle kind="v" color="terra" top={0} left={-14} />
      <Squiggle kind="k" color="blue" top="30%" right={-15} />
      <Squiggle kind="h" color="sage" bottom={0} right={-40} />
      <div className="wrap">
        <div className="head center">
          <span className="kicker" style={vars({ "--k": "var(--butter)" })}>Fragen &amp; Antworten</span>
          <h2 id="faq-title">Gut zu wissen vor dem ersten Besuch.</h2>
        </div>
        <div className="faq">
          {FAQ.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}<span className="pm" aria-hidden="true" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Signup() {
  return (
    <div className="wrap signup-wrap" id="eroeffnung">
      <Squiggle kind="c" color="sage" top="-3rem" left={-60} />
      <Squiggle kind="v" color="blue" bottom="-2rem" right={-60} />
      <div className="signup" role="region" aria-labelledby="signup-title">
        <svg className="sun-deco spin" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
          <g stroke="#FCF2DD" strokeWidth="14" strokeLinecap="round"><path d="M100 10v26M100 164v26M10 100h26M164 100h26M36 36l18 18M146 146l18 18M36 164l18-18M146 54l18-18" /></g>
          <circle cx="100" cy="100" r="44" fill="#FCF2DD" />
        </svg>
        <div>
          <h2 id="signup-title">Seid bei der Eröffnung dabei!</h2>
          <p>Auf Instagram erfahrt ihr als Erste, wann BiBi&apos;s playcafé öffnet und wann die Kurse starten.</p>
          <span className="gift">
            <LineIcon width={2.2}><rect x="3" y="9" width="18" height="12" rx="2" /><path d="M12 9v12M3 13h18M12 9C10 5 6 5 7 8s5 1 5 1 4 2 5-1-3-3-5 1" /></LineIcon>
            Eröffnungswoche: Gratis-Muffin + Babyccino
          </span>
          <Countdown />
        </div>
        <div className="signup-cta">
          <p>Baustelle, Einrichtung und Eröffnungstermin: Wir nehmen euch auf Instagram mit.</p>
          <a className="btn" href={SITE.instagram} rel="noopener">Folgt uns: {SITE.instagramHandle}</a>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <Squiggle kind="h" color="terra" top="3rem" left={-40} />
      <Squiggle kind="k" color="sage" top="2rem" right={-15} />
      <Wave shape="c" from="beige" to="sand" />
      <div className="wrap">
        <div className="foot">
          <div>
            <Logo href="#main" label="BiBi's playcafé, nach oben" />
            <p className="claim">{SITE.claim}</p>
            <p>Das Kindercafé für 0–5 Jahre in der Millennium City Wien.</p>
          </div>
          <nav aria-labelledby="f-entdecken"><h2 id="f-entdecken" className="fh">Entdecken</h2><ul>
            <li><a href="#spielen">Spielwelt</a></li><li><a href="#karte">Speisekarte</a></li><li><a href="#kurse">Kurse</a></li><li><a href="#arbeiten">Remote Work</a></li>
          </ul></nav>
          <nav aria-labelledby="f-besuchen"><h2 id="f-besuchen" className="fh">Besuchen</h2><ul>
            <li><a href="#preise">Eintritt</a></li><li><a href="#feiern">Feiern &amp; Raummiete</a></li><li><a href="#besuch">Anfahrt &amp; Zeiten</a></li>
          </ul></nav>
          <nav aria-labelledby="f-recht"><h2 id="f-recht" className="fh">Rechtliches</h2><ul>
            <li><Link href="/impressum">Impressum</Link></li><li><Link href="/datenschutz">Datenschutz</Link></li><li><a href={SITE.instagram} rel="noopener">Instagram</a></li>
          </ul></nav>
        </div>
        <div className="legal"><span>© <Year /> {SITE.name} · Handelskai 94–96, 1200 Wien</span><span>Schön, dass du da bist!</span></div>
      </div>
    </footer>
  );
}
