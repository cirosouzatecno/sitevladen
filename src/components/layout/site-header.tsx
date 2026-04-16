"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { buildDirectWhatsAppHref } from "@/lib/whatsapp";
import { navigationItems, siteConfig } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useEffectEvent(() => {
    setIsScrolled(window.scrollY > 24);
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = pathname !== "/" || isScrolled || isMenuOpen;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition duration-500 ${
        isSolid
          ? "border-[rgba(17,17,17,0.08)] bg-[rgba(246,241,232,0.86)] shadow-[0_18px_60px_rgba(17,17,17,0.08)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="group inline-flex flex-col">
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[0.04em] text-[var(--color-olive)] transition group-hover:text-[var(--color-gold)]">
            Le Jardin
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[color:var(--color-muted)]">
            Eventos e Decorações
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Navegação principal"
        >
          {navigationItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold tracking-[0.18em] uppercase transition ${
                  active
                    ? "text-[var(--color-olive)]"
                    : "text-[color:var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink
            href={buildDirectWhatsAppHref()}
            target="_blank"
            rel="noreferrer"
            className="px-5"
          >
            WhatsApp
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(17,17,17,0.08)] bg-white/70 text-[var(--color-ink)] lg:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-[rgba(17,17,17,0.08)] bg-[rgba(246,241,232,0.96)] px-5 py-5 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3" aria-label="Menu mobile">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-3xl border border-[rgba(17,17,17,0.08)] bg-white/80 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)]"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href={buildDirectWhatsAppHref()}
              target="_blank"
              rel="noreferrer"
              className="mt-2"
            >
              Solicitar atendimento
            </ButtonLink>
            <p className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
              Atendimento em {siteConfig.city} e região para projetos sociais e
              corporativos de alto padrão.
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
