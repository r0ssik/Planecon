import Image from "next/image";
import Link from "next/link";
import { faq, images, site, stats, whatsappLink } from "@/content/site";
import { formatDate } from "@/content/posts";
import { getPosts, type BlogPost } from "@/lib/blog";
import { Button, Eyebrow, SectionTitle } from "./ui";
import { ServicesCarousel } from "./ServicesCarousel";
import { ContactForm } from "./ContactForm";

/* 1. Hero — cartão claro arredondado com foto (ou vídeo) sobreposta, como no modelo GAC */
export function Hero({ video }: { video?: string }) {
  return (
    <section className="w-full bg-gradient-to-b from-mid to-mid-light px-3 py-3 md:px-6 md:py-6">
      <div className="relative mx-auto max-w-7xl rounded-[28px] bg-section">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]" aria-hidden>
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        </div>
        <div className="relative min-h-[520px] px-6 py-10 md:px-10 lg:px-16 lg:py-16">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10 max-w-2xl animate-fade-up">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-brand">{site.tagline}</p>
              <h1 className="text-4xl leading-[1.1] text-black md:text-5xl">
                Procurando um escritório de <strong className="font-semibold text-brand">contabilidade em Campinas?</strong>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-black/75 md:text-xl">
                Tratamento personalizado para cada cliente e cada necessidade. Cuidamos da parte contábil, fiscal, trabalhista e
                societária para você focar no crescimento da sua empresa.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={whatsappLink()} external>
                  Iniciar atendimento
                </Button>
                <Button href="/servicos" variant="brand">
                  Ver serviços
                </Button>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-black/10 pt-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-2xl font-bold text-primary md:text-3xl">{s.value}</dd>
                    <dd className="text-xs leading-snug text-black/60">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative z-10 lg:-mb-56 lg:translate-y-20">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] lg:aspect-[2/3] overflow-hidden rounded-[28px] shadow-2xl">
                {video ? (
                  <video src={video} autoPlay muted loop playsInline poster={images.hero} className="h-full w-full object-cover" />
                ) : (
                  <Image src={images.hero} alt="Consultor da Planecon Contabilidade" fill priority sizes="(min-width:1024px) 420px, 90vw" className="object-cover object-center" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. Sobre nós */
export function About() {
  return (
    <section id="empresa" className="relative w-full overflow-hidden bg-gradient-to-b from-mid-light to-mid px-4 pt-20 pb-20 lg:pt-56">
      <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-2 md:grid-cols-2 md:px-6">
        <div className="relative">
          <Image
            src={images.about}
            alt="Equipe da Planecon Contabilidade reunida"
            width={1080}
            height={1080}
            sizes="(min-width:768px) 540px, 100vw"
            className="h-full max-h-[560px] w-full max-w-[540px] rounded-[28px] object-cover shadow-xl"
          />
        </div>
        <div className="flex flex-col justify-center text-white md:pl-4">
          <Eyebrow className="mb-6">Sobre nós</Eyebrow>
          <h2 className="mb-6 max-w-3xl text-2xl leading-tight font-bold uppercase lg:text-3xl">
            Uma contabilidade próxima, que cresce junto com a sua empresa
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-white/90 md:text-lg">
            <p>
              A Planecon Contabilidade presta assessoria com uma equipe treinada e qualificada nas áreas contábil, fiscal, pessoal,
              imposto de renda, auditoria, societária e tributária.
            </p>
            <p>
              Nossa filosofia de trabalho é voltada para a qualidade: cumprimento de prazos, sigilo, eficácia e profissionalismo em
              cada serviço — com uma excelente relação custo/benefício.
            </p>
            <p>Assim construímos uma empresa sólida, estruturada e reconhecida em Campinas e região.</p>
          </div>
          <div className="mt-8">
            <Button href="/sobre" variant="outline">
              Conheça a Planecon
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 3. Serviços */
export function Services() {
  return (
    <section id="servicos" className="bg-gradient-to-b from-primary to-section-dark py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Serviços" title="Áreas de Atuação" />
        <p className="mx-auto -mt-4 mb-6 max-w-2xl text-center text-white/70">
          Conhecimento, experiência e dedicação para que sua empresa esteja à frente e sem problemas com uma legislação muitas
          vezes burocrática.
        </p>
        <ServicesCarousel />
      </div>
    </section>
  );
}

/* 4. Chamada com imagem de fundo (parallax) */
export function CallToAction() {
  return (
    <section
      className="relative flex w-full justify-center bg-cover bg-center bg-no-repeat px-4 md:bg-fixed"
      style={{ backgroundImage: `url(${images.cta})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-7xl py-24 md:px-6">
        <div className="flex max-w-3xl flex-col items-center gap-6 text-center text-white md:items-start md:text-left">
          <h3 className="text-lg font-medium tracking-wider text-accent uppercase">Estamos ao seu lado</h3>
          <h2 className="text-3xl font-bold md:text-4xl">Mais segurança e tranquilidade para a gestão do seu negócio.</h2>
          <p className="text-white/85 md:text-lg">
            Conte com uma equipe especializada para manter sua empresa em dia com o Fisco, reduzir custos tributários e tomar
            decisões com base em números confiáveis.
          </p>
          <Button href="/contato">Fale com um especialista</Button>
        </div>
      </div>
    </section>
  );
}

/* 5. Blog */
export async function BlogPreview() {
  const posts = await getPosts();
  if (!posts.length) return null;
  return (
    <section id="blog" className="flex w-full justify-center bg-mid px-4 pt-16 pb-20 xl:pb-28">
      <div className="flex w-full max-w-7xl flex-col gap-8">
        <SectionTitle eyebrow="Blog" title="Fique por dentro das novidades contábeis" className="mb-4" />
        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-16 lg:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        <div className="flex justify-center pt-4">
          <Button href="/blog" variant="outline">
            Ver todos os artigos
          </Button>
        </div>
      </div>
    </section>
  );
}

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex w-full flex-col transition-transform duration-500 hover:-translate-y-3">
      <div className="relative lg:max-w-[85%]">
        <Image src={post.image} alt={post.imageAlt ?? ""} width={800} height={600} sizes="(min-width:1024px) 400px, 100vw" className="h-[320px] w-full rounded-xl object-cover" />
      </div>
      <div className="-mt-16 flex w-full justify-center lg:justify-end">
        <div className="relative flex w-[85%] flex-col gap-4 rounded-xl bg-white p-6 pb-8 text-center shadow-lg">
          <h3 className="text-lg font-medium text-black">{post.title}</h3>
          <time dateTime={post.date} className="text-sm text-black/55">
            {formatDate(post.date)}
          </time>
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-brand/40 px-6 py-2.5 text-sm text-brand transition-colors group-hover:bg-brand group-hover:text-white">
            Leia mais
          </span>
        </div>
      </div>
    </Link>
  );
}

/* 6. Perguntas frequentes */
export function Faq() {
  return (
    <section className="flex w-full justify-center bg-gradient-to-b from-primary to-section-dark px-4 pt-24 pb-24">
      <div className="flex w-full max-w-7xl flex-col items-center gap-10 lg:flex-row">
        <div className="flex w-full flex-col gap-5">
          <Eyebrow>A escolha certa</Eyebrow>
          <h2 className="text-2xl font-bold text-gray-200 md:text-3xl">
            Descubra por que tantas empresas confiam na Planecon.
          </h2>
          <div className="flex w-full flex-col gap-3">
            {faq.map((item, i) => (
              <details key={item.q} className="group rounded-md border-l-4 border-accent bg-white px-5 py-4" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-black">
                  <span>
                    {String(i + 1).padStart(2, "0")}. {item.q}
                  </span>
                  <span className="text-xl text-brand transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <div className="mt-3 text-slate-700">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
        <div className="relative hidden h-[560px] w-full max-w-md overflow-hidden rounded-[28px] lg:block">
          <Image src={images.faq} alt="" fill sizes="448px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <p className="absolute right-8 bottom-8 left-8 font-display text-2xl font-semibold text-white">
            Qualidade, prazo, sigilo e profissionalismo em cada entrega.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 7. Contato / proposta */
export function ContactSection() {
  return (
    <section id="contato" className="flex w-full justify-center bg-mid px-4 pt-16 pb-20 xl:pb-28">
      <div className="grid w-full max-w-7xl gap-8 md:grid-cols-2">
        <div className="text-center md:col-span-2">
          <Eyebrow>Solicite sua proposta</Eyebrow>
          <p className="mx-auto mt-5 max-w-2xl text-xl text-white md:text-2xl">
            Queremos entender o que você precisa. Vamos conversar sobre o futuro do seu negócio?
          </p>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-lg">
          <Image src={images.contact} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute right-6 bottom-6 left-6 space-y-2 text-white">
            <p className="font-display text-xl font-semibold">{site.name}</p>
            <p className="text-sm text-white/85">
              {site.address.street} — {site.address.district}, {site.address.city}-{site.address.state}
            </p>
            <p className="text-sm text-white/85">
              <a href={site.phoneHref}>{site.phone}</a> · <a href={`mailto:${site.email}`} className="break-all">{site.email}</a>
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
