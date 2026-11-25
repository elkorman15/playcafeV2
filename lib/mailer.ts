import "server-only";
import nodemailer from "nodemailer";

// Versand über Hostinger-SMTP. Zugangsdaten nur als Umgebungsvariablen (Coolify), nie im Code.
//   SMTP_USER  Postfach bei Hostinger, z. B. hallo@bibis-playcafe.at
//   SMTP_PASS  Passwort dieses Postfachs
//   MAIL_TO    Empfänger der Anfragen (Standard: SMTP_USER)
//   SMTP_HOST / SMTP_PORT  optional, Standard smtp.hostinger.com:465 (SSL)
export function mailConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  const port = Number(process.env.SMTP_PORT || 465);
  return {
    user,
    to: process.env.MAIL_TO || user,
    transport: nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port,
      secure: port === 465,
      auth: { user, pass },
    }),
  };
}
