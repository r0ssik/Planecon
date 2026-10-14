"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "ok" | "error";

const field =
  "w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-accent focus:ring-1 focus:ring-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("ok");
        form.reset();
        return;
      }
      // Sem serviço de e-mail configurado: abre o cliente de e-mail do visitante como alternativa.
      if (json.fallback) {
        const body = `Nome: ${data.nome}\nE-mail: ${data.email}\nTelefone: ${data.telefone}\n\n${data.mensagem}`;
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Contato pelo site")}&body=${encodeURIComponent(body)}`;
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-lg bg-gradient-to-b from-section-dark to-primary p-8 shadow-xl">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          Nome
          <input name="nome" required autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          E-mail
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          Telefone
          <input name="telefone" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          Como podemos ajudar?
          <textarea name="mensagem" rows={4} className={field} />
        </label>
        {/* honeypot anti-spam */}
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <label className="flex items-start gap-2 text-xs text-white/60">
          <input type="checkbox" required className="mt-0.5 accent-accent" />
          Concordo com o uso dos meus dados para retorno do contato, conforme a Política de Privacidade.
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-accent hover:text-white disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Enviar"}
        </button>
        <p aria-live="polite" className="text-sm">
          {status === "ok" && <span className="text-accent">Mensagem enviada! Em breve entraremos em contato.</span>}
          {status === "error" && (
            <span className="text-red-300">Não foi possível enviar. Tente pelo telefone {site.phone}.</span>
          )}
        </p>
      </form>
    </div>
  );
}
