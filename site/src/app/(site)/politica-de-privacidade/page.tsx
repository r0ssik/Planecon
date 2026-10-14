import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Saiba como a Planecon Contabilidade coleta, utiliza e protege seus dados pessoais, em conformidade com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

// Texto-base. Recomenda-se revisão jurídica antes da publicação.
const sections = [
  ["Quais dados coletamos", "Coletamos os dados que você nos informa voluntariamente pelo formulário de contato (nome, e-mail, telefone e mensagem) e dados de navegação, como cookies, para entender como o site é utilizado."],
  ["Como usamos seus dados", "Utilizamos os dados exclusivamente para responder às suas solicitações, enviar propostas e melhorar a experiência no site. Não vendemos nem compartilhamos seus dados com terceiros para fins comerciais."],
  ["Cookies", "Utilizamos cookies essenciais e de medição de audiência. Você pode desativá-los nas configurações do seu navegador a qualquer momento."],
  ["Seus direitos", "Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar acesso, correção, anonimização ou exclusão dos seus dados pessoais."],
  ["Contato", `Para exercer seus direitos ou tirar dúvidas, escreva para ${site.email}.`],
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHero title="Política de Privacidade" crumbs={[{ href: "/", label: "Home" }, { label: "Política de Privacidade" }]} />
      <section className="bg-mid px-4 py-16">
        <article className="mx-auto max-w-3xl space-y-8 rounded-2xl bg-white p-8 md:p-12">
          {sections.map(([t, body]) => (
            <div key={t}>
              <h2 className="mb-2 text-xl font-semibold text-primary">{t}</h2>
              <p className="leading-relaxed text-black/80">{body}</p>
            </div>
          ))}
        </article>
      </section>
    </>
  );
}
