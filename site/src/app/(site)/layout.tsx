import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieBanner } from "@/components/CookieBanner";
import { site } from "@/content/site";
import { services } from "@/content/services";

// Dados estruturados (Schema.org) — ajudam o Google a exibir endereço, telefone e serviços.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: "+55 19 3213-3025",
  image: `${site.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: ["Campinas", "Região Metropolitana de Campinas"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços contábeis",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.seoTitle, url: `${site.url}/servicos/${s.slug}` },
    })),
  },
};

// Layout das páginas públicas (o painel /admin não usa cabeçalho/rodapé do site)
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
}
