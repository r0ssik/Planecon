import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { About, CallToAction, Faq } from "@/components/sections";
import { Eyebrow } from "@/components/ui";
import { values } from "@/content/site";
import { seo } from "@/content/seo";

export const metadata: Metadata = {
  title: seo.pages.sobre.title,
  description: seo.pages.sobre.description,
  alternates: { canonical: "/sobre" },
};

const pillars = [
  {
    title: "Missão",
    text: "Proporcionar aos nossos colaboradores um ambiente de trabalho estimulante e, por meio da nossa prestação de serviço, participar do sucesso de nossos clientes.",
  },
  {
    title: "Visão",
    text: "Ser uma organização contábil de referência em Campinas e região, reconhecida pelo profissionalismo da equipe e pela qualidade na prestação de serviços.",
  },
  {
    title: "Valores",
    text: "Princípios que orientam cada entrega e cada relacionamento com nossos clientes.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        title="Sobre a Planecon Contabilidade"
        subtitle="Uma equipe treinada e qualificada, com uma filosofia de trabalho voltada para a qualidade."
        crumbs={[{ href: "/", label: "Home" }, { label: "Sobre" }]}
      />
      <About />
      <section className="bg-gradient-to-b from-primary to-section-dark px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex justify-center">
            <Eyebrow>Missão, visão e valores</Eyebrow>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <article key={p.title} className="rounded-2xl border-t-4 border-accent bg-section p-8">
                <h2 className="mb-4 text-2xl font-semibold text-primary">{p.title}</h2>
                <p className="leading-relaxed text-black/75">{p.text}</p>
                {p.title === "Valores" && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {values.map((v) => (
                      <li key={v} className="rounded-full bg-brand/10 px-3 py-1 text-sm text-brand-dark">
                        {v}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
      <Faq />
    </>
  );
}
