// Importa os artigos de src/content/posts.ts para a Sanity (rodar uma vez, após criar o projeto).
//   1. Crie um token com permissão "Editor" em sanity.io/manage › API › Tokens
//   2. node --env-file=.env.local scripts/import-posts.ts
// Pode rodar de novo sem duplicar: cada artigo usa um _id fixo baseado no slug.
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { posts } from "../src/content/posts.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Defina NEXT_PUBLIC_SANITY_PROJECT_ID e SANITY_API_WRITE_TOKEN em .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-10-01",
  token,
  useCdn: false,
});

const key = () => randomUUID().slice(0, 12);
const toBlocks = (paras: string[]) =>
  paras.map((p) => ({
    _type: "block",
    _key: key(),
    style: p.startsWith("## ") ? "h2" : "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: p.replace(/^## /, ""), marks: [] }],
  }));

for (const p of posts) {
  const res = await fetch(p.image);
  const asset = await client.assets.upload("image", Buffer.from(await res.arrayBuffer()), { filename: `${p.slug}.jpg` });
  await client.createOrReplace({
    _id: `post-${p.slug}`,
    _type: "post",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    publishedAt: p.date,
    excerpt: p.excerpt,
    coverImage: { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: p.title },
    body: toBlocks(p.body),
  });
  console.log("✓", p.title);
}
console.log("Importação concluída.");
