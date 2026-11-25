import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { SITE, SITE_URL } from "@/lib/site";
import ServiceWorker from "@/components/ServiceWorker";
import Analytics from "@/components/Analytics";
import "./globals.css";

// next/font lädt die Schriften beim Build herunter und liefert sie selbst aus:
// keine Anfrage an Google beim Besuch (DSGVO), kein Layout-Sprung dank Fallback-Metriken.
const fredoka = Fredoka({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap", variable: "--font-fredoka" });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800"], display: "swap", variable: "--font-nunito" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BiBi's playcafé · Kindercafé für 0–5 Jahre in Wien (Millennium City)",
    template: "%s · BiBi's playcafé",
  },
  description:
    "Montessori-orientiertes Kindercafé mit Spielbereich für Babys und Kleinkinder von 0 bis 5 Jahren in der Millennium City, 1200 Wien. Barista-Kaffee, Arbeitsplätze mit WLAN, Kurse und Raumvermietung für Feiern. Eröffnung März 2027.",
  applicationName: SITE.name,
  formatDetection: { telephone: false },
  icons: {
    icon: [{ url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: "/assets/apple-touch-icon.png",
  },
  other: { "geo.region": "AT-9", "geo.placename": "Wien" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE.themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-AT" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>
        {children}
        <ServiceWorker />
        <Analytics
          scriptUrl={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
          hostUrl={process.env.NEXT_PUBLIC_UMAMI_HOST_URL}
          websiteId={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        />
      </body>
    </html>
  );
}
