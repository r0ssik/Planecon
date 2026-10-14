# Planecon Contabilidade — novo site

Novo site institucional da Planecon, seguindo a estrutura visual do modelo **gacadvocacia.vercel.app**, com as cores da marca (azul-petróleo `#096C83` / verde-água `#12A89F`) e o conteúdo do site atual.

- `site/` — código do site (Next.js)
- `Modelo-SEO-Planecon.docx` — modelo de SEO pré-preenchido para validação do cliente

## Stack

| Item | Escolha | Por quê |
|---|---|---|
| Framework | **Next.js 16** (App Router, TypeScript) | Mesma base do site de referência; páginas pré-renderizadas = carregamento rápido e ótimo SEO |
| Estilo | **Tailwind CSS 4** | Agilidade para replicar o layout do modelo |
| Fontes | Sora (títulos) + Roboto (texto) | As mesmas do modelo |
| Hospedagem | **Vercel** (gratuito para esse porte) | Deploy automático a cada alteração, HTTPS e CDN |
| Formulário | Rota `/api/contato` + **Resend** | Envio de e-mail sem servidor próprio; sem chave configurada, abre o e-mail do visitante |

## Publicação (GitHub + Vercel)

- Código no GitHub (repositório privado). A **Vercel** publica automaticamente a cada `git push` na branch `main`.
- Na Vercel: *Root Directory* = `site`. Variáveis em *Settings › Environment Variables* (modelo em `site/.env.example`).
- **Durante a prévia para o cliente**: manter `NOINDEX=true` (esconde do Google). **No lançamento**: remover `NOINDEX`, apontar o domínio `planeconcontabilidade.com.br` em *Settings › Domains* e fazer um novo deploy.

## Rodar localmente

```bash
cd site
npm install
npm run dev
```

Acesse http://localhost:3000.

## Onde editar o conteúdo

Todo o conteúdo fica em `site/src/content/`, sem precisar mexer nos componentes:

| Arquivo | O que contém |
|---|---|
| `site.ts` | Telefone, e-mail, endereço, WhatsApp, fotos, números, FAQ |
| `services.ts` | As 6 áreas de atuação (cada uma gera uma página `/servicos/...`) |
| `posts.ts` | Artigos do blog |
| `seo.ts` | Títulos, descrições e palavras-chave de cada página |

## Páginas

`/` · `/sobre` · `/servicos` · `/servicos/[6 áreas]` · `/blog` · `/blog/[artigo]` · `/atualize-se` · `/atualize-se/[notícia]` · `/contato` · `/politica-de-privacidade` · `sitemap.xml` · `robots.txt`

## Blog x Atualize-se (modelo híbrido)

- **Blog** (`/blog`): artigos próprios, gerenciados pelo **painel em `/admin`** (Sanity). É o que gera SEO — indexado, com título/descrição próprios.
- **Atualize-se** (`/atualize-se` + seção na Home): notícias automáticas + cotações do dia. **Já funciona, sem custo nem cadastro.**
  - **Fontes** (configuradas em `site/src/content/newsSources.ts` — adicionar/remover = editar uma linha):
    | Fonte | Modo | Como aparece |
    |---|---|---|
    | Portal Contábeis (RSS) | `link` | Manchete + resumo; o cartão abre a matéria no site do Contábeis |
    | Agência Brasil – Economia (RSS) | `full` | Matéria completa numa página do site, com crédito e link para o original |
  - ⚠️ Política da Agência Brasil: *"Reprodução autorizada para veículos de comunicação com fins jornalísticos, mediante indicação da fonte."* Um escritório de contabilidade pode não se enquadrar como "veículo de comunicação". Se a Planecon preferir não arriscar, basta trocar `mode: "full"` por `mode: "link"`.
  - As notícias das fontes são misturadas por data, sem repetições; se uma fonte sair do ar, as outras continuam aparecendo.
  - Logotipos e pixels de rastreamento embutidos nos feeds são removidos; o HTML é sanitizado.
  - Atualização: cache de 1 hora. Cotações: AwesomeAPI (pública), a cada 30 min.
  - Páginas de notícia são `noindex` (conteúdo repetido em vários sites) — o SEO fica com o blog.
  - Opcional/futuro: se um dia houver acesso a uma API paga (ex.: TBrWeb), basta preencher `NEWS_API_URL`/`NEWS_API_KEY` (ver `site/.env.example`); ela substitui os feeds RSS.

