import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Artigo do blog",
  type: "document",
  groups: [
    { name: "conteudo", title: "Conteúdo", default: true },
    { name: "seo", title: "SEO (Google)" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "conteudo",
      validation: (r) => r.required().max(110),
    }),
    defineField({
      name: "slug",
      title: "Endereço (URL)",
      description: "Gerado a partir do título. Ex.: /blog/como-abrir-empresa",
      type: "slug",
      group: "conteudo",
      options: { source: "title", maxLength: 90 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "date",
      group: "conteudo",
      options: { dateFormat: "DD/MM/YYYY" },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      description: "Aparece nos cartões do blog. Até 200 caracteres.",
      type: "text",
      rows: 3,
      group: "conteudo",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      group: "conteudo",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Descrição da imagem (acessibilidade)", type: "string" })],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Texto",
      type: "array",
      group: "conteudo",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Parágrafo", value: "normal" },
            { title: "Subtítulo", value: "h2" },
            { title: "Subtítulo menor", value: "h3" },
            { title: "Citação", value: "blockquote" },
          ],
          lists: [
            { title: "Lista", value: "bullet" },
            { title: "Lista numerada", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [{ name: "href", title: "Endereço", type: "url", validation: (r) => r.uri({ scheme: ["http", "https", "mailto", "tel"] }) }],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          title: "Imagem",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Descrição da imagem", type: "string" })],
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "Título para o Google",
      description: "Opcional. Se vazio, usa o título do artigo. Ideal: até 60 caracteres.",
      type: "string",
      group: "seo",
      validation: (r) => r.max(70).warning("Títulos longos são cortados no Google."),
    }),
    defineField({
      name: "seoDescription",
      title: "Descrição para o Google",
      description: "Opcional. Se vazia, usa o resumo. Ideal: 140 a 160 caracteres.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (r) => r.max(170).warning("Descrições longas são cortadas no Google."),
    }),
  ],
  orderings: [{ title: "Mais recentes", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", date: "publishedAt", media: "coverImage" },
    prepare: ({ title, date, media }) => ({
      title,
      subtitle: date ? new Date(date + "T12:00:00").toLocaleDateString("pt-BR") : "Sem data",
      media,
    }),
  },
});

export const schemaTypes = [post];
