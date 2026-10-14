import Link from "next/link";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "./Logo";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  return (
    <footer className="w-full bg-gradient-to-b from-primary to-section-dark px-4 pt-14 pb-24 text-white md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.3fr]">
        <div className="flex flex-col gap-5">
          <Logo className="h-16 w-auto self-start" />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {site.tagline}. Atendimento personalizado para cada cliente e cada necessidade.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Links Úteis</h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-accent">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/politica-de-privacidade" className="hover:text-accent">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Serviços</h3>
          <ul className="space-y-2.5 text-sm text-white/75">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicos/${s.slug}`} className="hover:text-accent">
                  {s.seoTitle.replace(" em Campinas", "")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Fale Conosco</h3>
          <ul className="space-y-4 text-sm text-white/75">
            <li>
              <span className="block text-xs uppercase tracking-wider text-white/45">Telefone</span>
              <a href={site.phoneHref} className="hover:text-accent">
                {site.phone}
              </a>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wider text-white/45">E-mail</span>
              <a href={`mailto:${site.email}`} className="break-all hover:text-accent">
                {site.email}
              </a>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wider text-white/45">Endereço</span>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                {site.address.street} — {site.address.district}
                <br />
                {site.address.city} - {site.address.state}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
        <p>
          © {year} {site.name}. Todos os direitos reservados.
        </p>
        <p>Campinas - SP</p>
      </div>
    </footer>
  );
}
