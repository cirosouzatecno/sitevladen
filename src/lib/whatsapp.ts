import { LeadBrief, siteConfig } from "@/lib/site-data";

export function sanitizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function buildLeadMessage(brief: LeadBrief) {
  const lines = [
    "Olá, Le Jardin. Gostaria de solicitar um atendimento para um projeto de decoração.",
    "",
    `Nome: ${brief.name}`,
    `WhatsApp: ${brief.phone}`,
    `Tipo de evento: ${brief.eventType}`,
    brief.date ? `Data desejada: ${brief.date}` : null,
    brief.guests ? `Convidados estimados: ${brief.guests}` : null,
    "",
    "Mensagem:",
    brief.message,
  ].filter(Boolean);

  return lines.join("\n");
}

export function buildWhatsAppHref(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildDirectWhatsAppHref() {
  return buildWhatsAppHref(siteConfig.whatsappBaseMessage);
}
