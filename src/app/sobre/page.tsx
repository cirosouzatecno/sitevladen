import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { createMetadata } from "@/lib/seo";
import { processSteps, signaturePillars, siteConfig } from "@/lib/site-data";
import { buildDirectWhatsAppHref } from "@/lib/whatsapp";

export const metadata = createMetadata({
  title: `Sobre a ${siteConfig.shortName} | Filosofia, estética e processo`,
  description:
    "Conheça a filosofia da Le Jardin Eventos e Decorações, sua assinatura estética premium e o processo de criação de eventos de alto padrão.",
  path: "/sobre",
});

export default function AboutPage() {
  return (
    <div className="section-shell space-y-16 pb-20 pt-12 md:pt-[4.5rem]">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Sobre a marca</p>
            <h1 className="mt-5 text-5xl leading-[0.96] text-balance md:text-7xl">
              Uma casa criativa que traduz elegância em atmosfera.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[color:var(--color-muted)]">
              Inspirada em uma tradição de decoração refinada, a Le Jardin
              nasce para criar cenários com alma: florais exuberantes,
              iluminação sensível e composições que revelam exclusividade sem
              excessos.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[rgba(17,17,17,0.08)] bg-white/80 shadow-[0_26px_90px_rgba(17,17,17,0.08)]">
            <Image
              src="/media/about-signature.svg"
              alt="Composição abstrata de flores, arquitetura e iluminação inspirada na assinatura estética da Le Jardin."
              width={1280}
              height={1200}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <Reveal>
          <SectionHeading
            eyebrow="Narrativa"
            title="Beleza pensada como experiência, não apenas como cenário."
            description="Nossa linguagem visual se inspira no encontro entre elegância clássica, frescor botânico e acabamento contemporâneo. O resultado são eventos que encantam no primeiro impacto e continuam surpreendendo nos detalhes."
          />
        </Reveal>
        <div className="grid gap-5">
          {signaturePillars.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              className="rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-white/78 p-6 shadow-[0_18px_60px_rgba(17,17,17,0.05)]"
              delay={index * 80}
            >
              <h2 className="text-3xl leading-tight">{pillar.title}</h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--color-muted)]">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <section>
        <Reveal>
          <SectionHeading
            eyebrow="Processo"
            title="Do conceito à montagem, cada etapa preserva intenção estética e excelência."
            description="Organizamos o trabalho para que a beleza final seja consequência de um processo claro, rigoroso e profundamente personalizado."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.title}
              className="rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_20px_60px_rgba(17,17,17,0.06)]"
              delay={index * 90}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold-deep)]">
                Etapa 0{index + 1}
              </p>
              <h3 className="mt-4 text-3xl leading-tight">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal className="rounded-[2.5rem] border border-[rgba(17,17,17,0.08)] bg-white/84 px-6 py-10 shadow-[0_22px_70px_rgba(17,17,17,0.07)] md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Exclusividade</p>
              <h2 className="mt-4 text-4xl leading-tight text-balance md:text-5xl">
                Projetos desenhados para clientes que valorizam sofisticação,
                identidade e acabamento impecável.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--color-muted)]">
                A Le Jardin atende eventos em {siteConfig.city} e região com um
                olhar curatorial que equilibra emoção, arquitetura e beleza
                sensível.
              </p>
            </div>
            <ButtonLink
              href={buildDirectWhatsAppHref()}
              target="_blank"
              rel="noreferrer"
            >
              Iniciar conversa
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
