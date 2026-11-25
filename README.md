# playcafeV2 – BiBi's playcafé Website

One-Pager für das Kindercafé in der Millennium City Wien, gebaut mit **Next.js 16 (App Router, TypeScript)**. Deployment wie bei bibis2: mehrstufiges Dockerfile auf `node:24-slim`, das einen Node-Server auf Port 3000 startet (Next.js `standalone`). Alle Seiten sind beim Build vorgerendert.

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Produktions-Build (.next/standalone) + CSP-Hashes
npm start          # Build lokal starten (vorher .next/static und public nach .next/standalone kopieren, siehe Dockerfile)
npm run typecheck
```

Die Domain wird über `NEXT_PUBLIC_SITE_URL` gesetzt (Standard: `https://DEINE-DOMAIN.at`) und gilt für Canonical, Open Graph, JSON-LD, `robots.txt` und `sitemap.xml`.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `app/layout.tsx` | Grundgerüst, Metadaten, Schriften (`next/font`, lokal ausgeliefert) |
| `app/page.tsx` | Startseite, JSON-LD (Café, FAQ, WebSite) |
| `app/impressum`, `app/datenschutz`, `app/not-found.tsx` | Rechtliche Seiten und 404 (`legal.module.css`) |
| `app/manifest.ts`, `robots.ts`, `sitemap.ts` | PWA- und SEO-Dateien, beim Build erzeugt |
| `app/globals.css` | Design-Tokens und Styles der Startseite |
| `components/home/*` | Abschnitte der Startseite (Server Components, kein JS im Browser) |
| `components/Header`, `Inquiry`, `MenuTabs`, `PriceCalculator`, `SignupForm`, `Opening` | Interaktive Teile (Client Components) |
| `lib/site.ts` | Zentrale Daten: Kontakt, Navigation, Preise, FAQ |
| `public/` | Logo, Icons, OG-Bild, Service Worker |
| `scripts/csp-hashes.mjs` | Setzt nach dem Build pro Seite eine CSP mit SHA-256-Hashes der Inline-Skripte |
| `next.config.ts` | `standalone`-Output, Sicherheits-Header, Cache-Header, Weiterleitungen alter URLs |
| `Dockerfile` | Wie bibis2: `deps` → `build` → `runner` auf `node:24-slim`, Port 3000 |
| `legacy/` | Nur lokal (in `.gitignore`): die alte statische HTML-Version zum Nachschlagen |

## Deployment mit Coolify

Wie bei bibis2: Neue Ressource aus dem Repo, Build Pack „Dockerfile“, **Port 3000**. Optional Build-Argument `NEXT_PUBLIC_SITE_URL=https://eure-domain.at`. HTTPS übernimmt Coolify (Traefik). Der Container läuft als Benutzer `node` und hat einen Healthcheck. Alte URLs (`/impressum.html` usw.) werden per 308 auf die neuen Pfade umgeleitet.

Lokal testen:

```bash
docker build -t bibis3 .
docker run --rm -p 3000:3000 bibis3
```

## Was eingebaut ist

**Performance**
- Alle Seiten vorgerendert, Inhalte als Server Components: nur Header, Tabs, Rechner, Formulare und Dialog laden JavaScript
- Schriften über `next/font` selbst gehostet, mit Fallback-Metriken gegen Layout-Sprünge
- Logo vorgeladen mit `fetchpriority=high`, alle Grafiken als Inline-SVG
- Hash-Dateinamen unter `/_next/static/` → 1 Jahr `immutable` gecacht (macht Next.js automatisch); gzip; Service Worker

**Barrierefreiheit (WCAG 2.2 AA)**
- Skip-Link, sichtbarer Fokus, eine H1 und saubere Überschriften (auch im Footer)
- Tabs nach WAI-ARIA (Pfeiltasten, Pos1/Ende), nativer `<dialog>` mit Fokus-Rückgabe
- Rechner kündigt das Ergebnis als ein Satz in einer Live-Region an
- Fehlermeldungen per `aria-describedby`/`aria-invalid` an Felder gekoppelt
- Listen statt `div`-Suppen, aktiver Navigationspunkt per `aria-current`
- `prefers-reduced-motion`, Windows-Kontrastmodus, Druckansicht, Klickflächen ≥ 44 px, keine Hover-Sprünge auf Touch-Geräten

**Sicherheit & Datenschutz**
- CSP ohne `'unsafe-inline'` für Skripte (Hashes pro Seite), HSTS, nosniff, Referrer-, Permissions-Policy, COOP
- Keine Anfragen an Google Fonts mehr, keine Cookies, kein Tracking

## Vor dem Livegang

- [ ] `NEXT_PUBLIC_SITE_URL` setzen und E-Mail in `lib/site.ts` eintragen
- [ ] Impressum: GISA-Zahl, UID, Geschäfts-E-Mail; Datenschutz: Hosting- und Newsletter-Anbieter
- [ ] Koordinaten und Öffnungszeiten prüfen
- [ ] Formulare (Anfrage, Newsletter) an E-Mail bzw. Newsletter-Dienst anbinden
- [ ] Google Business Profile, Search Console (Sitemap einreichen), PageSpeed Insights
- [ ] Echte Fotos ergänzen
