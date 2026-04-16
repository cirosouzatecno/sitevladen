"use client";

import { FormEvent, startTransition, useState } from "react";
import { LeadBrief, siteConfig } from "@/lib/site-data";
import {
  buildLeadMessage,
  buildWhatsAppHref,
  sanitizePhone,
} from "@/lib/whatsapp";

const initialForm: LeadBrief = {
  name: "",
  phone: "",
  eventType: "",
  date: "",
  guests: "",
  message: "",
};

type FormErrors = Partial<Record<keyof LeadBrief, string>>;

export function ContactForm() {
  const [form, setForm] = useState<LeadBrief>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [generatedHref, setGeneratedHref] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  function validate(values: LeadBrief): FormErrors {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Informe seu nome para iniciarmos o atendimento.";
    }

    if (!sanitizePhone(values.phone)) {
      nextErrors.phone = "Informe um WhatsApp válido.";
    }

    if (!values.eventType) {
      nextErrors.eventType = "Selecione o tipo de evento.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Conte um pouco sobre o estilo desejado.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(form);

    if (Object.keys(nextErrors).length > 0) {
      startTransition(() => {
        setErrors(nextErrors);
        setStatusMessage(
          "Revise os campos destacados para seguir com o briefing.",
        );
      });
      return;
    }

    const cleanBrief = {
      ...form,
      phone: sanitizePhone(form.phone),
    };
    const href = buildWhatsAppHref(buildLeadMessage(cleanBrief));

    startTransition(() => {
      setErrors({});
      setGeneratedHref(href);
      setStatusMessage(
        "Briefing pronto. Abrindo seu atendimento no WhatsApp.",
      );
    });

    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-white/85 p-6 shadow-[0_22px_80px_rgba(17,17,17,0.08)] md:p-8">
      <form
        className="grid gap-5 md:grid-cols-2"
        onSubmit={handleSubmit}
        noValidate
        data-testid="contact-form"
      >
        <div className="md:col-span-1">
          <label className="form-label" htmlFor="name">
            Nome
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            className="form-input"
            placeholder="Seu nome"
          />
          {errors.name ? <p className="form-error">{errors.name}</p> : null}
        </div>

        <div className="md:col-span-1">
          <label className="form-label" htmlFor="phone">
            WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(event) =>
              setForm((current) => ({ ...current, phone: event.target.value }))
            }
            className="form-input"
            placeholder="(17) 99999-9999"
          />
          {errors.phone ? <p className="form-error">{errors.phone}</p> : null}
        </div>

        <div className="md:col-span-1">
          <label className="form-label" htmlFor="eventType">
            Tipo de evento
          </label>
          <select
            id="eventType"
            name="eventType"
            value={form.eventType}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                eventType: event.target.value,
              }))
            }
            className="form-input"
          >
            <option value="">Selecione</option>
            {siteConfig.leadEventTypes.map((eventType) => (
              <option key={eventType} value={eventType}>
                {eventType}
              </option>
            ))}
          </select>
          {errors.eventType ? (
            <p className="form-error">{errors.eventType}</p>
          ) : null}
        </div>

        <div className="md:col-span-1">
          <label className="form-label" htmlFor="date">
            Data do evento
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={(event) =>
              setForm((current) => ({ ...current, date: event.target.value }))
            }
            className="form-input"
          />
        </div>

        <div className="md:col-span-1">
          <label className="form-label" htmlFor="guests">
            Convidados estimados
          </label>
          <input
            id="guests"
            name="guests"
            inputMode="numeric"
            value={form.guests}
            onChange={(event) =>
              setForm((current) => ({ ...current, guests: event.target.value }))
            }
            className="form-input"
            placeholder="Ex: 180"
          />
        </div>

        <div className="md:col-span-2">
          <label className="form-label" htmlFor="message">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={(event) =>
              setForm((current) => ({ ...current, message: event.target.value }))
            }
            className="form-input min-h-40 resize-y"
            placeholder="Conte o estilo desejado, local, horário e referências que gostaria de compartilhar."
          />
          {errors.message ? (
            <p className="form-error">{errors.message}</p>
          ) : null}
        </div>

        <div className="md:col-span-2 flex flex-col gap-4 border-t border-[rgba(17,17,17,0.08)] pt-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-olive)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_20px_40px_rgba(63,75,55,0.22)] transition hover:bg-[var(--color-olive-strong)]"
            >
              Enviar briefing pelo WhatsApp
              <span aria-hidden="true">↗</span>
            </button>
            <a
              href={buildWhatsAppHref(siteConfig.whatsappBaseMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(17,17,17,0.08)] bg-[rgba(246,241,232,0.8)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)] transition hover:bg-white"
            >
              Falar agora
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="text-sm leading-7 text-[color:var(--color-muted)]">
            Atendimento direto via WhatsApp para um processo rápido, elegante e
            personalizado.
          </p>
          {statusMessage ? (
            <p
              className="text-sm font-medium text-[var(--color-olive)]"
              data-testid="contact-status"
            >
              {statusMessage}
            </p>
          ) : null}
          {generatedHref ? (
            <a
              href={generatedHref}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[var(--color-gold-deep)] underline underline-offset-4"
              data-testid="generated-whatsapp-link"
            >
              Abrir novamente no WhatsApp
            </a>
          ) : null}
        </div>
      </form>
    </div>
  );
}
