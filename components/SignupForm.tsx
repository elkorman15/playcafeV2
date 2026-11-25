"use client";
import { useState, type FormEvent } from "react";
import { isValidEmail } from "@/lib/site";

export default function SignupForm() {
  const [error, setError] = useState<{ msg: string; field: "mail" | "consent" } | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const mail = f.elements.namedItem("email") as HTMLInputElement;
    const consent = f.elements.namedItem("consent") as HTMLInputElement;
    if (!isValidEmail(mail.value.trim())) { setError({ msg: "Bitte eine gültige E-Mail-Adresse eingeben.", field: "mail" }); mail.focus(); return; }
    if (!consent.checked) { setError({ msg: "Bitte bestätigt kurz die Zustimmung.", field: "consent" }); consent.focus(); return; }
    setError(null);
    setDone(true);
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="su-n">Vorname</label>
        <input className="input" id="su-n" name="name" type="text" autoComplete="given-name" placeholder="z. B. Lea" />
      </div>
      <div className="field">
        <label htmlFor="su-m">E-Mail-Adresse</label>
        <input className="input" id="su-m" name="email" type="email" autoComplete="email" inputMode="email" required
          aria-invalid={error?.field === "mail" || undefined} aria-describedby="su-e" placeholder="name@beispiel.at" />
        <span className="err" id="su-e" aria-live="polite">{error?.msg}</span>
      </div>
      <label className="check" htmlFor="su-c">
        <input type="checkbox" id="su-c" name="consent" required aria-invalid={error?.field === "consent" || undefined} aria-describedby="su-e" />
        Ich möchte Neuigkeiten per E-Mail erhalten und kann mich jederzeit abmelden.
      </label>
      <button className="btn" type="submit">Eintragen</button>
      <div className="msg" role="status" hidden={!done}>
        {done && "Danke! Eure Eingabe passt. Hinweis: Diese Vorschau ist noch mit keinem Newsletter verbunden, es wurde nichts gesendet."}
      </div>
    </form>
  );
}
