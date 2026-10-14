import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactSection, PostCard } from "@/components/sections";
import { getPosts } from "@/lib/blog";
import { seo } from "@/content/seo";

export const metadata: Metadata = {
  title: seo.pages.blog.title,
  description: seo.pages.blog.description,
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        title="Blog Planecon"
        subtitle="Notícias e orientações sobre contabilidade, impostos e gestão para sua empresa."
        crumbs={[{ href: "/", label: "Home" }, { label: "Blog" }]}
      />
      <section className="bg-mid px-4 pt-16 pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-16 lg:grid-cols-3">
          {posts.length === 0 && <p className="text-white/80 lg:col-span-3">Nenhum artigo publicado ainda.</p>}
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
      <ContactSection />
    </>
  );
}
