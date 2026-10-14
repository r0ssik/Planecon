// Webhook da Sanity: ao publicar/editar/excluir um artigo, limpa o cache do blog para o site atualizar em segundos.
// Configurar em sanity.io/manage › API › Webhooks (ver README) com o mesmo segredo de SANITY_REVALIDATE_SECRET.
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return Response.json({ error: "SANITY_REVALIDATE_SECRET não configurado" }, { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string; slug?: string }>(req, secret, true);
  if (!isValidSignature) return Response.json({ error: "Assinatura inválida" }, { status: 401 });

  revalidateTag("posts", "max");
  if (body?.slug) revalidateTag(`post:${body.slug}`, "max");
  return Response.json({ revalidated: true, type: body?._type, slug: body?.slug });
}
