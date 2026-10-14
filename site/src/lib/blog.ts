// Artigos do blog: vêm da Sanity (painel /admin) quando configurada; senão, de src/content/posts.ts.
import { cacheLife, cacheTag } from "next/cache";
import type { PortableTextBlock } from "next-sanity";
import { client, urlFor } from "@/sanity/client";
import { sanityEnabled } from "@/sanity/env";
import { posts as localPosts } from "@/content/posts";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // AAAA-MM-DD
  image: string;
  imageAlt?: string;
  body: PortableTextBlock[] | string[]; // Sanity (Portable Text) ou parágrafos locais
  seoTitle?: string;
  seoDescription?: string;
};

type SanityPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage?: { alt?: string; asset?: unknown };
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};

const fields = `"slug": slug.current, title, excerpt, "date": publishedAt, coverImage, seoTitle, seoDescription`;
const PLACEHOLDER = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80";

const fromSanity = (p: SanityPost): BlogPost => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt ?? "",
  date: p.date,
  image: p.coverImage?.asset ? urlFor(p.coverImage).width(1200).height(800).url() : PLACEHOLDER,
  imageAlt: p.coverImage?.alt,
  body: p.body ?? [],
  seoTitle: p.seoTitle,
  seoDescription: p.seoDescription,
});

export async function getPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 604800 });
  cacheTag("posts");
  if (!sanityEnabled) return localPosts;
  try {
    const list = await client.fetch<SanityPost[]>(
      `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) { ${fields} }`,
    );
    return list.map(fromSanity);
  } catch (e) {
    console.error("[blog] falha ao buscar artigos na Sanity", e);
    return [];
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 604800 });
  cacheTag("posts", `post:${slug}`);
  if (!sanityEnabled) return localPosts.find((p) => p.slug === slug) ?? null;
  try {
    const p = await client.fetch<SanityPost | null>(`*[_type == "post" && slug.current == $slug][0] { ${fields}, body }`, { slug });
    return p ? fromSanity(p) : null;
  } catch (e) {
    console.error("[blog] falha ao buscar artigo na Sanity", e);
    return null;
  }
}
