import type { Metadata } from "next";
import { Roboto, Sora } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { seo } from "@/content/seo";

const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });
const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seo.defaultTitle, template: seo.titleTemplate },
  description: seo.description,
  keywords: seo.keywords,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: seo.defaultTitle,
    description: seo.description,
  },
  // NOINDEX=true (variável na Vercel) esconde o site do Google durante a fase de prévia.
  robots: process.env.NOINDEX === "true" ? { index: false, follow: false } : { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${roboto.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
