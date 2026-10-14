// Painel do blog (Sanity Studio) em /admin. Login com a conta Sanity (Google, GitHub ou e-mail).
import { Suspense } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { sanityEnabled } from "@/sanity/env";

export { metadata, viewport } from "next-sanity/studio";

function NotConfigured() {
  return (
    <main className="grid min-h-screen place-items-center bg-primary p-6 text-white">
      <div className="max-w-lg space-y-4 rounded-2xl bg-white/5 p-8">
        <h1 className="text-2xl font-semibold">Painel do blog ainda não configurado</h1>
        <p className="text-white/80">
          Defina <code className="rounded bg-white/10 px-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code> nas variáveis de ambiente (veja o
          README, seção “Painel do blog”). Enquanto isso, o blog usa os artigos de <code className="rounded bg-white/10 px-1">src/content/posts.ts</code>.
        </p>
      </div>
    </main>
  );
}

export default function StudioPage() {
  if (!sanityEnabled) return <NotConfigured />;
  return (
    <Suspense>
      <NextStudio config={config} />
    </Suspense>
  );
}
