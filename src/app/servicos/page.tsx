import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { createMetadata } from "@/lib/seo";
import { serviceItems, siteConfig } from "@/lib/site-data";
import { buildDirectWhatsAppHref } from "@/lib/whatsapp";

export const metadata = createMetadata({
  title: `Serviços | ${siteConfig.shortName}`,
  description:
    "Conheça os serviços premium da Le Jardin: decoração completa, projetos personalizados, cenografia e assessoria estética para eventos de alto padrão.",
  path: "/servicos",
});

export default function ServicesPage() {
  return (
    <div className="section-shell space-y-16 pb-20 pt-12 md:pt-[4.5rem]">
      <Reveal>
        <SectionHeading
          eyebrow="Serviços"
          title="Soluções autorais para eventos com presença, refinamento e personalidade."
          description="A Le Jardin atua com direção visual completa, composição cenográfica e curadoria estética para eventos sociais e corporativos de alto padrão."
        />
      </Reveal>

      <div className="grid gap-6">
        {serviceItems.map((service, index) => (
          <Reveal
            key={service.slug}
            className="overflow-hidden rounded-[2.5rem] border border-[rgba(17,17,17,0.08)] bg-white/82 shadow-[0_22px_80px_rgba(17,17,17,0.08)]"
            delay={index * 90}
          >
            <div className="grid gap-0 lg:grid-cols-2">
              <div
                className={`relative min-h-80 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-7 md:p-8">
                <p className="eyebrow">{service.eyebrow}</p>
                <h2 className="mt-4 text-4xl leading-tight text-balance">
                  {service.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-[color:var(--color-muted)]">
                  {service.description}
                </p>
                <ul className="mt-7 space-y-4">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-base leading-8 text-[var(--color-ink)]"
                    >
                      <span className="mt-3 h-2 w-2 rounded-full bg-[var(--color-gold)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="rounded-[2.5rem] border border-[rgba(17,17,17,0.08)] bg-[linear-gradient(135deg,rgba(246,241,232,0.9),rgba(221,224,212,0.94))] px-6 py-10 shadow-[0_22px_70px_rgba(17,17,17,0.07)] md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">Atendimento premium</p>
            <h2 className="mt-4 text-4xl leading-tight text-balance md:text-5xl">
              Cada projeto é tratado como uma direção de arte exclusiva.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--color-muted)]">
              Trabalhamos com atenção ao estilo do anfitrião, ao local do
              evento e à emoção que o cenário precisa transmitir. O objetivo é
              criar uma experiência visual memorável, elegante e coerente do
              início ao fim.
            </p>
          </div>
          <ButtonLink
            href={buildDirectWhatsAppHref()}
            target="_blank"
            rel="noreferrer"
          >
            Solicitar briefing
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
