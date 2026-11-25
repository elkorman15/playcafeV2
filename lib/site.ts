// Zentrale Angaben: hier einmal ändern, gilt überall (Metadaten, JSON-LD, Sitemap, Kontakt).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bibis-playcafe.at").replace(/\/$/, "");

export const SITE = {
  name: "BiBi's playcafé",
  claim: "Spielen · Lernen · Lachen · Zusammen",
  email: "hallo@DEINE-DOMAIN.at",
  phone: "+436604201094",
  phoneDisplay: "0660 / 420 10 94",
  instagram: "https://www.instagram.com/bibis.playcafe/",
  instagramHandle: "@bibis.playcafe",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Millennium+City+Handelskai+94-96+1200+Wien",
  openingDate: "2027-03-01T09:00:00+01:00",
  themeColor: "#F7F1EA",
} as const;

export const NAV = [
  { id: "spielen", label: "Spielwelt" },
  { id: "preise", label: "Eintritt" },
  { id: "karte", label: "Karte" },
  { id: "kurse", label: "Kurse" },
  { id: "arbeiten", label: "Arbeiten" },
  { id: "feiern", label: "Feiern" },
  { id: "besuch", label: "Besuch" },
] as const;

export const INQUIRY_TYPES = ["Feier / Raummiete", "Kursanmeldung", "Allgemeine Frage"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

// Eintritt: 12 € für 1 Kind + 1 Erwachsenen, +4 € je weiterem Erwachsenen, +6 € je weiterem Kind
export const PRICE = { base: 12, extraAdult: 4, extraKid: 6, max: 6 } as const;
export const entryPrice = (kids: number, adults: number) =>
  PRICE.base + (adults - 1) * PRICE.extraAdult + (kids - 1) * PRICE.extraKid;

export const FAQ: { q: string; a: string }[] = [
  { q: "Für welches Alter ist BiBi's gedacht?", a: "Für Babys und Kleinkinder von 0 bis 5 Jahren. Spielgerüst, Spielzeug und alle Ecken sind genau auf dieses Alter abgestimmt. So bleibt es ruhig und sicher für die Kleinsten." },
  { q: "Wann habt ihr geöffnet?", a: "Montag bis Samstag. Die genauen Uhrzeiten richten sich nach der Gastronomie der Millennium City und stehen vor der Eröffnung fest. Feiern sind Montag bis Samstag von 16 bis 19 Uhr und sonntags in zwei Zeitfenstern möglich." },
  { q: "Kann ich bei euch mit dem Laptop arbeiten?", a: "Ja. Im vorderen Café-Bereich gibt es Tische und gratis WLAN, auch wenn ihr ohne Kind kommt. Mit Kind bleibt die Aufsicht bei euch, der Spielbereich liegt aber direkt daneben." },
  { q: "Kann ich den Raum für meinen Kurs oder Workshop mieten?", a: "Ja. Hebammen, Kursleiter:innen und Elternvereine können das playcafé am späten Nachmittag und am Sonntag mieten. Schickt uns einfach eine Anfrage mit eurem Wunschtermin." },
  { q: "Muss ich vorher reservieren?", a: "Für den normalen Besuch nicht, kommt einfach vorbei. Für Kurse und private Feiern bitten wir um eine Anmeldung." },
  { q: "Darf ich mein Kind abgeben und einkaufen gehen?", a: "Nein, wir sind keine Kinderbetreuung. Ein Erwachsener bleibt immer im playcafé. Dafür sitzt ihr gemütlich und habt euer Kind gut im Blick." },
  { q: "Gibt es warme Speisen?", a: "Wir haben keine Küche für warme Gerichte. Dafür gibt es Kaffee, Matcha, Smoothies, Kuchen aus der Vitrine, Bowls, Stullen und Snacks für Kinder. Babygläschen dürft ihr gerne mitbringen." },
  { q: "Gibt es eine Socken-Pflicht?", a: "Ja. Im Spielbereich spielen alle in Socken. Eure Schuhe stellt ihr im Schuhschrank beim Eingang ab." },
  { q: "Kann ich mit Karte zahlen?", a: "Ja, mit Bankomat- oder Kreditkarte. Bar geht natürlich auch." },
];

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
