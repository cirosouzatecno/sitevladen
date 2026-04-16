import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig, testimonials } from "@/lib/site-data";

export function TestimonialsSection() {
  if (!siteConfig.testimonialsEnabled) {
    return null;
  }

  return (
    <section className="section-shell">
      <Reveal>
        <SectionHeading
          eyebrow="Depoimentos"
          title="Confiança construída em cada detalhe do projeto."
          description="Seção preparada para receber relatos aprovados de clientes da marca."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal
            key={`${testimonial.eventType}-${index}`}
            className="rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-white/82 p-6 shadow-[0_20px_60px_rgba(17,17,17,0.06)]"
            delay={index * 90}
          >
            <p className="text-2xl leading-10 text-[var(--color-ink)]">
              “{testimonial.quote}”
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-deep)]">
              {testimonial.name}
            </p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--color-muted)]">
              {testimonial.role}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
