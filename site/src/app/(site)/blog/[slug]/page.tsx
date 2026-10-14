import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/sections";
import { PostBody } from "@/components/PostBody";
import { formatDate } from "@/content/posts";
import { getPost, getPosts } from "@/lib/blog";
import { site } from "@/content/site";

export async function generateStaticParams() {
  const posts = await getPosts();
  // Artigos publicados depois do build são gerados no primeiro acesso.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "sem-artigos" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) return {};
  const title = p.seoTitle || p.title;
  const description = p.seoDescription || p.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title, description, publishedTime: p.date, images: [p.image] },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = await getPost(slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    image: p.image,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        title={p.title}
        crumbs={[{ href: "/", label: "Home" }, { href: "/blog", label: "Blog" }, { label: "Artigo" }]}
        image={p.image}
      />
      <section className="bg-mid px-4 py-16">
        <article className="mx-auto max-w-3xl rounded-2xl bg-white p-8 md:p-12">
          <time dateTime={p.date} className="text-sm text-black/55">
            Publicado em {formatDate(p.date)}
          </time>
          <div className="relative my-8 h-72 overflow-hidden rounded-xl md:h-96">
            <Image src={p.image} alt={p.imageAlt ?? ""} fill sizes="(min-width:768px) 720px, 100vw" className="object-cover" />
          </div>
          <PostBody body={p.body} />
          <div className="mt-12 border-t border-black/10 pt-6">
            <Link href="/blog" className="text-brand hover:underline">
              ← Voltar para o blog
            </Link>
          </div>
        </article>
      </section>
      <ContactSection />
    </>
  );
}