## Painel do blog (Sanity) — configuração única

O painel fica em **`/admin`** (em português). Enquanto não for configurado, o blog usa os 3 artigos de `site/src/content/posts.ts`.

1. **Criar o projeto**: entrar em [sanity.io](https://www.sanity.io) com a conta da Planecon (Google ou e-mail) → *Create project* → plano gratuito → dataset `production`. Anotar o **Project ID**.
2. **Variáveis** (na Vercel e em `site/.env.local` para testar localmente):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = Project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `SANITY_REVALIDATE_SECRET` = um texto longo e aleatório
3. **Liberar o painel no domínio** — sanity.io/manage › projeto › **API › CORS origins** › adicionar, marcando *Allow credentials*:
   - `http://localhost:3000`
   - `https://www.planeconcontabilidade.com.br` (e o endereço `*.vercel.app`, se for usar)
4. **Atualização instantânea** — sanity.io/manage › **API › Webhooks** › *Create webhook*:
   - URL: `https://www.planeconcontabilidade.com.br/api/revalidate`
   - Dataset `production`; Trigger on: *Create, Update, Delete*; Filter: `_type == "post"`
   - Projection: `{_type, "slug": slug.current}`; HTTP method `POST`; Secret: o mesmo de `SANITY_REVALIDATE_SECRET`
   - (Sem webhook o site também atualiza sozinho, em até ~1 hora.)
5. **Importar os 3 artigos atuais** (uma vez): criar um token *Editor* em **API › Tokens**, colocar em `site/.env.local` como `SANITY_API_WRITE_TOKEN` e rodar `npm run sanity:import` dentro de `site/`. Depois pode apagar o token.
6. **Usuários**: convidar a equipe em sanity.io/manage › **Members** (o plano gratuito permite alguns usuários).

**Para publicar um artigo:** acessar `/admin` → *Artigos do blog* → *Criar* → preencher título, resumo, capa e texto (aba *SEO* é opcional) → **Publicar**.

## SEO já incluído

- Título e descrição únicos por página (`seo.ts` e `services.ts`)
- URLs canônicas, Open Graph (prévia ao compartilhar no WhatsApp/redes)
- Dados estruturados Schema.org (`AccountingService` com endereço e serviços; `BlogPosting` nos artigos)
- `sitemap.xml` e `robots.txt` automáticos
- Uma página por serviço focada em "serviço + Campinas"

## Pendências (dados a confirmar com o cliente)

Procure por `TODO` no código:

- [ ] Número de **WhatsApp** (hoje aponta para o fixo (19) 3213-3025)
- [ ] CEP, horário de atendimento, redes sociais
- [ ] Números do hero (+25 anos, +300 empresas) — são provisórios
- [ ] **Validar a logo**: foi redesenhada em vetor (SVG) a partir do PNG do site antigo, com fonte Exo 2 e cores originais (`site/public/images/logo-planecon*.svg`, favicon em `site/src/app/icon.svg`). Se o cliente tiver o arquivo original da agência (SVG/AI/PDF), substituir pelos mesmos nomes
- [ ] **Fotos reais** do escritório e da equipe (hoje são fotos de banco de imagens do Unsplash). Para usar vídeo no topo: `<Hero video="/videos/hero.mp4" />`
- [ ] Revisão jurídica da Política de Privacidade
- [ ] **Painel do blog**: criar a conta Sanity da Planecon e seguir a seção "Painel do blog" (passos 1 a 6)
- [ ] **Agência Brasil**: Planecon decidir se mantém a matéria completa (`full`) ou só manchete com link (`link`)
- [ ] Na Vercel: definir `RESEND_API_KEY` (e opcionalmente `CONTACT_FROM`/`CONTACT_TO`) para o formulário enviar e-mail
- [ ] Após publicar: cadastrar o site no Google Search Console e enviar o `sitemap.xml`; manter o Google Meu Negócio atualizado
