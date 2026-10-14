import type { Metadata } from "next";
import { AtualizeSeSection } from "@/components/news";
import { About, BlogPreview, CallToAction, ContactSection, Faq, Hero, Services } from "@/components/sections";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      {/* Para usar vídeo no topo: <Hero video="/videos/hero.mp4" /> */}
      <Hero />
      <About />
      <Services />
      <CallToAction />
      <BlogPreview />
      <AtualizeSeSection />
      <Faq />
      <ContactSection />
    </>
  );
}
