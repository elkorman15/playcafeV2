"use client";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { INQUIRY_TYPES, isValidEmail, type InquiryType } from "@/lib/site";

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const name = (f.elements.namedItem("name") as HTMLInputElement).value.trim();
    const mail = (f.elements.namedItem("email") as HTMLInputElement).value.trim();
    const date = (f.elements.namedItem("date") as HTMLInputElement).value;
    if (!name) { setStatus({ error: "Bitte euren Namen eingeben.", field: "name" }); (f.elements.namedItem("name") as HTMLElement).focus(); return; }
    if (!isValidEmail(mail)) { setStatus({ error: "Bitte eine gültige E-Mail-Adresse eingeben.", field: "mail" }); (f.elements.namedItem("email") as HTMLElement).focus(); return; }
    const dt = date ? " für den " + new Date(date + "T12:00:00").toLocaleDateString("de-AT", { day: "numeric", month: "long", year: "numeric" }) : "";
    setStatus({ ok: `${type}${dt}: Alles ausgefüllt. Vorschau: Das Formular wird beim Livegang mit eurer E-Mail verbunden, es wurde noch nichts gesendet.` });
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
            <button className="btn" type="submit">Anfrage prüfen</button>
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
