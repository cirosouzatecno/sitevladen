import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  differentials,
  heroSlides,
  portfolioItems,
  serviceItems,
  signaturePillars,
  siteConfig,
} from "@/lib/site-data";
import { createMetadata } from "@/lib/seo";
import { buildDirectWhatsAppHref } from "@/lib/whatsapp";

export const metadata = createMetadata({
  title: `${siteConfig.shortName} | Decoração de eventos de alto padrão em São José do Rio Preto`,
  description:
    "A Le Jardin cria cenários florais, recepções sofisticadas e experiências visuais exclusivas para eventos de alto padrão em São José do Rio Preto.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="pb-20">
      <section className="relative overflow-hidden px-5 pb-[4.5rem] pt-10 md:px-8 md:pb-24 md:pt-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal className="relative z-10">
            <p className="eyebrow">Cenografia floral premium</p>
            <h1 className="mt-5 max-w-2xl text-5xl leading-[0.94] text-balance md:text-7xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[color:var(--color-muted)] md:text-xl">
              Projetos para casamentos, festas de luxo e eventos corporativos
              com estética autoral, atmosfera refinada e direção cuidadosa em
              cada detalhe.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink
                href={buildDirectWhatsAppHref()}
                target="_blank"
                rel="noreferrer"
              >
                Solicitar atendimento
              </ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                Ver portfólio
              </ButtonLink>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                "Composições florais refinadas",
                "Iluminação cênica e ambientação",
                "Atendimento em São José do Rio Preto e região",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.75rem] border border-[rgba(17,17,17,0.08)] bg-white/75 p-4 text-sm leading-7 text-[color:var(--color-muted)] shadow-[0_18px_50px_rgba(17,17,17,0.06)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="relative" delay={120}>
            <div className="hero-grid">
              {heroSlides.map((slide, index) => (
                <article
                  key={slide.title}
                  className={`hero-card hero-card-${index + 1}`}
                >
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    width={1200}
                    height={index === 0 ? 1480 : 920}
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="h-full w-full object-cover"
                  />
                  <div className="hero-card-overlay" />
                  <div className="hero-card-copy">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">
                      Assinatura visual
                    </p>
                    <h2 className="mt-3 text-2xl md:text-3xl">
                      {slide.title}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-white/78">
                      {slide.subtitle}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Essência"
            title="Arte, elegância e exclusividade para celebrar com beleza impecável."
            description="Inspirada em decorações que unem presença floral, sofisticação clássica e acabamento contemporâneo, a Le Jardin desenha cenários pensados para emocionar no olhar e permanecer na lembrança."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {signaturePillars.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              className="rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-white/80 p-6 shadow-[0_18px_60px_rgba(17,17,17,0.06)]"
              delay={index * 90}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-3xl leading-tight">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Serviços"
              title="Projetos desenhados para eventos que pedem presença estética e experiência."
              description="Da decoração completa à assessoria estética, cada serviço é construído para valorizar identidade, atmosfera e acabamento."
            />
          </Reveal>
          <Reveal delay={90}>
            <ButtonLink href="/servicos" variant="secondary">
              Explorar serviços
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {serviceItems.map((service, index) => (
            <Reveal
              key={service.slug}
              className="group overflow-hidden rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-white/82 shadow-[0_20px_70px_rgba(17,17,17,0.07)]"
              delay={index * 80}
            >
              <div className="grid gap-0 md:grid-cols-[0.96fr_1.04fr]">
                <div className="relative min-h-72 overflow-hidden">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    width={960}
                    height={1100}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <p className="eyebrow">{service.eyebrow}</p>
                  <h3 className="mt-4 text-3xl leading-tight">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm leading-7 text-[var(--color-ink)]"
                      >
                        <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-gold)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Portfólio"
              title="Estudos visuais prontos para receber o acervo oficial com a sofisticação que a marca pede."
              description="Enquanto o acervo definitivo está em curadoria, a Le Jardin apresenta um preview editorial da linguagem visual que orienta seus projetos."
            />
          </Reveal>
          <Reveal delay={90}>
            <ButtonLink href="/portfolio" variant="secondary">
              Abrir portfólio completo
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {portfolioItems.slice(0, 4).map((item, index) => (
            <Reveal
              key={item.slug}
              className="overflow-hidden rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-white/82 shadow-[0_18px_70px_rgba(17,17,17,0.06)]"
              delay={index * 90}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={840}
                  height={1120}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.66)] to-transparent" />
                <div className="absolute right-4 bottom-4 left-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-2xl leading-tight text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-7 text-[color:var(--color-muted)]">
                  {item.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Diferenciais"
              title="Uma presença estética comparável a marcas de luxo internacionais."
              description="A proposta não é apenas decorar. É criar uma atmosfera coerente, autoral e fotogênica, em que cada elemento contribui para uma experiência inesquecível."
            />
          </Reveal>
          <div className="grid gap-5">
            {differentials.map((item, index) => (
              <Reveal
                key={item}
                className="rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-[rgba(255,255,255,0.76)] p-6 shadow-[0_18px_60px_rgba(17,17,17,0.05)]"
                delay={index * 70}
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(197,164,109,0.35)] bg-[rgba(197,164,109,0.14)] text-sm font-semibold text-[var(--color-gold-deep)]">
                    0{index + 1}
                  </span>
                  <p className="pt-1 text-base leading-8 text-[var(--color-ink)]">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <Reveal className="rounded-[2.5rem] border border-[rgba(17,17,17,0.08)] bg-[linear-gradient(135deg,rgba(17,17,17,0.94),rgba(63,75,55,0.94))] px-6 py-10 text-white shadow-[0_26px_90px_rgba(17,17,17,0.22)] md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow text-white/60">Instagram future-ready</p>
              <h2 className="mt-4 text-4xl leading-tight text-balance md:text-5xl">
                Espaço preparado para integração com feed social em uma próxima
                fase.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/76">
                Nesta primeira versão, priorizamos performance, narrativa
                institucional e conversão. A área social já está prevista para
                receber curadoria de imagens e bastidores da marca quando o
                acervo digital estiver pronto.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Curadoria visual",
                "Conteúdo em movimento",
                "Bastidores",
                "Novas montagens",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.75rem] border border-white/10 bg-white/10 px-5 py-6 text-sm uppercase tracking-[0.18em] text-white/78"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <TestimonialsSection />

      <section className="section-shell pt-0">
        <Reveal className="rounded-[2.5rem] border border-[rgba(17,17,17,0.08)] bg-white/84 px-6 py-10 shadow-[0_24px_80px_rgba(17,17,17,0.08)] md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Contato</p>
              <h2 className="mt-4 text-4xl leading-tight text-balance md:text-5xl">
                Vamos transformar sua ocasião em uma experiência visual
                inesquecível.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--color-muted)]">
                Se o seu evento pede elegância, cenografia marcante e acabamento
                impecável, a conversa começa aqui.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="/contato">Montar briefing</ButtonLink>
              <ButtonLink
                href={buildDirectWhatsAppHref()}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
              >
                WhatsApp direto
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
