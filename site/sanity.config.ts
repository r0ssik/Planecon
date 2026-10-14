"use client";

// Painel de conteúdo (Sanity Studio), disponível em /admin.
import { ptBRLocale } from "@sanity/locale-pt-br";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes/post";

export default defineConfig({
  name: "planecon",
  title: "Planecon — Blog",
  basePath: "/admin",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([S.documentTypeListItem("post").title("Artigos do blog")]),
    }),
    ptBRLocale(),
  ],
});
