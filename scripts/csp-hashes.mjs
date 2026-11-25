// Nach `next build`: Next.js schreibt kleine Inline-Skripte (Hydration-Daten) in jede vorgerenderte Seite.
// Damit sie trotz strenger Content-Security-Policy laufen, berechnen wir pro Seite die SHA-256-Hashes
// dieser Skripte und setzen sie als <meta>-CSP in den <head>. Die Header-CSP kommt aus next.config.ts.
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const DIRS = [".next/server/app", ".next/standalone/.next/server/app"].map((d) => join(root, d)).filter(existsSync);
if (!DIRS.length) throw new Error("Kein Build gefunden – zuerst `next build` ausführen.");

async function* htmlFiles(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* htmlFiles(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

// Das Umami-Skript kommt von einem eigenen Host und muss auch in der Meta-CSP erlaubt sein.
const originOf = (v) => { try { return v ? new URL(v).origin : ""; } catch { return ""; } };
const UMAMI = [...new Set([process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL].map(originOf).filter(Boolean))];

const SCRIPT = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
let pages = 0;
for (const dir of DIRS) {
  for await (const file of htmlFiles(dir)) {
    let html = await readFile(file, "utf8");
    html = html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/, "");
    const hashes = new Set();
    for (const [, attrs, body] of html.matchAll(SCRIPT)) {
      if (/type=["']?application\/(ld\+)?json/i.test(attrs) || !body) continue; // Daten, kein ausführbarer Code
      hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
    }
    const meta = `<meta http-equiv="Content-Security-Policy" content="${["script-src 'self'", ...UMAMI, ...hashes].join(" ")}"/>`;
    html = html.replace(/<meta charSet="utf-8"\/>/i, (m) => `${m}${meta}`);
    if (!html.includes(meta)) throw new Error(`CSP-Meta konnte nicht eingefügt werden: ${file}`);
    await writeFile(file, html);
    pages++;
  }
}
console.log(`CSP-Hashes für ${pages} vorgerenderte Seiten gesetzt.`);
