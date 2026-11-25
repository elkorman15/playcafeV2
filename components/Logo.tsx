/** Logo als vorab optimiertes WebP in zwei Größen (240/480 px). */
export default function Logo({ href, label, priority = false, sizes = "170px", className = "logo" }: {
  href: string; label: string; priority?: boolean; sizes?: string; className?: string;
}) {
  return (
    <a className={className} href={href} aria-label={label}>
      {/* eslint-disable-next-line @next/next/no-img-element -- statischer Export, Bild ist bereits optimiert */}
      <img
        src="/assets/bibis-logo-240.webp"
        srcSet="/assets/bibis-logo-240.webp 240w, /assets/bibis-logo-480.webp 480w"
        sizes={sizes}
        width={480}
        height={303}
        alt="BiBi's playcafé"
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </a>
  );
}
