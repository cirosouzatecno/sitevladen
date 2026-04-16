import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-data";

interface MetadataOptions {
  title: string;
  description: string;
  path: string;
}

const siteUrl = new URL(siteConfig.url);

export function createMetadata({
  title,
  description,
  path,
}: MetadataOptions): Metadata {
  const canonical = new URL(path, siteUrl);

  return {
    metadataBase: siteUrl,
    title,
    description,
    keywords: [
      "decoração de eventos",
      "decoração de casamento",
      "eventos de luxo",
      "São José do Rio Preto",
      "cenografia para eventos",
      "decoração floral refinada",
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: "/og-le-jardin.svg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - identidade visual premium`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-le-jardin.svg"],
    },
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.whatsappDisplay,
    areaServed: siteConfig.serviceArea.map((area) => ({
      "@type": "City",
      name: area,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: siteConfig.whatsappDisplay,
      areaServed: "BR",
      availableLanguage: ["pt-BR"],
    },
  };
}
