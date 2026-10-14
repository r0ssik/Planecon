import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CallToAction, ContactSection } from "@/components/sections";
import { Arrow } from "@/components/ui";
import { services } from "@/content/services";
import { seo } from "@/content/seo";

export const metadata: Metadata = {
  title: seo.pages.servicos.title,
  description: seo.pages.servicos.description,
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <>
      <PageHero
        title="Serviços contábeis completos para sua empresa"
        subtitle="Trabalhar com contabilidade exige conhecimento, experiência e dedicação. Conheça nossas áreas de atuação."
        crumbs={[{ href: "/", label: "Home" }, { label: "Serviços" }]}
      />
      <section className="bg-gradient-to-b from-primary to-section-dark px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/servicos/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-section shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative h-52">
                <Image src={s.image} alt="" fill sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <h2 className="text-xl font-semibold text-black">{s.title}</h2>
                <p className="flex-1 text-sm leading-relaxed text-black/70">{s.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-brand">
                  Saiba mais <Arrow className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CallToAction />
      <ContactSection />
    </>
  );
}
