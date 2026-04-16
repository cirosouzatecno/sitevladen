import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { buildDirectWhatsAppHref } from "@/lib/whatsapp";
import { navigationItems, siteConfig } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(17,17,17,0.08)] bg-[rgba(17,17,17,0.92)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_0.7fr] md:px-8">
        <div className="space-y-5">
          <p className="eyebrow text-[color:rgba(255,255,255,0.65)]">Le Jardin</p>
          <h2 className="max-w-2xl text-4xl leading-tight text-balance md:text-5xl">
            Design que encanta, detalhes que transformam e cenários que
            permanecem na memória.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[color:rgba(255,255,255,0.72)]">
            Atuamos em {siteConfig.city} e região com decoração floral refinada,
            cenografia impactante e direção estética para eventos de alto padrão.
          </p>
          <ButtonLink
            href={buildDirectWhatsAppHref()}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="border-white/20 bg-white/10 text-white hover:bg-white/15"
          >
            Conversar pelo WhatsApp
          </ButtonLink>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:rgba(255,255,255,0.6)]">
              Navegação
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm uppercase tracking-[0.18em] text-white/80 transition hover:text-[var(--color-gold)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:rgba(255,255,255,0.6)]">
              Atendimento
            </p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-white/80">
              <p>
                {siteConfig.city} • {siteConfig.region}
              </p>
              <p>{siteConfig.whatsappDisplay}</p>
              <p>
                Projetos sociais, corporativos e experiências autorais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
