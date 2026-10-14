import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { NewsList, QuotesCard } from "@/components/news";
import { Button } from "@/components/ui";
import { seo } from "@/content/seo";

export const metadata: Metadata = {
  title: seo.pages.atualizese.title,
  description: seo.pages.atualizese.description,
  alternates: { canonical: "/atualize-se" },
};

function ListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-busy>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-72 animate-pulse rounded-2xl bg-white/20" />
      ))}
    </div>
  );
}

export default function AtualizeSePage({ searchParams }: PageProps<"/atualize-se">) {
  return (
    <>
      <PageHero
        title="Atualize-se"
        subtitle="Notícias contábeis, tributárias e econômicas atualizadas automaticamente, além das principais cotações do dia."
        crumbs={[{ href: "/", label: "Home" }, { label: "Atualize-se" }]}
      />
      <section className="bg-mid px-4 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_340px]">
          <Suspense fallback={<ListSkeleton />}>
            {searchParams.then((sp) => {
              const page = Math.max(1, Number.parseInt(String(sp.pagina ?? "1"), 10) || 1);
              return <NewsList page={page} />;
            })}
          </Suspense>
          <aside className="flex flex-col gap-6">
            <QuotesCard />
            <div className="rounded-2xl bg-primary p-6 text-white">
              <h2 className="mb-2 text-lg font-semibold">Ficou com dúvida?</h2>
              <p className="mb-5 text-sm text-white/75">Nossa equipe explica como cada mudança afeta a sua empresa.</p>
              <Button href="/contato">Fale com um contador</Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
