import Link from "next/link";
import { images } from "@/content/site";

type Crumb = { href?: string; label: string };

// Cabeçalho das páginas internas — mantém o cartão arredondado da Home.
export function PageHero({ title, subtitle, crumbs, image = images.pageHero }: { title: string; subtitle?: string; crumbs: Crumb[]; image?: string }) {
  return (
    <section className="w-full bg-gradient-to-b from-mid to-mid-light px-3 py-3 md:px-6 md:py-6">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" aria-hidden />
        <div className="relative px-6 py-16 md:px-12 md:py-24">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-accent">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="max-w-3xl text-3xl leading-tight font-semibold text-white md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-white/80">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
