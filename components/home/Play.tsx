import { Squiggle, Wave, LineIcon } from "@/components/Deco";
import PriceCalculator from "@/components/PriceCalculator";
import { vars } from "@/lib/css";
import { PRICE } from "@/lib/site";

const WHY = [
  {
    t: "Nur für 0–5 Jahre", c: "var(--peach)",
    p: "Alles ist auf Babys und Kleinkinder abgestimmt. Große Kinder, die wild herumtoben, gibt es hier nicht.",
    icon: <><circle cx="24" cy="20" r="11" fill="#F3C4BB" /><circle cx="20" cy="19" r="1.8" fill="#2F3138" /><circle cx="28" cy="19" r="1.8" fill="#2F3138" /><path d="M20 24q4 3 8 0" stroke="#2F3138" strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M12 42c0-7 5-11 12-11s12 4 12 11" fill="#EC9B86" /></>,
  },
  {
    t: "Spielen mit Mehrwert", c: "var(--mint)",
    p: "Montessori-, Sensorik- und Kreativecken mit Holzspielzeug fördern Neugier und Selbstständigkeit.",
    icon: <><rect x="8" y="26" width="12" height="12" rx="2" fill="#EC9B86" /><rect x="20" y="26" width="12" height="12" rx="2" fill="#A9CFE2" /><rect x="14" y="14" width="12" height="12" rx="2" fill="#F1CD75" /><circle cx="37" cy="31" r="7" fill="#ACB08D" /></>,
  },
  {
    t: "Richtig guter Kaffee", c: "var(--butter)",
    p: "Barista-Kaffee, Matcha und frische Smoothies, während ihr euer Kind vom Sofa aus im Blick habt.",
    icon: <><path d="M10 18h22v12a8 8 0 0 1-8 8h-6a8 8 0 0 1-8-8z" fill="#EC9B86" /><path d="M32 21h3a5 5 0 0 1 0 10h-3" stroke="#EC9B86" strokeWidth="3.5" fill="none" /><path d="M16 8c-2 3 2 4 0 7M22 8c-2 3 2 4 0 7" stroke="#7A7D6A" strokeWidth="2.5" fill="none" strokeLinecap="round" /></>,
  },
  {
    t: "Eine Community", c: "var(--lav)",
    p: "Stillgruppe, Krabbelgruppe, Mama-Baby-Yoga und Workshops. Hier finden Eltern Austausch und Freundschaften.",
    icon: <><circle cx="16" cy="18" r="7" fill="#F3C4BB" /><circle cx="32" cy="18" r="7" fill="#A9CFE2" /><path d="M5 40c0-8 5-12 11-12s11 4 11 12z" fill="#EC9B86" /><path d="M21 40c0-8 5-12 11-12s11 4 11 12z" fill="#ACB08D" /></>,
  },
];

