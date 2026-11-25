import type { ReactNode } from "react";
import { LineIcon, Squiggle, Wave } from "@/components/Deco";
import { OpenInquiryButton } from "@/components/Inquiry";
import MenuTabs, { type MenuPanel } from "@/components/MenuTabs";
import { vars } from "@/lib/css";

type Item = { name: string; price: string; desc: string; icon: ReactNode };

function Items({ items, color }: { items: Item[]; color: string }) {
  return (
    <ul className="items">
      {items.map((it) => (
        <li className="item" key={it.name}>
          <span className="dot" style={vars({ "--c": color })}><svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">{it.icon}</svg></span>
          <b>{it.name}</b>
          <span className="pr">{it.price}</span>
          <p>{it.desc}</p>
        </li>
      ))}
    </ul>
  );
}

const cup = (fill: string) => <path d="M7 12h14v6a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6z" fill={fill} />;
const glass = <path d="M9 6h14l-2 22H11z" fill="#ACB08D" />;

const MENU: (Omit<MenuPanel, "content"> & { dot: string; items: Item[] })[] = [
  { id: "kaffee", tab: "Kaffee & Heißes", title: "Kaffee & Heißgetränke", color: "var(--terra)", dot: "var(--peach)", items: [
    { name: "Espresso", price: "2,60 €", desc: "Auch als Doppio oder Americano", icon: <>{cup("#EC9B86")}<path d="M21 14h2a3 3 0 0 1 0 6h-2" stroke="#EC9B86" strokeWidth="2.5" fill="none" /></> },
    { name: "Cappuccino", price: "3,90 €", desc: "Mit cremigem Milchschaum", icon: <>{cup("#EC9B86")}<ellipse cx="14" cy="12" rx="7" ry="2.5" fill="#FBF6EF" /></> },
    { name: "Café Latte", price: "4,30 €", desc: "Auch als Latte Macchiato oder Flat White", icon: <><path d="M10 6h12l-2 22h-8z" fill="#EFE6DC" /><path d="M11 14h10l-1 14h-8z" fill="#C9A47C" /></> },
    { name: "Kakao", price: "vor Ort", desc: "Warm und schokoladig, für Groß und Klein", icon: <>{cup("#8A5A3C")}<path d="M10 8q2-3 0-5M15 8q2-3 0-5" stroke="#7A7D6A" strokeWidth="2" fill="none" strokeLinecap="round" /></> },
  ] },
  { id: "matcha", tab: "Matcha", title: "Matcha Specials", color: "var(--sage)", dot: "var(--mint)", items: [
    { name: "Classic Matcha", price: "4,80 €", desc: "Mit Milch oder pflanzlicher Alternative", icon: glass },
    { name: "Strawberry Matcha", price: "5,50 €", desc: "Matcha auf Erdbeerpüree", icon: <>{glass}<path d="M10.5 18h11l-1 10h-9z" fill="#F3C4BB" /></> },
    { name: "Mango Matcha", price: "5,50 €", desc: "Matcha auf Mangopüree", icon: <>{glass}<path d="M10.5 18h11l-1 10h-9z" fill="#F1CD75" /></> },
  ] },
  { id: "kalt", tab: "Kalte Getränke", title: "Kalte Getränke", color: "var(--blue)", dot: "var(--sky)", items: [
    { name: "Smoothie", price: "5,50 €", desc: "Frisch gemixt: Erdbeer, Mango oder Mix der Woche", icon: <><path d="M9 8h14l-2 20H11z" fill="#F3C4BB" /><path d="M18 8l4-6" stroke="#7A7D6A" strokeWidth="2" strokeLinecap="round" /></> },
    { name: "Zuckerfreie Limonade", price: "4,50 €", desc: "Zitrone-Beeren oder Mango", icon: <><path d="M9 8h14l-2 20H11z" fill="#FCF2DD" /><circle cx="16" cy="16" r="4" fill="#F1CD75" /><path d="M18 8l4-6" stroke="#7A7D6A" strokeWidth="2" strokeLinecap="round" /></> },
  ] },
  { id: "snacks", tab: "Süßes & Snacks", title: "Süßes & Snacks", color: "var(--blush)", dot: "var(--blush)", items: [
    { name: "Kuchen aus der Vitrine", price: "4,50 €", desc: "Täglich frisch und wechselnd. Einfach vorne auswählen", icon: <><path d="M5 20l22-8v12H5z" fill="#FCF2DD" /><path d="M5 20l22-8v4L5 24z" fill="#EC9B86" /><circle cx="22" cy="9" r="3" fill="#EC9B86" /></> },
    { name: "Muffin", price: "vor Ort", desc: "Saftig, aus der Vitrine", icon: <><path d="M8 14h16l-2 12H10z" fill="#EFE6DC" /><path d="M7 14a9 7 0 0 1 18 0z" fill="#C9A47C" /></> },
    { name: "Bowls", price: "vor Ort", desc: "Frische, kalte Bowls mit saisonalen Zutaten", icon: <><ellipse cx="16" cy="20" rx="12" ry="7" fill="#FBF6EF" /><circle cx="11" cy="17" r="3" fill="#ACB08D" /><circle cx="17" cy="16" r="3" fill="#F3C4BB" /><circle cx="21" cy="19" r="3" fill="#F1CD75" /></> },
    { name: "Stullen", price: "vor Ort", desc: "Belegte Brote, frisch für euch gemacht", icon: <><rect x="5" y="12" width="22" height="12" rx="5" fill="#C9A47C" /><path d="M7 15h18" stroke="#ACB08D" strokeWidth="3" /></> },
  ] },
  { id: "kinder", tab: "Für Kinder", title: "Für unsere kleinen Gäste", color: "var(--mustard)", dot: "var(--butter)", items: [
    { name: "Babyccino", price: "1,80 €", desc: "Warmer Milchschaum, extra mild und ohne Kaffee", icon: <><path d="M8 12h14v6a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6z" fill="#FBF6EF" stroke="#EFE6DC" strokeWidth="2" /><circle cx="15" cy="12" r="5" fill="#FBF6EF" /><circle cx="15" cy="11" r="1.5" fill="#8A5A3C" /></> },
    { name: "Kinder-Snackteller", price: "5,50 €", desc: "Gemüsesticks, gesunde Kekse und eine kleine Überraschung", icon: <><circle cx="16" cy="16" r="12" fill="#FBF6EF" /><rect x="9" y="10" width="3" height="10" rx="1.5" fill="#EC9B86" /><rect x="14" y="9" width="3" height="10" rx="1.5" fill="#ACB08D" /><circle cx="22" cy="18" r="3" fill="#C9A47C" /></> },
    { name: "Obst aus dem Korb", price: "1,00 €", desc: "Kannst du dir selbst aus dem Korb holen", icon: <><circle cx="16" cy="18" r="9" fill="#EC9B86" /><path d="M16 9q2-4 6-4" stroke="#ACB08D" strokeWidth="3" fill="none" strokeLinecap="round" /></> },
    { name: "Dinkel- & Babykekse", price: "vor Ort", desc: "Für die ganz Kleinen, zum Knabbern", icon: <><circle cx="16" cy="16" r="10" fill="#C9A47C" /><circle cx="13" cy="13" r="1.5" fill="#8A5A3C" /><circle cx="19" cy="15" r="1.5" fill="#8A5A3C" /><circle cx="15" cy="20" r="1.5" fill="#8A5A3C" /></> },
  ] },
];

