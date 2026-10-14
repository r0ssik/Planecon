// Configuração da Sanity (painel do blog). Valores vêm das variáveis de ambiente — ver .env.example.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-10-01";

// Sem projectId o site usa os artigos locais de src/content/posts.ts.
export const sanityEnabled = Boolean(projectId);