export function Why() {
  return (
    <div className="band band-cream">
      <section className="pt-sm" aria-labelledby="why-title">
        <Squiggle kind="v" color="blue" top="1rem" right={-14} />
        <Squiggle kind="h" color="terra" top="45%" left={-40} />
        <Squiggle kind="k" color="mustard" bottom="2rem" right={-16} />
        <Squiggle kind="c" color="sage" bottom="-1rem" left={-17} />
        <div className="wrap">
          <div className="head center">
            <span className="kicker" style={vars({ "--k": "var(--peach)" })}>Warum BiBi&apos;s?</span>
            <h2 id="why-title">Ein Ort, an dem Kind und Eltern gleich wichtig sind.</h2>
            <p>Kein lauter Indoor-Spielplatz, sondern ein ruhiger, liebevoller Raum, der genau für die Allerkleinsten gemacht ist.</p>
          </div>
          <div className="why">
            {WHY.map((w) => (
              <article className="pop" key={w.t}>
                <div className="ic" style={vars({ "--c": w.c })}><svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">{w.icon}</svg></div>
                <h3>{w.t}</h3>
                <p>{w.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Wave shape="b" from="cream" to="beige" />
    </div>
  );
}

const CORNERS = [
  { age: "0–1 J.", t: "Ruhiger Babybereich", p: "Weich, geschützt und abgetrennt für die Allerkleinsten.",
    icon: <><circle cx="48" cy="48" r="44" fill="#F7D9CF" /><path d="M48 20v12" stroke="#7A7D6A" strokeWidth="3" /><circle cx="48" cy="40" r="9" fill="#F1CD75" /><circle cx="32" cy="56" r="8" fill="#A9CFE2" /><circle cx="64" cy="56" r="8" fill="#ACB08D" /><path d="M28 44L48 32 68 44" stroke="#7A7D6A" strokeWidth="2" fill="none" /></> },
  { age: "1–5 J.", t: "Montessori & Sensorik", p: "Mit großer Busy-Board-Wand zum Drehen, Schieben und Entdecken.",
    icon: <><rect x="8" y="12" width="80" height="72" rx="14" fill="#DCECF4" /><circle cx="30" cy="34" r="9" fill="#EC9B86" /><rect x="52" y="26" width="20" height="16" rx="4" fill="#F1CD75" /><path d="M22 64h20" stroke="#7A7D6A" strokeWidth="6" strokeLinecap="round" /><circle cx="64" cy="62" r="8" fill="none" stroke="#ACB08D" strokeWidth="5" /></> },
  { age: "2–5 J.", t: "Spielküche & Supermarkt", p: "Kochen, einkaufen und bezahlen wie die Großen.",
    icon: <><rect x="12" y="30" width="72" height="54" rx="10" fill="#EC9B86" /><circle cx="34" cy="46" r="8" fill="#FBF6EF" /><circle cx="62" cy="46" r="8" fill="#FBF6EF" /><rect x="22" y="62" width="52" height="14" rx="4" fill="#F7D9CF" /><path d="M40 30V18h16v12" stroke="#7A7D6A" strokeWidth="4" fill="none" /></> },
  { age: "1–5 J.", t: "Fahrzeug- & Bahn-Ecke", p: "Holzeisenbahn, Rutschautos und Schienen zum Bauen.",
    icon: <><rect x="14" y="40" width="56" height="24" rx="8" fill="#A9CFE2" /><rect x="24" y="28" width="28" height="16" rx="5" fill="#DCECF4" /><circle cx="28" cy="68" r="9" fill="#2F3138" /><circle cx="58" cy="68" r="9" fill="#2F3138" /><path d="M8 82h80" stroke="#C9A47C" strokeWidth="5" strokeLinecap="round" /></> },
  { age: "2–5 J.", t: "Bau-Ecke", p: "Große Bausteine, die in kleine Hände passen.",
    icon: <><rect x="12" y="44" width="34" height="22" rx="4" fill="#F1CD75" /><rect x="48" y="44" width="34" height="22" rx="4" fill="#ACB08D" /><rect x="30" y="22" width="34" height="22" rx="4" fill="#EC9B86" /><g fill="#FBF6EF" opacity=".7"><circle cx="22" cy="44" r="4" /><circle cx="36" cy="44" r="4" /><circle cx="40" cy="22" r="4" /><circle cx="54" cy="22" r="4" /></g></> },
  { age: "alle", t: "Lese- & Ruheecke", p: "Bilderbücher und Kissen zum Kuscheln und Ausruhen.",
    icon: <><path d="M48 30c-12-8-28-8-36-4v50c8-4 24-4 36 4 12-8 28-8 36-4V26c-8-4-24-4-36 4z" fill="#D9E3EC" /><path d="M48 30v50" stroke="#7A7D6A" strokeWidth="3" /><circle cx="70" cy="16" r="6" fill="#F1CD75" /></> },
  { age: "2–5 J.", t: "Mal- & Bastelecke", p: "Fingerfarben, Wachsmalkreiden und kleine Kunstwerke.",
    icon: <><circle cx="48" cy="48" r="40" fill="#FCF2DD" /><circle cx="34" cy="38" r="7" fill="#EC9B86" /><circle cx="54" cy="32" r="7" fill="#A9CFE2" /><circle cx="64" cy="52" r="7" fill="#ACB08D" /><path d="M30 70l26-26" stroke="#7A7D6A" strokeWidth="6" strokeLinecap="round" /></> },
  { age: "2–5 J.", t: "Kostümecke", p: "Verkleiden, Rollenspiele und ganz viel Fantasie.",
    icon: <><path d="M48 14l30 18v14H18V32z" fill="#F3C4BB" /><path d="M28 46h40v34H28z" fill="#C7CEB6" /><path d="M36 20q12-10 24 0" stroke="#F1CD75" strokeWidth="6" fill="none" strokeLinecap="round" /></> },
];

export function PlayCorners() {
  return (
    <section id="spielen" aria-labelledby="spiel-title">
      <Squiggle kind="c" color="sage" top="28%" right={-16} />
      <Squiggle kind="k" color="terra" bottom="6%" left={-14} />
      <Squiggle kind="h" color="blue" bottom="1rem" right={-40} />
      <Squiggle kind="h" color="terra" top="3rem" right={-30} />
      <Squiggle kind="v" color="blue" top="52%" left={-15} />
      <div className="wrap">
        <div className="head">
          <span className="kicker" style={vars({ "--k": "var(--sky)" })}>Die Spielwelt</span>
          <h2 id="spiel-title">Zwei Drittel des Cafés gehören den Kindern.</h2>
          <p>Weiche Matten, Holzspielzeug und viele kleine Themenecken. Sicher, sauber und auf Augenhöhe der Kleinsten.</p>
        </div>
        <div className="corners">
          <article className="corner hero-card pop">
            <span className="age">Highlight</span>
            <svg className="pic" viewBox="0 0 320 220" aria-hidden="true" focusable="false">
              <rect x="30" y="60" width="16" height="150" rx="8" fill="#FBF6EF" /><rect x="170" y="60" width="16" height="150" rx="8" fill="#FBF6EF" />
              <path d="M20 70 L108 18 L196 70z" fill="#EC9B86" />
              <rect x="30" y="120" width="156" height="18" rx="6" fill="#A9CFE2" />
              <path d="M186 130c60 0 80 40 110 80" stroke="#FBF6EF" strokeWidth="26" strokeLinecap="round" fill="none" />
              <path d="M60 140v70M80 140v70M100 140v70M120 140v70M140 140v70" stroke="#ACB08D" strokeWidth="6" strokeLinecap="round" />
              <circle cx="108" cy="92" r="16" fill="#F3C4BB" /><circle cx="103" cy="90" r="2" fill="#2F3138" /><circle cx="113" cy="90" r="2" fill="#2F3138" /><path d="M103 97q5 4 10 0" stroke="#2F3138" strokeWidth="2" fill="none" strokeLinecap="round" />
              <ellipse cx="160" cy="212" rx="140" ry="8" fill="#2F3138" opacity=".1" />
            </svg>
            <h3>Das große Spielgerüst</h3>
            <p>Klettern, Krabbeln, Rutschen: unser Spielgerüst ist für Kleinkinder gebaut und wird vor der Eröffnung sicherheitsgeprüft.</p>
          </article>
          {CORNERS.map((c) => (
            <article className="corner pop" key={c.t}>
              <span className="age"><span className="sr-only">Alter: </span>{c.age}</span>
              <svg className="pic" viewBox="0 0 96 96" aria-hidden="true" focusable="false">{c.icon}</svg>
              <h3>{c.t}</h3>
              <p>{c.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const check = <LineIcon width={3} d="M5 12l5 5L20 7" />;

export function Prices() {
  return (
    <div className="band band-sand">
      <Wave shape="c" from="beige" to="sand" />
      <section id="preise" className="pt-sm" aria-labelledby="preis-title">
        <Squiggle kind="v" color="terra" top="2rem" left={-14} />
        <Squiggle kind="h" color="blue" bottom="2rem" left={-44} />
        <Squiggle kind="c" color="terra" bottom={0} right={-16} />
        <Squiggle kind="k" color="sage" top="1rem" right={-15} />
        <div className="wrap">
          <div className="head">
            <span className="kicker" style={vars({ "--k": "var(--butter)" })}>Eintritt</span>
            <h2 id="preis-title">Ein Preis, mit Babyccino schon dabei.</h2>
            <p>Der Eintritt gilt für den ganzen Spielbereich. Kinder unter 1 Jahr und ihre Geschwister sind genauso willkommen wie Oma und Opa.</p>
          </div>
          <div className="price-wrap">
            <div className="ticket pop">
              <span className="kicker" style={vars({ "--k": "var(--peach)" })}>Standard-Eintritt</span>
              <div className="big"><b>{PRICE.base} €</b><span>1 Kind + 1 Erwachsener</span></div>
              <ul className="incl" aria-label="Im Eintritt enthalten">
                <li>{check}Ganzer Spielbereich</li>
                <li>{check}1 Babyccino oder Kakao</li>
              </ul>
              <ul className="extras">
                <li><span>Jeder weitere Erwachsene</span><b>+ {PRICE.extraAdult} €</b></li>
                <li><span>Jedes weitere Kind</span><b>+ {PRICE.extraKid} €</b></li>
              </ul>
            </div>
            <PriceCalculator />
          </div>
        </div>
      </section>
      <Wave shape="d" from="sand" to="cream" />
    </div>
  );
}
