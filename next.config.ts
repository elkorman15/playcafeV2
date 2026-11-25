import type { NextConfig } from "next";

// Wie bibis2: eigener Node-Server im Docker-Container (Port 3000).
// `standalone` packt nur die wirklich benötigten Dateien in .next/standalone.
const isDev = process.env.NODE_ENV !== "production";

// script-src erlaubt 'unsafe-inline' hier nur als Rückfall. Die eigentliche Absicherung macht die
// <meta>-CSP mit SHA-256-Hashes, die scripts/csp-hashes.mjs nach dem Build in jede Seite schreibt.
// Beide Richtlinien gelten gleichzeitig: ein Inline-Skript läuft nur, wenn sein Hash in der Seite steht.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data:",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }] },
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache" }] },
    ];
  },
  async redirects() {
    // Alte URLs der statischen Version
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/impressum.html", destination: "/impressum", permanent: true },
      { source: "/datenschutz.html", destination: "/datenschutz", permanent: true },
    ];
  },
};

export default nextConfig;
