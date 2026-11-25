import { NextResponse } from "next/server";
import { mailConfig } from "@/lib/mailer";
import { INQUIRY_TYPES, SITE_URL, isValidEmail } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Einfache Bremse gegen Spam: max. 5 Anfragen pro IP in 10 Minuten (pro Container, im Speicher).
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > LIMIT;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\r/g, "").trim().slice(0, max) : "");
const oneLine = (v: string) => v.replace(/\s*\n\s*/g, " ");

export async function POST(req: Request) {
  // Nur Anfragen von der eigenen Seite
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host && new URL(origin).host !== host && origin !== SITE_URL) {
    return NextResponse.json({ error: "Ungültige Herkunft." }, { status: 403 });
  }

  // Coolify/Traefik setzt X-Forwarded-For. Ohne bekannte IP nicht drosseln, sonst teilen sich alle einen Zähler.
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "";
  if (ip && limited(ip)) {
    return NextResponse.json({ error: "Zu viele Anfragen. Bitte versucht es in ein paar Minuten noch einmal." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: echte Menschen sehen dieses Feld nicht
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const type = INQUIRY_TYPES.find((t) => t === body.type) ?? "Allgemeine Frage";
  const name = oneLine(clean(body.name, 120));
  const email = oneLine(clean(body.email, 200));
  const date = /^\d{4}-\d{2}-\d{2}$/.test(clean(body.date, 10)) ? clean(body.date, 10) : "";
  const kids = Math.min(40, Math.max(0, Number.parseInt(clean(body.kids, 3), 10) || 0));
  const note = clean(body.note, 3000);

  if (!name) return NextResponse.json({ error: "Bitte euren Namen eingeben.", field: "name" }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ error: "Bitte eine gültige E-Mail-Adresse eingeben.", field: "mail" }, { status: 400 });

  const mail = mailConfig();
  if (!mail) {
    console.error("[anfrage] SMTP_USER/SMTP_PASS fehlen – Anfrage konnte nicht gesendet werden.");
    return NextResponse.json({ error: "Das Formular ist gerade nicht erreichbar. Bitte schreibt uns direkt per E-Mail oder ruft an." }, { status: 503 });
  }

  const dateText = date ? new Date(`${date}T12:00:00`).toLocaleDateString("de-AT", { day: "numeric", month: "long", year: "numeric" }) : "–";
  const text = [
    `Neue Anfrage über ${SITE_URL}`,
    "",
    `Art:          ${type}`,
    `Wunschdatum:  ${dateText}`,
    `Kinder:       ${kids || "–"}`,
    `Name:         ${name}`,
    `E-Mail:       ${email}`,
    "",
    "Nachricht:",
    note || "–",
    "",
    "Mit „Antworten“ geht die Antwort direkt an die anfragende Person.",
  ].join("\n");

  try {
    await mail.transport.sendMail({
      from: { name: "BiBi's playcafé Website", address: mail.user },
      to: mail.to,
      replyTo: { name, address: email },
      subject: `Anfrage: ${type}${date ? ` am ${dateText}` : ""} – ${name}`,
      text,
    });
  } catch (err) {
    console.error("[anfrage] Versand fehlgeschlagen:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Senden hat leider nicht geklappt. Bitte versucht es später noch einmal oder ruft uns an." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
