import Link from "next/link";
import s from "@/app/legal.module.css";

/** Gemeinsamer Rahmen für Impressum, Datenschutz und 404. */
export default function LegalShell({ children, footer, center = false }: { children: React.ReactNode; footer?: React.ReactNode; center?: boolean }) {
  return (
    <div className={s.page}>
      <a className="skip" href="#main">Zum Inhalt springen</a>
      <header className={s.header}>
        <div className={s.wrap}>
          <Link className={s.logoLink} href="/" aria-label="Zur Startseite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/bibis-logo-240.webp" srcSet="/assets/bibis-logo-240.webp 240w, /assets/bibis-logo-480.webp 480w"
              sizes="130px" width={480} height={303} alt="BiBi's playcafé" />
          </Link>
          <Link className={s.back} href="/">Zur Startseite</Link>
        </div>
      </header>
      <main id="main" tabIndex={-1} className={`${s.wrap} ${s.main}${center ? ` ${s.center}` : ""}`}>{children}</main>
      {footer && <footer className={s.footer}><div className={s.wrap}>{footer}</div></footer>}
    </div>
  );
}

export const Todo = ({ children }: { children: React.ReactNode }) => <mark className={s.todo}>{children}</mark>;
export const legal = s;
