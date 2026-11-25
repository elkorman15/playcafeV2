"use client";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/site";
import { OpenInquiryButton } from "./Inquiry";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape schließt das mobile Menü, Fokus zurück auf den Button
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); burger.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Aktiver Bereich in der Navigation (aria-current="location")
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(({ id }) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <nav className="wrap nav" aria-label="Hauptnavigation">
        <Logo href="#main" label="BiBi's playcafé, zum Seitenanfang" priority sizes="(max-width: 1000px) 108px, 138px" />
        <ul className={`menu${open ? " open" : ""}`} id="menu">
          {NAV.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
          <li className="mobile-cta">
            <OpenInquiryButton className="btn olive" onOpen={() => setOpen(false)}>Anfrage senden</OpenInquiryButton>
          </li>
        </ul>
        <div className="nav-cta">
          <OpenInquiryButton className="btn olive">Anfrage senden</OpenInquiryButton>
          <button ref={burger} className="burger" type="button" aria-controls="menu" aria-expanded={open}
            aria-label={open ? "Menü schließen" : "Menü öffnen"} onClick={() => setOpen((o) => !o)}>
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
