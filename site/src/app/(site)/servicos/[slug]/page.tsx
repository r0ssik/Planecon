import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactSection, Faq } from "@/components/sections";
import { Button } from "@/components/ui";
import { getService, services } from "@/content/services";
import { whatsappLink } from "@/content/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    alternates: { canonical: `/servicos/${s.slug}` },
    openGraph: { title: s.seoTitle, description: s.seoDescription, images: [s.image] },
  };
}

export default async function ServicePage({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <>
      <PageHero
        title={s.seoTitle}
        subtitle={s.description}
        image={s.image}
        crumbs={[{ href: "/", label: "Home" }, { href: "/servicos", label: "Serviços" }, { label: s.title }]}
      />
      <section className="bg-mid px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl bg-section p-8 md:p-10">
            <h2 className="mb-6 text-2xl font-semibold text-primary">O que fazemos em {s.title}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {s.items.map((item) => (
                <li key={item} className="flex gap-3 text-black/80">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-[11px] text-white" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={whatsappLink(`Olá! Gostaria de saber mais sobre o serviço de ${s.title}.`)} external variant="brand">
                Solicitar proposta
              </Button>
            </div>
          </div>
          <aside className="flex flex-col gap-6">
            <div className="relative h-72 overflow-hidden rounded-2xl">
              <Image src={s.image} alt="" fill sizes="(min-width:1024px) 480px, 100vw" className="object-cover" />
            </div>
            <div className="rounded-2xl bg-primary p-6 text-white">
              <h2 className="mb-4 font-semibold">Outros serviços</h2>
              <ul className="space-y-2 text-sm">
                {services
                  .filter((o) => o.slug !== s.slug)
                  .map((o) => (
                    <li key={o.slug}>
                      <Link href={`/servicos/${o.slug}`} className="text-white/80 hover:text-accent">
                        → {o.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <Faq />
      <ContactSection />
    </>
  );
}
