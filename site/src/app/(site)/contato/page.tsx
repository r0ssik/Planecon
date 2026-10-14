import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui";
import { site, whatsappLink } from "@/content/site";
import { seo } from "@/content/seo";

export const metadata: Metadata = {
  title: seo.pages.contato.title,
  description: seo.pages.contato.description,
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  const info = [
    { label: "Telefone", value: site.phone, href: site.phoneHref },
    { label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    { label: "Endereço", value: `${site.address.street} — ${site.address.district}, ${site.address.city}-${site.address.state}`, href: site.mapsUrl },
    { label: "Horário", value: site.openingHours },
  ];

  return (
    <>
      <PageHero
        title="Fale com a Planecon"
        subtitle="Queremos entender o que você precisa. Envie uma mensagem ou fale com a gente pelo WhatsApp."
        crumbs={[{ href: "/", label: "Home" }, { label: "Contato" }]}
      />
      <section className="bg-mid px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <ul className="grid gap-4 sm:grid-cols-2">
              {info.map((i) => (
                <li key={i.label} className="rounded-2xl bg-section p-6">
                  <span className="text-xs font-semibold tracking-wider text-brand uppercase">{i.label}</span>
                  {i.href ? (
                    <a href={i.href} className="mt-2 block break-words text-black hover:text-brand" {...(i.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {i.value}
                    </a>
                  ) : (
                    <p className="mt-2 text-black">{i.value}</p>
                  )}
                </li>
              ))}
            </ul>
            <div>
              <Button href={whatsappLink()} external>
                Conversar pelo WhatsApp
              </Button>
            </div>
            <iframe
              title="Mapa — Planecon Contabilidade"
              src={site.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full rounded-2xl border-0"
            />
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
