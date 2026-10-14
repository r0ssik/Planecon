import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
      <PageHero title="Página não encontrada" subtitle="O endereço acessado não existe ou foi movido." crumbs={[{ href: "/", label: "Home" }, { label: "404" }]} />
      <section className="flex justify-center bg-mid px-4 py-16">
        <Button href="/">Voltar para a Home</Button>
      </section>
      </main>
      <Footer />
    </div>
  );
}
