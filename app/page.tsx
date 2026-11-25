import type { Metadata } from "next";
import { preload } from "react-dom";
import { SquiggleSprite } from "@/components/Deco";
import Header from "@/components/Header";
import { InquiryProvider } from "@/components/Inquiry";
import Hero from "@/components/home/Hero";
import { Courses, Menu, Party, Work } from "@/components/home/Offer";
import { PlayCorners, Prices, Why } from "@/components/home/Play";
import { Faq, Footer, Signup, Visit } from "@/components/home/Visit";
import { FAQ, SITE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/",
    title: "BiBi's playcafé – Kindercafé für 0–5 Jahre in Wien",
    description: "Spielen · Lernen · Lachen · Zusammen. Kindercafé mit Montessori-Spielbereich in der Millennium City. Eröffnung März 2027.",
    images: [{ url: "/assets/og-image.jpg", width: 1200, height: 630, alt: "Logo von BiBi's playcafé" }],
    locale: "de_AT",
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": ["CafeOrCoffeeShop", "ChildCare"],
    "@id": `${SITE_URL}/#cafe`,
    name: SITE.name,
    alternateName: "BiBi's Familienraum",
    slogan: SITE.claim,
    description: "Montessori-orientiertes Kindercafé mit Spielbereich für Kinder von 0 bis 5 Jahren und ihre Eltern.",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/assets/bibis-logo.png`,
    image: `${SITE_URL}/assets/og-image.jpg`,
    telephone: "+43 660 4201094",
    priceRange: "€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    servesCuisine: ["Kaffee", "Matcha", "Smoothies", "Kuchen", "Snacks"],
    hasMenu: `${SITE_URL}/#karte`,
    address: { "@type": "PostalAddress", streetAddress: "Handelskai 94–96, Millennium City, Bauteil 2, Top 02-04.0", postalCode: "1200", addressLocality: "Wien", addressRegion: "Wien", addressCountry: "AT" },
    geo: { "@type": "GeoCoordinates", latitude: 48.2412, longitude: 16.3847 },
    hasMap: SITE.mapsUrl,
    amenityFeature: ["Spielbereich 0–5 Jahre", "Gratis WLAN", "Arbeitsplätze", "Stillfreundlich", "Hochstühle", "Raumvermietung für Feiern und Workshops"]
      .map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    sameAs: [SITE.instagram],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
  { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: `${SITE_URL}/`, inLanguage: "de-AT" },
];

export default function Home() {
  // Logo ist das LCP-Element: früh und mit hoher Priorität laden
  preload("/assets/bibis-logo-240.webp", {
    as: "image",
    type: "image/webp",
    fetchPriority: "high",
    imageSrcSet: "/assets/bibis-logo-240.webp 240w, /assets/bibis-logo-480.webp 480w",
    imageSizes: "(max-width: 1000px) 108px, 138px",
  });

  return (
    <InquiryProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <noscript><style>{`[role="tabpanel"][hidden]{display:block}.panel+.panel{margin-top:1rem}`}</style></noscript>
      <SquiggleSprite />
      <a className="skip" href="#main">Zum Inhalt springen</a>
      <Header />
      <main id="main" className="home" tabIndex={-1}>
        <Hero />
        <Why />
        <PlayCorners />
        <Prices />
        <Menu />
        <Courses />
        <Work />
        <Party />
        <Visit />
        <Faq />
        <Signup />
      </main>
      <Footer />
    </InquiryProvider>
  );
}
