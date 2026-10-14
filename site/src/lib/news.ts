// Feed de notícias automáticas da seção "Atualize-se".
//
// Funciona com qualquer fornecedor, configurado só por variáveis de ambiente (ver .env.example):
//   - API JSON (ex.: TBrWeb):  NEWS_API_URL + NEWS_API_KEY (+ NEWS_API_HEADER, NEWS_LIST_PATH, NEWS_ITEM_PATH)
//   - RSS/Atom:                fontes públicas em src/content/newsSources.ts (+ NEWS_RSS_URL opcional)
// Se a API JSON estiver configurada, ela é usada no lugar dos feeds RSS.
//
// As requisições são feitas no servidor (a chave nunca vai para o navegador) e ficam em cache por 1 hora.

import { cacheLife, cacheTag } from "next/cache";
import sanitizeHtml from "sanitize-html";
import { createHash } from "node:crypto";
import { newsSources, type NewsSource } from "@/content/newsSources";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  image?: string;
  date?: string; // ISO
  source?: string;
  external?: boolean; // true = o cartão abre a matéria no site original (fontes em modo "link")
  html?: string; // corpo já sanitizado (apenas na página da notícia)
  url?: string; // link externo (feeds RSS sem corpo completo)
};

export type NewsPage = { items: NewsItem[]; page: number; totalPages: number };

const env = {
  apiUrl: process.env.NEWS_API_URL?.replace(/\/$/, ""),
  apiKey: process.env.NEWS_API_KEY,
  apiHeader: process.env.NEWS_API_HEADER || "x-sgc-header",
  listPath: process.env.NEWS_LIST_PATH || "/information/news?page={page}&per_page={perPage}",
  itemPath: process.env.NEWS_ITEM_PATH || "/information/news/{id}",
  rssUrl: process.env.NEWS_RSS_URL,
};

const sources = (): NewsSource[] => [
  ...newsSources,
  ...(env.rssUrl ? [{ id: "feed", name: "", url: env.rssUrl, mode: "full" as const }] : []),
];

export const newsEnabled = () => Boolean((env.apiUrl && env.apiKey) || sources().length);

/* ---------- normalização tolerante (cada fornecedor usa nomes de campos diferentes) ---------- */

