import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-data";
import { buildDirectWhatsAppHref } from "@/lib/whatsapp";

export const metadata = createMetadata({
  title: `Portfólio | ${siteConfig.shortName}`,
  description:
    "Explore o portfólio editorial da Le Jardin Eventos e Decorações, com linguagem visual sofisticada para casamentos, festas de luxo, eventos corporativos e decorações temáticas.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="section-shell pb-20 pt-12 md:pt-[4.5rem]">
      <Reveal>
        <SectionHeading
          eyebrow="Portfólio"
          title="Acervo em atualização, linguagem visual pronta."
          description="A estrutura do portfólio já foi desenhada para receber o acervo oficial da marca. Enquanto isso, apresentamos estudos visuais e direcionamentos estéticos que traduzem a assinatura da Le Jardin."
        />
      </Reveal>

      <Reveal
        className="mt-8 rounded-[2rem] border border-[rgba(197,164,109,0.32)] bg-[rgba(197,164,109,0.12)] px-5 py-4 text-sm leading-7 text-[var(--color-ink)]"
        delay={80}
      >
        <strong className="font-semibold">Status do acervo:</strong> imagens
        finais em curadoria. Os cards abaixo funcionam como preview editorial da
        direção de arte da marca, sem simular eventos reais.
      </Reveal>

      <Reveal className="mt-10" delay={120}>
        <PortfolioGallery />
      </Reveal>

      <Reveal
        className="mt-14 rounded-[2.5rem] border border-[rgba(17,17,17,0.08)] bg-white/84 px-6 py-10 shadow-[0_22px_70px_rgba(17,17,17,0.07)] md:px-10 md:py-12"
        delay={140}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">Projeto sob medida</p>
            <h2 className="mt-4 text-4xl leading-tight text-balance md:text-5xl">
              Quer construir um cenário exclusivo para o seu evento?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--color-muted)]">
              Compartilhe a ocasião, a data e a atmosfera desejada. A Le Jardin
              desenha uma proposta visual coerente com o seu momento e o seu
              nível de exigência.
            </p>
          </div>
          <ButtonLink
            href={buildDirectWhatsAppHref()}
            target="_blank"
            rel="noreferrer"
          >
            Solicitar proposta
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
