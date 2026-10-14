import { site } from "@/content/site";

// Envio do formulário de contato via Resend (https://resend.com).
// Configure na Vercel: RESEND_API_KEY e (opcional) CONTACT_FROM, ex.: "Site Planecon <site@planeconcontabilidade.com.br>".
// Sem a chave, a rota responde 501 e o formulário abre o e-mail do visitante como alternativa.

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(req: Request) {
  const data = (await req.json().catch(() => null)) as Record<string, string> | null;
  if (!data || !data.nome || !data.email) return Response.json({ error: "Dados inválidos" }, { status: 400 });
  if (data.website) return Response.json({ ok: true }); // honeypot

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ fallback: true }, { status: 501 });

  const html = `<h2>Novo contato pelo site</h2>
<p><b>Nome:</b> ${esc(data.nome)}</p>
<p><b>E-mail:</b> ${esc(data.email)}</p>
<p><b>Telefone:</b> ${esc(data.telefone ?? "")}</p>
<p><b>Mensagem:</b><br>${esc(data.mensagem ?? "").replace(/\n/g, "<br>")}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Site Planecon <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? site.email],
      reply_to: data.email,
      subject: `Contato pelo site — ${data.nome}`,
      html,
    }),
  });

  return res.ok ? Response.json({ ok: true }) : Response.json({ error: "Falha no envio" }, { status: 502 });
}
