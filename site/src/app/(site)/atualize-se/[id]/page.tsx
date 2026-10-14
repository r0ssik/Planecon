/* eslint-disable @next/next/no-img-element -- imagens do feed vêm de domínios variáveis do fornecedor */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { QuotesCard } from "@/components/news";
import { Button } from "@/components/ui";
import { formatNewsDate, getNewsItem } from "@/lib/news";

export async function generateMetadata({ params }: PageProps<"/atualize-se/[id]">): Promise<Metadata> {
  const { id } = await params;
  const n = await getNewsItem(decodeURIComponent(id));
  return {
    title: n?.title ?? "Notícia",
    description: n?.summary,
    // Notícias de agência se repetem em muitos sites: não indexar evita conteúdo duplicado no Google.
    // O SEO fica com o blog próprio.
    robots: { index: false, follow: true },
    alternates: { canonical: `/atualize-se/${id}` },
  };
}

async function Article({ params }: { params: PageProps<"/atualize-se/[id]">["params"] }) {
  const { id } = await params;
  const n = await getNewsItem(decodeURIComponent(id));
  if (!n) notFound();
  return (
    <>
      <PageHero title={n.title} subtitle={n.summary} crumbs={[{ href: "/", label: "Home" }, { href: "/atualize-se", label: "Atualize-se" }, { label: "Notícia" }]} />
      <section className="bg-mid px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_340px]">
          <article className="rounded-2xl bg-white p-8 md:p-12">
            {n.date && (
              <time dateTime={n.date} className="text-sm text-black/55">
                Publicado em {formatNewsDate(n.date)}
              </time>
            )}
            {n.image && <img src={n.image} alt="" className="my-8 max-h-[420px] w-full rounded-xl object-cover" />}
            {n.html ? (
              <div
                className="space-y-4 text-lg leading-relaxed text-black/80 [&_a]:text-brand [&_a]:underline [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-primary [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-6 [&_ol]:list-decimal [&_ul]:list-disc"
                dangerouslySetInnerHTML={{ __html: n.html }}
              />
            ) : (
              <p className="text-lg text-black/80">{n.summary}</p>
            )}
            {(n.source || n.url) && (
              <p className="mt-10 rounded-xl bg-section px-5 py-4 text-sm text-black/70">
                Fonte: <strong>{n.source || "veículo original"}</strong>
                {n.url && (
                  <>
                    {" — "}
                    <a href={n.url} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                      ver matéria original
                    </a>
                  </>
                )}
              </p>
            )}
            <div className="mt-10 border-t border-black/10 pt-6">
              <Link href="/atualize-se" className="text-brand hover:underline">
                ← Voltar para Atualize-se
              </Link>
            </div>
          </article>
          <aside className="flex flex-col gap-6">
            <QuotesCard />
            <div className="rounded-2xl bg-primary p-6 text-white">
              <h2 className="mb-2 text-lg font-semibold">Essa mudança afeta sua empresa?</h2>
              <p className="mb-5 text-sm text-white/75">Fale com a Planecon e receba orientação para o seu caso.</p>
              <Button href="/contato">Falar com um contador</Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default function NewsPage({ params }: PageProps<"/atualize-se/[id]">) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-mid" />}>
      <Article params={params} />
    </Suspense>
  );
}