type Raw = Record<string, unknown>;
const pick = (o: Raw, keys: string[]) => {
  for (const k of keys) {
    const v = o[k];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
};
const str = (v: unknown) => (typeof v === "string" ? v : typeof v === "number" ? String(v) : undefined);
const stripTags = (s = "") =>
  s.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();

const clean = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "a", "table", "thead", "tbody", "tr", "th", "td", "img"],
    allowedAttributes: { a: ["href", "title", "target", "rel"], img: ["src", "alt"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: { a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer nofollow" }) },
    exclusiveFilter: (frame) => frame.tag === "img" && isJunkImage(frame.attribs.src),
  });

// Logotipos e pixels de contagem de acesso que alguns feeds embutem no texto
const isJunkImage = (src = "") => !src || /logo|\.gif(\?|$)|ebc\.png|pixel|1x1|tracking/i.test(src);

// Corta no fim de uma palavra e indica a continuação
const excerpt = (t: string, max = 220) => (t.length <= max ? t : t.slice(0, t.lastIndexOf(" ", max)).replace(/[,;:.\s]+$/, "") + "…");

const decodeEntities = (s: string) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");

// Texto puro vira parágrafos
const textToHtml = (t: string) =>
  t
    .split(/\n{2,}|\r\n\r\n/)
    .map((p) => `<p>${p.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!)}</p>`)
    .join("");

function toDate(v: unknown): string | undefined {
  const s = str(v);
  if (!s) return undefined;
  const d = new Date(/^\d{4}-\d{2}-\d{2} /.test(s) ? s.replace(" ", "T") : s);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

function normalize(o: Raw, withBody = false): NewsItem | null {
  const id = str(pick(o, ["id", "uuid", "slug", "codigo"]));
  const title = str(pick(o, ["title", "titulo", "name", "headline"]));
  if (!id || !title) return null;
  const body = str(pick(o, ["content", "body", "texto", "conteudo", "text", "description_full"]));
  const summary =
    str(pick(o, ["subtitle", "subtitulo", "summary", "resumo", "description", "descricao", "lead", "chamada"])) ??
    stripTags(body).slice(0, 180);
  return {
    id,
    title: stripTags(title),
    summary: stripTags(summary),
    image: str(pick(o, ["image", "imagem", "image_url", "img", "thumbnail", "foto", "cover"])),
    date: toDate(pick(o, ["date", "data", "published_at", "publishedAt", "created_at", "createdAt"])),
    source: str(pick(o, ["source", "fonte", "origin", "origem"])),
    html: withBody && body ? clean(/<[a-z][\s\S]*>/i.test(body) ? body : textToHtml(body)) : undefined,
  };
}

function listFrom(json: unknown): { list: Raw[]; totalPages?: number } {
  if (Array.isArray(json)) return { list: json as Raw[] };
  const o = (json ?? {}) as Raw;
  const inner = (o.data && !Array.isArray(o.data) && typeof o.data === "object" ? o.data : o) as Raw;
  const list = (pick(inner, ["data", "items", "news", "noticias", "results"]) ?? pick(o, ["data", "items"])) as Raw[] | undefined;
  const meta = (o.meta ?? inner.meta ?? inner) as Raw;
  const last = Number(pick(meta, ["last_page", "lastPage", "total_pages", "totalPages", "pages"]));
  return { list: Array.isArray(list) ? list : [], totalPages: Number.isFinite(last) && last > 0 ? last : undefined };
}

/* ---------- API JSON ---------- */

async function apiGet(path: string) {
  const res = await fetch(env.apiUrl + path, {
    headers: { [env.apiHeader]: env.apiKey!, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Feed de notícias respondeu ${res.status}`);
  return res.json();
}

/* ---------- RSS / Atom ---------- */

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? m[1].replace(/^<!\[CDATA\[|\]\]>$/g, "").trim() : undefined;
};
const attr = (xml: string, name: string, a: string) => xml.match(new RegExp(`<${name}[^>]*\\s${a}="([^"]+)"`, "i"))?.[1];

async function rssItems(src: NewsSource): Promise<NewsItem[]> {
  const res = await fetch(src.url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; PlaneconSite/1.0)" } });
  if (!res.ok) throw new Error(`RSS ${src.name || src.url} respondeu ${res.status}`);
  const xml = await res.text();
  const blocks = (xml.match(/<(item|entry)[\s>][\s\S]*?<\/(item|entry)>/gi) ?? []).slice(0, src.limit ?? 30);
  return blocks
    .map((b, i): NewsItem | null => {
      const link = tag(b, "link") || attr(b, "link", "href");
      let body = tag(b, "content:encoded") || tag(b, "content") || tag(b, "description") || "";
      if (/&lt;[a-z]/i.test(body)) body = decodeEntities(body); // HTML enviado "escapado"
      const bodyImg = [...body.matchAll(/<img[^>]+src="([^"]+)"/gi)].map((m) => m[1]).find((u) => !isJunkImage(u));
      const img = attr(b, "media:content", "url") || attr(b, "enclosure", "url") || attr(b, "media:thumbnail", "url") || bodyImg;
      const key = tag(b, "guid") || link || String(i);
      const id = `${src.id}-${createHash("sha1").update(key).digest("hex").slice(0, 10)}`;
      const full = src.mode === "full";
      const item = normalize(
        {
          id,
          title: decodeEntities(tag(b, "title") ?? ""),
          // resumo: texto do corpo sem a imagem de capa
          summary: excerpt(stripTags(body.replace(/<img[^>]*>/gi, "")).replace(/\s*(Leia mais|Continue lendo|Saiba mais)\b.*$/i, "")),
          content: full ? body : undefined,
          image: img,
          date: tag(b, "pubDate") || tag(b, "updated") || tag(b, "published") || tag(b, "dc:date"),
          source: src.name || tag(b, "source"),
        },
        full,
      );
      return item && { ...item, url: link, external: !full && Boolean(link) };
    })
    .filter((x): x is NewsItem => Boolean(x));
}

// Junta todas as fontes, mais recentes primeiro. Uma fonte fora do ar não derruba as outras.
async function allRssItems(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(sources().map(rssItems));
  results.forEach((r) => r.status === "rejected" && console.error("[atualize-se]", r.reason));
  const seen = new Set<string>();
  return results
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((n) => {
      const key = n.url ?? n.title; // mesma matéria vinda de duas fontes aparece uma vez só
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

/* ---------- API pública usada pelas páginas ---------- */

export async function getNews(page = 1, perPage = 9): Promise<NewsPage> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 86400 });
  cacheTag("news");
  try {
    if (env.apiUrl && env.apiKey) {
      const json = await apiGet(env.listPath.replace("{page}", String(page)).replace("{perPage}", String(perPage)));
      const { list, totalPages } = listFrom(json);
      return { items: list.map((o) => normalize(o)).filter((x): x is NewsItem => !!x), page, totalPages: totalPages ?? page };
    }
    if (sources().length) {
      const all = (await allRssItems()).map((n) => ({ ...n, html: undefined }));
      return { items: all.slice((page - 1) * perPage, page * perPage), page, totalPages: Math.max(1, Math.ceil(all.length / perPage)) };
    }
  } catch (e) {
    console.error("[atualize-se]", e);
  }
  return { items: [], page, totalPages: 1 };
}

export async function getNewsItem(id: string): Promise<NewsItem | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 604800 });
  cacheTag("news");
  try {
    if (env.apiUrl && env.apiKey) {
      const json = (await apiGet(env.itemPath.replace("{id}", encodeURIComponent(id)))) as Raw;
      const obj = (json && typeof json.data === "object" && !Array.isArray(json.data) ? json.data : json) as Raw;
      return normalize(obj, true);
    }
    if (sources().length) return (await allRssItems()).find((n) => n.id === id && !n.external) ?? null;
  } catch (e) {
    console.error("[atualize-se]", e);
  }
  return null;
}

/* ---------- Cotações (AwesomeAPI — pública e gratuita, sem chave) ---------- */

export type Quote = { label: string; buy: number; sell: number; change: number };

const PAIRS: [string, string][] = [
  ["USD-BRL", "Dólar Comercial"],
  ["USD-BRLT", "Dólar Turismo"],
  ["EUR-BRL", "Euro"],
  ["GBP-BRL", "Libra"],
  ["CHF-BRL", "Franco Suíço"],
  ["JPY-BRL", "Iene"],
];

export async function getQuotes(): Promise<{ quotes: Quote[]; updatedAt?: string }> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 1800, expire: 86400 });
  try {
    const res = await fetch(`https://economia.awesomeapi.com.br/json/last/${PAIRS.map((p) => p[0]).join(",")}`);
    if (!res.ok) throw new Error(`Cotações responderam ${res.status}`);
    const json = (await res.json()) as Record<string, { bid: string; ask: string; pctChange: string; create_date: string }>;
    const quotes = PAIRS.flatMap(([pair, label]) => {
      const q = json[pair.replace("-", "")];
      return q ? [{ label, buy: Number(q.bid), sell: Number(q.ask), change: Number(q.pctChange) }] : [];
    });
    return { quotes, updatedAt: json.USDBRL?.create_date };
  } catch (e) {
    console.error("[cotações]", e);
    return { quotes: [] };
  }
}

export const formatNewsDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "America/Sao_Paulo" }) : "";