export function Menu() {
  const panels: MenuPanel[] = MENU.map(({ items, dot, ...p }) => ({ ...p, content: <Items items={items} color={dot} /> }));
  return (
    <div className="band band-cream">
      <section id="karte" className="pt-sm" aria-labelledby="karte-title">
        <Squiggle kind="k" color="sage" top="1rem" right={-15} />
        <Squiggle kind="c" color="blue" top="48%" left={-16} />
        <Squiggle kind="v" color="mustard" top="40%" right={-12} />
        <Squiggle kind="v" color="terra" top="4rem" left={-14} />
        <Squiggle kind="h" color="blue" bottom="2rem" right={-32} />
        <div className="wrap">
          <div className="head">
            <span className="kicker" style={vars({ "--k": "var(--mint)" })}>Unsere Karte</span>
            <h2 id="karte-title">Kaffee, Matcha und süße Kleinigkeiten.</h2>
            <p>Frisch gemixt, frisch aus der Vitrine und ganz ohne Frittierfett. Für Groß und Klein, mit Milch oder pflanzlicher Alternative.</p>
          </div>
          <MenuTabs panels={panels} label="Speisekarte" />
          <p className="menu-note">
            <LineIcon width={2.2}><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v5h1" /></LineIcon>
            Alle Preise in Euro inkl. MwSt. Bei Allergien und Unverträglichkeiten beraten wir euch gerne an der Theke.
          </p>
        </div>
      </section>
      <Wave shape="a" from="cream" to="beige" />
    </div>
  );
}

