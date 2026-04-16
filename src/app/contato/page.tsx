import { ContactForm } from "@/components/contact/contact-form";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-data";
import { buildDirectWhatsAppHref } from "@/lib/whatsapp";

export const metadata = createMetadata({
  title: `Contato | ${siteConfig.shortName}`,
  description:
    "Entre em contato com a Le Jardin Eventos e Decorações e envie seu briefing pelo WhatsApp para solicitar um projeto premium em São José do Rio Preto.",
  path: "/contato",
});

export default function ContactPage() {
  return (
    <div className="section-shell space-y-12 pb-20 pt-12 md:pt-[4.5rem]">
      <Reveal>
        <SectionHeading
          eyebrow="Contato"
          title="Briefings elegantes começam com conversas objetivas."
          description="Preencha as informações essenciais do seu evento e siga diretamente para o WhatsApp com uma mensagem pronta. Assim, o atendimento começa de forma rápida, clara e personalizada."
        />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Reveal delay={90}>
          <ContactForm />
        </Reveal>

        <div className="grid gap-5">
          <Reveal
            className="rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-[rgba(17,17,17,0.93)] p-7 text-white shadow-[0_24px_80px_rgba(17,17,17,0.18)]"
            delay={120}
          >
            <p className="eyebrow text-white/60">WhatsApp direto</p>
            <h2 className="mt-4 text-4xl leading-tight">
              Atendimento principal
            </h2>
            <p className="mt-5 text-base leading-8 text-white/76">
              Para orçamentos, disponibilidade e alinhamento inicial de
              referências, o WhatsApp é o canal prioritário da Le Jardin.
            </p>
            <div className="mt-7 space-y-3 text-sm leading-7 text-white/84">
              <p>{siteConfig.whatsappDisplay}</p>
              <p>
                {siteConfig.city} • {siteConfig.region}
              </p>
              <p>
                Atendimento para casamentos, eventos sociais, corporativos e
                projetos especiais.
              </p>
            </div>
            <ButtonLink
              href={buildDirectWhatsAppHref()}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="mt-8 border-white/14 bg-white/10 text-white hover:bg-white/14"
            >
              Abrir WhatsApp
            </ButtonLink>
          </Reveal>

          <Reveal
            className="rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-white/84 p-7 shadow-[0_22px_70px_rgba(17,17,17,0.07)]"
            delay={180}
          >
            <p className="eyebrow">O que compartilhar</p>
            <h2 className="mt-4 text-3xl leading-tight">
              Quanto mais contexto, mais preciso o conceito.
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                "Data ou período desejado",
                "Cidade e local do evento",
                "Número estimado de convidados",
                "Estilo visual, cores e referências",
                "Objetivo do ambiente e clima desejado",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-7 text-[var(--color-ink)]"
                >
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-gold)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
