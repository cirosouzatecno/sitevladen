"use client";

import Image from "next/image";
import {
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useState,
  useTransition,
} from "react";
import { PortfolioItem, portfolioItems } from "@/lib/site-data";

const categories = [
  "Todos",
  "Casamentos",
  "Festas de luxo",
  "Eventos corporativos",
  "Decorações temáticas",
] as const;

export function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Todos");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isPending, startTransition] = useTransition();
  const deferredCategory = useDeferredValue(activeCategory);

  const filteredItems =
    deferredCategory === "Todos"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === deferredCategory);

  const handleEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSelectedItem(null);
    }
  });

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedItem]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3" aria-busy={isPending}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            data-testid={`filter-${category.toLowerCase().replaceAll(" ", "-")}`}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
              activeCategory === category
                ? "border-[var(--color-gold)] bg-[rgba(197,164,109,0.16)] text-[var(--color-ink)]"
                : "border-[rgba(17,17,17,0.08)] bg-white/70 text-[color:var(--color-muted)] hover:border-[rgba(17,17,17,0.18)] hover:text-[var(--color-ink)]"
            }`}
            onClick={() =>
              startTransition(() => {
                setActiveCategory(category);
              })
            }
          >
            {category}
          </button>
        ))}
      </div>

      <div
        className="mt-10 columns-1 gap-5 md:columns-2 xl:columns-3"
        data-testid="portfolio-grid"
      >
        {filteredItems.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            className="group mb-5 w-full break-inside-avoid overflow-hidden rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-white/80 text-left shadow-[0_22px_70px_rgba(17,17,17,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(17,17,17,0.14)]"
            onClick={() => setSelectedItem(item)}
            data-testid={`portfolio-card-${item.slug}`}
          >
            <div className="relative overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                width={900}
                height={index % 2 === 0 ? 1120 : 900}
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.7)] via-transparent to-transparent opacity-90" />
              <div className="absolute right-5 bottom-5 left-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75">
                  {item.category}
                </p>
                <h3 className="mt-2 text-2xl leading-tight text-white">
                  {item.title}
                </h3>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <p className="text-sm leading-7 text-[color:var(--color-muted)]">
                {item.description}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {item.palette.map((tone) => (
                  <span
                    key={`${item.slug}-${tone}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(17,17,17,0.08)] bg-[rgba(246,241,232,0.8)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink)]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full border border-black/10"
                      style={{ backgroundColor: tone }}
                    />
                    {tone}
                  </span>
                ))}
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-deep)]">
                {item.note}
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedItem ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(17,17,17,0.72)] px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          data-testid="portfolio-lightbox"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-h-full w-full max-w-5xl overflow-auto rounded-[2rem] border border-white/10 bg-[rgba(15,18,15,0.94)] p-5 text-white shadow-[0_30px_120px_rgba(0,0,0,0.45)] md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fechar modal"
              className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white"
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
                <Image
                  src={selectedItem.imageSrc}
                  alt={selectedItem.imageAlt}
                  width={1200}
                  height={1400}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[rgba(255,255,255,0.62)]">
                  {selectedItem.category}
                </p>
                <h3 className="mt-4 text-4xl leading-tight text-balance">
                  {selectedItem.title}
                </h3>
                <p className="mt-5 text-base leading-8 text-[rgba(255,255,255,0.78)]">
                  {selectedItem.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {selectedItem.palette.map((tone) => (
                    <span
                      key={`${selectedItem.slug}-modal-${tone}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90"
                    >
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: tone }}
                      />
                      {tone}
                    </span>
                  ))}
                </div>
                <p className="mt-8 rounded-[1.5rem] border border-[rgba(197,164,109,0.26)] bg-[rgba(197,164,109,0.08)] px-5 py-4 text-sm leading-7 text-[rgba(255,255,255,0.84)]">
                  {selectedItem.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
