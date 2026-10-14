import Link from "next/link";
import type { ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "light" | "outline" | "brand"; className?: string; external?: boolean };

export function Button({ href, children, variant = "light", className = "", external }: BtnProps) {
  const styles = {
    light: "bg-white text-black border-brand/40 hover:bg-brand hover:text-white hover:border-brand",
    outline: "bg-transparent text-white border-white/60 hover:bg-white hover:text-black",
    brand: "bg-brand text-white border-brand hover:bg-brand-dark",
  }[variant];
  const cls = `group inline-flex items-center gap-3 rounded-xl border px-6 py-3.5 text-sm font-medium shadow-sm transition-colors duration-300 ${styles} ${className}`;
  const inner = (
    <>
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-brand px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      {children}
    </span>
  );
}

export function SectionTitle({ eyebrow, title, className = "" }: { eyebrow: string; title: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto mb-10 flex max-w-3xl flex-col items-center gap-5 text-center md:mb-12 ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">{title}</h2>
    </div>
  );
}