const COURSES = [
  { t: "Stillgruppe", c: "var(--peach)", icon: <><circle cx="20" cy="16" r="8" fill="#F3C4BB" /><path d="M8 36c0-8 5-12 12-12s12 4 12 12z" fill="#EC9B86" /><circle cx="26" cy="26" r="5" fill="#FBF6EF" /></> },
  { t: "Beikost-Workshop", c: "var(--butter)", icon: <><ellipse cx="20" cy="26" rx="14" ry="8" fill="#FBF6EF" /><path d="M14 22a6 6 0 0 1 12 0" fill="#F1CD75" /><path d="M30 8l-6 14" stroke="#7A7D6A" strokeWidth="3" strokeLinecap="round" /></> },
  { t: "Krabbelgruppe", c: "var(--mint)", icon: <><circle cx="14" cy="18" r="6" fill="#F3C4BB" /><ellipse cx="24" cy="26" rx="12" ry="7" fill="#ACB08D" /></> },
  { t: "Mama-Baby-Yoga", c: "var(--lav)", icon: <><circle cx="20" cy="10" r="5" fill="#EC9B86" /><path d="M20 15v12M10 20l10 4 10-4M14 36l6-9 6 9" stroke="#2F3138" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></> },
  { t: "Eltern-Kind-Workshop", c: "var(--sky)", icon: <><circle cx="13" cy="14" r="6" fill="#A9CFE2" /><circle cx="28" cy="18" r="4" fill="#F3C4BB" /><path d="M4 36c0-8 4-12 9-12s9 4 9 12zM20 36c0-6 3-9 8-9s8 3 8 9z" fill="#EC9B86" /></> },
];

export function Courses() {
  return (
    <section id="kurse" aria-labelledby="kurs-title">
      <Squiggle kind="h" color="blue" top="1.5rem" right={-40} />
      <Squiggle kind="v" color="sage" bottom={0} left={-14} />
      <Squiggle kind="c" color="terra" top="2rem" left={-18} />
      <Squiggle kind="k" color="sage" bottom="1rem" right={-15} />
      <div className="wrap">
        <div className="head">
          <span className="kicker" style={vars({ "--k": "var(--lav)" })}>Kurse am Vormittag</span>
          <h2 id="kurs-title">Kurse und Gruppen für Eltern und Babys.</h2>
          <p>Unter der Woche am Vormittag, in kleinen Gruppen und mit viel Zeit für Austausch. Welcher Kurs an welchem Tag stattfindet, geben wir vor der Eröffnung bekannt.</p>
        </div>
        <ul className="week" role="list">
          {COURSES.map((c) => (
            <li className="course pop" key={c.t} style={vars({ "--c": c.c })}>
              <span className="ill"><svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">{c.icon}</svg></span>
              <h3>{c.t}</h3>
              <div className="meta"><span>vormittags</span></div>
            </li>
          ))}
        </ul>
        <div className="specials pop">
          <p>Dazu rund sechs Mal im Jahr besondere Feste, zum Beispiel Fasching und Halloween.</p>
          <OpenInquiryButton className="btn soft" type="Kursanmeldung">Platz im Kurs anfragen</OpenInquiryButton>
        </div>
      </div>
    </section>
  );
}

