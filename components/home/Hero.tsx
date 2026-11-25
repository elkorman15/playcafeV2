import { LineIcon, Squiggle, Wave } from "@/components/Deco";
import { vars } from "@/lib/css";

const WORDS = [
  { w: "Spielen.", c: "w1", d: ".05s" },
  { w: "Lernen.", c: "w2", d: ".15s" },
  { w: "Lachen.", c: "w3", d: ".25s" },
  { w: "Zusammen.", c: "w4", d: ".35s" },
];

const CHIPS = [
  { t: "0–4 Jahre", c: "var(--terra)" },
  { t: "Montessori-orientiert", c: "var(--blue)" },
  { t: "Ruhig statt laut", c: "var(--sage)" },
  { t: "Gratis WLAN", c: "var(--mustard)" },
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="h1">
      <Squiggle kind="c" color="blush" bottom="-2rem" left={-16} />
      <Squiggle kind="v" color="sage" top="2rem" right={-12} />
      <Squiggle kind="v" color="terra" top=".2rem" left={-13} />
      <Squiggle kind="k" color="blue" top="34%" right={-15} />
      <Squiggle kind="h" color="sage" bottom="9%" right={-35} />
      <div className="wrap hero-grid">
        <div>
          <span className="sticker">
            <LineIcon width={2.4} d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.8z" />
            Eröffnung März 2027 · Millennium City
          </span>
          <h1 id="h1">
            <span className="h1-pre">Kindercafé in Wien · 0–4 Jahre</span>
            {WORDS.map(({ w, c, d }, i) => (
              <span key={w}>
                <span className={`wd ${c}`} style={vars({ "--d": d })}>{w}</span>
                {i < WORDS.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <p className="lead">Das Kindercafé für Babys und Kleinkinder von 0 bis 4 Jahren. Eure Kleinen spielen sicher und ruhig, ihr genießt Barista-Kaffee gleich daneben.</p>
          <div className="hero-actions">
            <a className="btn" href="#preise">Eintritt &amp; Preise<LineIcon width={2.6} d="M5 12h14M13 6l6 6-6 6" /></a>
            <a className="btn soft" href="#eroeffnung">Zur Eröffnung erinnern</a>
          </div>
          <ul className="chips" aria-label="Auf einen Blick">
            {CHIPS.map(({ t, c }) => <li key={t}><i style={vars({ "--c": c })} aria-hidden="true" />{t}</li>)}
          </ul>
        </div>
        <HeroScene />
      </div>
      <Wave shape="a" to="cream" />
    </section>
  );
}

function HeroScene() {
  const blob = "M30 545V270A250 250 0 0 1 530 270V545Q530 560 515 560H45Q30 560 30 545Z";
  return (
    <div className="scene" aria-hidden="true">
      <svg viewBox="0 0 560 560" focusable="false">
        <defs><clipPath id="blob"><path d={blob} /></clipPath></defs>
        <path d={blob} fill="var(--sky)" />
        <g clipPath="url(#blob)">
          {/* Sonne */}
          <g transform="translate(395 150)">
            <g className="spin"><g stroke="var(--mustard)" strokeWidth={10} strokeLinecap="round"><path d="M0-78v18M0 60v18M-78 0h18M60 0h18M-55-55l13 13M42 42l13 13M-55 55l13-13M42-42l13-13" /></g></g>
            <circle r={46} fill="var(--mustard)" />
            <g className="blink"><circle cx={-15} cy={-6} r={5} fill="var(--ink)" /><circle cx={15} cy={-6} r={5} fill="var(--ink)" /></g>
            <circle cx={-26} cy={10} r={7} fill="var(--terra)" opacity={0.5} /><circle cx={26} cy={10} r={7} fill="var(--terra)" opacity={0.5} />
            <path d="M-14 12q14 13 28 0" stroke="var(--ink)" strokeWidth={5} fill="none" strokeLinecap="round" />
          </g>
          {/* Wolken */}
          <g className="drift"><g transform="translate(60 40)"><path d="M70 130a26 26 0 0 1 48-12 22 22 0 0 1 36 18 18 18 0 0 1-2 36H78a22 22 0 0 1-8-42z" fill="var(--cream)" /></g></g>
          <g className="drift b"><path d="M250 70a20 20 0 0 1 37-9 17 17 0 0 1 28 14 14 14 0 0 1-2 28h-58a17 17 0 0 1-5-33z" fill="var(--cream)" opacity={0.9} /></g>
          {/* Hügel */}
          <path d="M-20 420c90-70 190-80 300-30s200 40 300-10v200H-20z" fill="var(--sage)" />
          <path d="M-20 470c110-40 220-30 320 0s190 20 280-10v120H-20z" fill="color-mix(in srgb,var(--sage) 70%,var(--cream))" />
          {/* Spielhaus mit Rutsche */}
          <g transform="translate(70 250)">
            <path d="M20 70 L95 10 L170 70z" fill="var(--terra)" />
            <rect x={34} y={70} width={122} height={110} rx={10} fill="var(--peach)" />
            <rect x={60} y={100} width={34} height={80} rx={17} fill="var(--blue)" />
            <circle cx={125} cy={115} r={17} fill="var(--cream)" /><path d="M125 98v34M108 115h34" stroke="var(--peach)" strokeWidth={4} />
            <path d="M156 120c40 0 60 30 80 70" stroke="var(--mustard)" strokeWidth={20} strokeLinecap="round" fill="none" />
          </g>
          {/* Stapelturm */}
          <g transform="translate(330 330)">
            <g className="wobble">
              <rect x={-5} y={-60} width={10} height={70} rx={5} fill="#C9A47C" />
              <ellipse cx={0} cy={8} rx={48} ry={14} fill="var(--terra)" />
              <ellipse cx={0} cy={-10} rx={40} ry={13} fill="var(--mustard)" />
              <ellipse cx={0} cy={-27} rx={32} ry={12} fill="var(--sage)" />
              <ellipse cx={0} cy={-43} rx={24} ry={10} fill="var(--blue)" />
              <circle cx={0} cy={-62} r={10} fill="var(--blush)" />
            </g>
          </g>
          {/* Hüpfender Ball */}
          <ellipse className="shadow-b" cx={452} cy={412} rx={26} ry={6} fill="var(--ink)" opacity={0.15} />
          <g className="bounce"><circle cx={452} cy={382} r={28} fill="var(--blush)" /><path d="M424 382a28 28 0 0 0 56 0" fill="var(--cream)" opacity={0.6} /><path d="M452 354v56" stroke="var(--terra)" strokeWidth={4} /></g>
          {/* Ente */}
          <g transform="translate(200 440)">
            <g className="float" style={vars({ "--d": ".8s", "--r": "-3deg" })}>
              <ellipse cx={0} cy={0} rx={34} ry={22} fill="var(--mustard)" /><circle cx={22} cy={-22} r={16} fill="var(--mustard)" /><path d="M36 -22l14 4-14 5z" fill="var(--terra)" /><circle cx={26} cy={-26} r={3} fill="var(--ink)" />
            </g>
          </g>
          {/* Schwebende Formen */}
          <circle className="float" style={vars({ "--d": ".3s" })} cx={52} cy={230} r={12} fill="var(--lav)" />
          <path className="float" style={vars({ "--d": "1.4s", "--r": "10deg" })} d="M500 240l16 28h-32z" fill="var(--terra)" />
          <rect className="float" style={vars({ "--d": "2s", "--r": "-8deg" })} x={250} y={180} width={22} height={22} rx={5} fill="var(--mint)" />
        </g>
      </svg>
    </div>
  );
}
