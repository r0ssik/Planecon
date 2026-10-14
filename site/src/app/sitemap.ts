import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const pages = ["", "/sobre", "/servicos", "/blog", "/atualize-se", "/contato", "/politica-de-privacidade"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...services.map((s) => ({ url: `${site.url}/servicos/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