const WORK = [
  { t: "Gratis WLAN", p: "Für Mails, Calls und alles dazwischen.", c: "var(--sky)", icon: <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01" /> },
  { t: "Arbeitsplätze im vorderen Bereich", p: "Tische im Café, auch ohne Kind und ohne Eintritt in den Spielbereich.", c: "var(--mint)", icon: <><rect x="4" y="5" width="16" height="10" rx="2" /><path d="M2 19h20" /></> },
  { t: "Barista-Kaffee & Matcha", p: "Frisch zubereitet, direkt an der Theke.", c: "var(--peach)", icon: <><path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" /><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" /></> },
  { t: "Euer Kind im Blick", p: "Der Spielbereich liegt gleich neben dem Café.", c: "var(--butter)", icon: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="2.5" /></> },
];

export function Work() {
  return (
    <section id="arbeiten" aria-labelledby="work-title">
      <Squiggle kind="v" color="blue" top="2rem" right={-14} />
      <Squiggle kind="h" color="sage" bottom="1rem" left={-40} />
      <div className="wrap work-grid">
        <div>
          <div className="head" style={{ marginBottom: "1.4rem" }}>
            <span className="kicker" style={vars({ "--k": "var(--sky)" })}>Remote Work &amp; Homeoffice</span>
            <h2 id="work-title">Arbeiten, während die Kleinen spielen.</h2>
            <p>In Karenz, im Homeoffice oder selbstständig: Klappt den Laptop im Café-Bereich auf, während euer Kind ein paar Schritte weiter spielt. Und wer ohne Kind kommt, findet im vorderen Bereich einen ruhigen Platz mit richtig gutem Kaffee.</p>
          </div>
          <ul className="work-list">
            {WORK.map((w) => (
              <li key={w.t}>
                <span className="wi" style={vars({ "--c": w.c })}><LineIcon stroke="#2F3138">{w.icon}</LineIcon></span>
                <span><b>{w.t}</b>{w.p}</span>
              </li>
            ))}
          </ul>
          <p className="work-note">Mit Kind bleibt die Aufsicht bei euch. Für wichtige Calls plant am besten einen ruhigen Moment ein.</p>
        </div>
        <svg className="work-art" viewBox="0 0 360 300" aria-hidden="true" focusable="false">
          <ellipse cx="180" cy="272" rx="160" ry="12" fill="#2F3138" opacity=".07" />
          <rect x="40" y="200" width="280" height="16" rx="8" fill="#D9B48C" />
          <rect x="70" y="216" width="12" height="56" rx="6" fill="#C9A47C" /><rect x="278" y="216" width="12" height="56" rx="6" fill="#C9A47C" />
          <rect x="96" y="104" width="150" height="96" rx="12" fill="#2F3138" />
          <rect x="106" y="114" width="130" height="76" rx="6" fill="#DCECF4" />
          <rect x="118" y="128" width="62" height="8" rx="4" fill="#A9CFE2" /><rect x="118" y="144" width="96" height="8" rx="4" fill="#FBF6EF" /><rect x="118" y="160" width="78" height="8" rx="4" fill="#FBF6EF" />
          <path d="M80 200h182l-12 -8H92z" fill="#54565F" />
          <g className="float" style={vars({ "--d": ".4s", "--r": "0deg" })}><path d="M272 176h30v14a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12z" fill="#EC9B86" /><path d="M302 180h5a6 6 0 0 1 0 12h-5" stroke="#EC9B86" strokeWidth="4" fill="none" /><path d="M282 166q4-6 0-12M292 166q4-6 0-12" stroke="#ACB08D" strokeWidth="3" fill="none" strokeLinecap="round" /></g>
          <rect x="52" y="176" width="22" height="22" rx="4" fill="#F1CD75" /><rect x="58" y="154" width="22" height="22" rx="4" fill="#A9CFE2" transform="rotate(8 69 165)" />
          <circle cx="44" cy="74" r="26" fill="#F1CD75" /><g stroke="#F1CD75" strokeWidth="6" strokeLinecap="round"><path d="M44 30v10M44 108v10M0 74h10M78 74h10" /></g>
          <g className="float" style={vars({ "--d": "1.2s", "--r": "6deg" })}><circle cx="320" cy="70" r="14" fill="#F3C4BB" /><path d="M320 84v30" stroke="#7A7D6A" strokeWidth="2" /></g>
        </svg>
      </div>
    </section>
  );
}

const SLOTS = [
  { t: "Montag bis Donnerstag", time: "16:00–19:00 Uhr", price: "ab 280 €" },
  { t: "Freitag und Samstag", time: "16:00–19:00 Uhr", price: "450–600 €" },
  { t: "Sonntag", time: "Zwei Zeitfenster pro Tag", price: "450–600 €" },
];

export function Party() {
  return (
    <div className="band band-sky">
      <Wave shape="b" from="beige" to="sky" />
      <section id="feiern" className="pt-sm" aria-labelledby="feier-title">
        <Squiggle kind="k" color="terra" top="1rem" right={-15} />
        <Squiggle kind="h" color="blue" bottom="1rem" left={-42} />
        <Squiggle kind="c" color="mustard" bottom="15%" right={-16} />
        <Squiggle kind="v" color="sage" top="3rem" left={-14} />
        <div className="wrap party-grid">
          <div>
            <div className="head" style={{ marginBottom: 0 }}>
              <span className="kicker" style={vars({ "--k": "var(--peach)" })}>Feiern &amp; Raumvermietung</span>
              <h2 id="feier-title">Mietet das ganze playcafé für euer Fest oder euren Workshop.</h2>
              <p>Am späten Nachmittag und am Sonntag gehört der ganze Raum euch: für Geburtstage, Babyshower und Taufen, aber auch für Kurse und Workshops von Hebammen, Kursleiter:innen und Elternvereinen.</p>
            </div>
            <ul className="occasions" aria-label="Anlässe">
              {["Kindergeburtstag", "Babyshower", "Taufe", "Kurse & Workshops", "Eltern-Treffen"].map((o) => <li key={o}>{o}</li>)}
            </ul>
            <ul className="slots" role="list" aria-label="Zeitfenster und Preise">
              {SLOTS.map((s) => (
                <li className="slot pop" key={s.t}>
                  <div><h3>{s.t}</h3><p>{s.time}</p></div>
                  <b>{s.price}<small>pro Slot</small></b>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "1.5rem" }}><OpenInquiryButton type="Feier / Raummiete">Wunschtermin anfragen</OpenInquiryButton></p>
          </div>
          <svg className="balloons" viewBox="0 0 300 380" aria-hidden="true" focusable="false">
            <path d="M95 190q15 80 55 170M155 170q-5 90-5 190M215 200q-25 70-65 160" stroke="#7A7D6A" strokeWidth="2.5" fill="none" />
            <g className="float" style={vars({ "--d": "0s", "--r": "-5deg" })}><ellipse cx="95" cy="130" rx="52" ry="62" fill="#EC9B86" /><path d="M88 192l7-8 7 8z" fill="#EC9B86" /><ellipse cx="78" cy="108" rx="10" ry="16" fill="#FBF6EF" opacity=".45" /></g>
            <g className="float" style={vars({ "--d": ".9s", "--r": "4deg" })}><ellipse cx="155" cy="100" rx="56" ry="66" fill="#F1CD75" /><path d="M148 166l7-8 7 8z" fill="#F1CD75" /><ellipse cx="137" cy="78" rx="10" ry="16" fill="#FBF6EF" opacity=".45" /></g>
            <g className="float" style={vars({ "--d": "1.7s", "--r": "-3deg" })}><ellipse cx="215" cy="140" rx="48" ry="58" fill="#ACB08D" /><path d="M208 198l7-8 7 8z" fill="#ACB08D" /><ellipse cx="200" cy="120" rx="9" ry="14" fill="#FBF6EF" opacity=".45" /></g>
            <g fill="#F3C4BB"><circle cx="40" cy="300" r="6" /><circle cx="260" cy="280" r="5" /></g>
            <g fill="#D9E3EC"><rect x="250" y="40" width="12" height="12" rx="3" transform="rotate(20 256 46)" /><rect x="30" y="60" width="10" height="10" rx="3" transform="rotate(-15 35 65)" /></g>
          </svg>
        </div>
      </section>
      <Wave shape="a" from="sky" to="beige" />
    </div>
  );
}
