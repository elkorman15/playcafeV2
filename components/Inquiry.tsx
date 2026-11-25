"use client";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { INQUIRY_TYPES, isValidEmail, type InquiryType } from "@/lib/site";
import { EVENTS, trackEvent } from "@/lib/analytics";

type Ctx = { open: (type?: InquiryType) => void };
const InquiryContext = createContext<Ctx>({ open: () => {} });

/** Stellt den Anfrage-Dialog bereit; Buttons öffnen ihn über OpenInquiryButton. */
export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [type, setType] = useState<InquiryType>(INQUIRY_TYPES[0]);
  const [status, setStatus] = useState<{ error?: string; field?: "name" | "mail"; ok?: string }>({});

  const open = useCallback((t?: InquiryType) => {
    opener.current = document.activeElement as HTMLElement | null;
    if (t) setType(t);
    trackEvent(EVENTS.inquiryOpen, { type: t ?? "Allgemein" });
    setStatus({});
    const d = dlg.current;
    if (!d) return;
    if (typeof d.showModal === "function") d.showModal();
    else d.setAttribute("open", "");
    requestAnimationFrame(() => typeRef.current?.focus());
  }, []);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    const onClose = () => opener.current?.focus();
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const f = e.currentTarget;
    const val = (n: string) => (f.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "";
    const focus = (n: string) => (f.elements.namedItem(n) as HTMLElement | null)?.focus();
    const name = val("name").trim();
    const mail = val("email").trim();
    const date = val("date");
    if (!name) { setStatus({ error: "Bitte euren Namen eingeben.", field: "name" }); focus("name"); return; }
    if (!isValidEmail(mail)) { setStatus({ error: "Bitte eine gültige E-Mail-Adresse eingeben.", field: "mail" }); focus("email"); return; }

    setSending(true);
    setStatus({});
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name, email: mail, date, kids: val("kids"), note: val("note"), website: val("website") }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; field?: "name" | "mail" };
      if (!res.ok) {
        setStatus({ error: data.error ?? "Senden hat leider nicht geklappt. Bitte versucht es später noch einmal.", field: data.field });
        if (data.field) focus(data.field === "mail" ? "email" : "name");
        return;
      }
      const dt = date ? " für den " + new Date(date + "T12:00:00").toLocaleDateString("de-AT", { day: "numeric", month: "long", year: "numeric" }) : "";
      f.reset();
      trackEvent(EVENTS.inquirySent, { type });
      setStatus({ ok: `Danke, ${name}! Eure Anfrage (${type}${dt}) ist bei uns angekommen. Wir melden uns so bald wie möglich per E-Mail.` });
    } catch {
      setStatus({ error: "Keine Verbindung. Bitte prüft euer Internet und versucht es noch einmal." });
    } finally {
      setSending(false);
    }
  };

  const id = useId();
  return (
    <InquiryContext.Provider value={{ open }}>
      {children}
      <dialog ref={dlg} className="dlg" aria-labelledby={`${id}-t`}
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}>
        <form onSubmit={onSubmit} noValidate>
          <div className="dh">
            <h2 id={`${id}-t`}>Anfrage senden</h2>
            <button className="x" type="button" aria-label="Fenster schließen" onClick={() => dlg.current?.close()}>×</button>
          </div>
          <div className="db">
            <div className="field">
              <label htmlFor={`${id}-type`}>Worum geht es?</label>
              <select ref={typeRef} className="input" id={`${id}-type`} name="type" value={type} onChange={(e) => setType(e.target.value as InquiryType)}>
                {INQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="two">
              <div className="field"><label htmlFor={`${id}-date`}>Wunschdatum</label><input className="input" id={`${id}-date`} name="date" type="date" min="2027-03-01" /></div>
              <div className="field"><label htmlFor={`${id}-kids`}>Anzahl Kinder</label><input className="input" id={`${id}-kids`} name="kids" type="number" min={1} max={40} defaultValue={1} inputMode="numeric" /></div>
            </div>
            <div className="field">
              <label htmlFor={`${id}-name`}>Name</label>
              <input className="input" id={`${id}-name`} name="name" type="text" autoComplete="name" required
                aria-invalid={status.field === "name" || undefined} aria-describedby={status.field === "name" ? `${id}-err` : undefined} />
            </div>
            <div className="field">
              <label htmlFor={`${id}-mail`}>E-Mail</label>
              <input className="input" id={`${id}-mail`} name="email" type="email" autoComplete="email" inputMode="email" required
                aria-invalid={status.field === "mail" || undefined} aria-describedby={`${id}-err`} />
              <span className="err" id={`${id}-err`} aria-live="polite">{status.error}</span>
            </div>
            <div className="field"><label htmlFor={`${id}-note`}>Nachricht (optional)</label><textarea className="input" id={`${id}-note`} name="note" rows={3} style={{ resize: "vertical" }} /></div>
            {/* Honeypot gegen Spam-Bots: für Menschen unsichtbar und nicht per Tab erreichbar */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor={`${id}-web`}>Website</label>
              <input id={`${id}-web`} name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <p className="dlg-note">Wir verwenden eure Angaben nur, um die Anfrage zu beantworten. Mehr dazu im <a href="/datenschutz">Datenschutz</a>.</p>
            <button className="btn" type="submit" disabled={sending} aria-busy={sending}>{sending ? "Wird gesendet …" : "Anfrage senden"}</button>
            <div className="msg" role="status" hidden={!status.ok}>{status.ok}</div>
          </div>
        </form>
      </dialog>
    </InquiryContext.Provider>
  );
}

export const useInquiry = () => useContext(InquiryContext);

export function OpenInquiryButton({ type, className = "btn", children, onOpen }: { type?: InquiryType; className?: string; children: React.ReactNode; onOpen?: () => void }) {
  const { open } = useInquiry();
  return (
    <button className={className} type="button" aria-haspopup="dialog" onClick={() => { onOpen?.(); open(type); }}>
      {children}
    </button>
  );
}
