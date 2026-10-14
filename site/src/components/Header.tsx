"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";

type ListProps = { mobile?: boolean; onNavigate?: () => void };

function NavList({ mobile, onNavigate, pathname }: ListProps & { pathname: string }) {
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  return (
    <ul className={mobile ? "flex flex-col px-4 py-3" : "flex items-center gap-8 lg:gap-12"}>
      {nav.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className={
              mobile
                ? `block rounded-lg px-3 py-3 font-display font-semibold ${isActive(item.href) ? "bg-white/10 text-accent" : "text-white"}`
                : `relative font-display text-[15px] font-semibold text-white transition-opacity hover:opacity-100 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:bg-accent after:transition-all ${
                    isActive(item.href) ? "opacity-100 after:w-full" : "opacity-85 after:w-0 hover:after:w-full"
                  }`
            }
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Lê a rota atual (dado de requisição) — por isso fica dentro de <Suspense>.
function ActiveNavList(props: ListProps) {
  return <NavList {...props} pathname={usePathname()} />;
}

const Nav = (props: ListProps) => (
  <Suspense fallback={<NavList {...props} pathname="" />}>
    <ActiveNavList {...props} />
  </Suspense>
);

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-white/40 transition-colors duration-300 ${
        scrolled ? "bg-primary/95 backdrop-blur" : "bg-mid"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:h-24 md:px-6">
        <Link href="/" aria-label="Planecon Contabilidade — página inicial">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <Nav />
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg text-white md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav aria-label="Menu móvel" className="border-t border-white/20 bg-primary md:hidden">
          <Nav mobile onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </header>
  );
}
