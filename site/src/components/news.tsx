/* eslint-disable @next/next/no-img-element -- imagens do feed vêm de domínios variáveis do fornecedor */
import Link from "next/link";
import { formatNewsDate, getNews, getQuotes, newsEnabled, type NewsItem } from "@/lib/news";
import { Button, Eyebrow } from "./ui";
import { PostCard } from "./sections";
import { getPosts } from "@/lib/blog";

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: n < 1 ? 4 : 2 });

export async function QuotesCard({ compact = false }: { compact?: boolean }) {
  const { quotes, updatedAt } = await getQuotes();
  if (!quotes.length) return null;
  return (
    <div className="rounded-2xl bg-section p-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold text-primary">Cotações</h3>
        {updatedAt && <span className="text-xs text-black/50">Atualizado em {updatedAt.slice(8, 10)}/{updatedAt.slice(5, 7)} {updatedAt.slice(11, 16)}</span>}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs tracking-wider text-black/50 uppercase">
            <th className="pb-2 font-medium">Moeda</th>
            <th className="pb-2 text-right font-medium">Compra</th>
            {!compact && <th className="pb-2 text-right font-medium">Venda</th>}
            <th className="pb-2 text-right font-medium">Var.</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr key={q.label} className="border-t border-black/5">
              <td className="py-2 text-black/80">{q.label}</td>
              <td className="py-2 text-right font-medium text-black">{brl(q.buy)}</td>
              {!compact && <td className="py-2 text-right text-black/70">{brl(q.sell)}</td>}
              <td className={`py-2 text-right text-xs font-medium ${q.change >= 0 ? "text-emerald-700" : "text-red-700"}`}>
                {q.change >= 0 ? "▲" : "▼"} {Math.abs(q.change).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-[11px] text-black/40">Fonte: AwesomeAPI. Valores de referência.</p>
    </div>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  const cls = "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-transform duration-300 hover:-translate-y-1.5";
  const inner = (
    <>
      {item.image ? (
        <img src={item.image} alt="" loading="lazy" className="h-44 w-full object-cover" />
      ) : (
        <div className="grid h-44 w-full place-items-center bg-gradient-to-br from-primary via-brand-dark to-brand" aria-hidden>
          <span className="font-display text-lg font-semibold tracking-wide text-white/90">{item.source ?? "Notícia"}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-3 text-xs text-black/50">
          {item.source && <span className="font-semibold tracking-wide text-brand uppercase">{item.source}</span>}
          {item.date && <time dateTime={item.date}>{formatNewsDate(item.date)}</time>}
        </div>
        <h3 className="font-semibold leading-snug text-black group-hover:text-brand">{item.title}</h3>
        {item.summary && <p className="line-clamp-3 text-sm text-black/65">{item.summary}</p>}
        {item.external && (
          <span className="mt-auto pt-2 text-xs font-medium text-brand">
            Ler no {item.source} <span aria-hidden>↗</span>
          </span>
        )}
      </div>
    </>
  );
  // Fontes em modo "link": a matéria abre no site original (direitos autorais do veículo)
  return item.external && item.url ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={`/atualize-se/${encodeURIComponent(item.id)}`} className={cls}>
      {inner}
    </Link>
  );
}

/* Seção da Home: últimas notícias automáticas + cotações */
export async function AtualizeSeSection() {
  const enabled = newsEnabled();
  const { items } = enabled ? await getNews(1, 4) : { items: [] };
  return (
    <section id="atualize-se" className="flex w-full justify-center bg-gradient-to-b from-mid-light to-mid px-4 py-20">
      <div className="w-full max-w-7xl">
        <div className="mb-10 flex flex-col items-center gap-5 text-center">
          <Eyebrow>Atualize-se</Eyebrow>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Notícias e indicadores do dia</h2>
          <p className="max-w-2xl text-white/80">Acompanhe as principais notícias contábeis, tributárias e econômicas, atualizadas automaticamente.</p>
        </div>
        <div className={`grid gap-6 ${items.length ? "lg:grid-cols-[1fr_340px]" : "mx-auto max-w-md"}`}>
          {items.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {items.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          )}
          <div className="self-start">
            <QuotesCard compact />
          </div>
        </div>
        {items.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Button href="/atualize-se" variant="outline">
              Ver todas as notícias
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

/* Lista paginada da página /atualize-se */
export async function NewsList({ page }: { page: number }) {
  if (!newsEnabled()) {
    const posts = await getPosts();
    return (
      <div className="space-y-8">
        <p className="rounded-2xl bg-section p-6 text-black/75">
          Em breve, notícias contábeis atualizadas automaticamente. Enquanto isso, confira os artigos do nosso blog.
        </p>
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2">
          {posts.slice(0, 2).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    );
  }
  const { items, totalPages } = await getNews(page, 9);
  if (!items.length) return <p className="rounded-2xl bg-section p-6 text-black/75">Não foi possível carregar as notícias agora. Tente novamente em instantes.</p>;
  return (
    <div className="space-y-10">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((n) => (
          <NewsCard key={n.id} item={n} />
        ))}
      </div>
      {totalPages > 1 && <Pagination page={page} total={totalPages} />}
    </div>
  );
}

function Pagination({ page, total }: { page: number; total: number }) {
  const pages = Array.from(new Set([1, page - 1, page, page + 1, total])).filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const href = (p: number) => (p === 1 ? "/atualize-se" : `/atualize-se?pagina=${p}`);
  return (
    <nav aria-label="Paginação" className="flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} className="rounded-lg px-3 py-2 text-white hover:bg-white/10">
          ‹ Anterior
        </Link>
      )}
      {pages.map((p, i) => (
        <span key={p} className="flex items-center gap-2">
          {i > 0 && p - pages[i - 1] > 1 && <span className="text-white/50">…</span>}
          <Link
            href={href(p)}
            aria-current={p === page ? "page" : undefined}
            className={`grid h-10 min-w-10 place-items-center rounded-lg px-3 ${p === page ? "bg-white font-semibold text-primary" : "text-white hover:bg-white/10"}`}
          >
            {p}
          </Link>
        </span>
      ))}
      {page < total && (
        <Link href={href(page + 1)} className="rounded-lg px-3 py-2 text-white hover:bg-white/10">
          Próxima ›
        </Link>
      )}
    </nav>
  );
}
