import { expect, test } from "@playwright/test";

test("mobile menu opens and navigates to portfolio", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Abrir menu" }).click();
  const mobileMenu = page.getByLabel("Menu mobile");
  await expect(mobileMenu.getByRole("link", { name: "Portfólio" })).toBeVisible();

  await mobileMenu.getByRole("link", { name: "Portfólio" }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await expect(page.getByText("Acervo em atualização, linguagem visual pronta.")).toBeVisible();
});

test("portfolio filters and lightbox work", async ({ page }) => {
  await page.goto("/portfolio");

  await page.getByTestId("filter-festas-de-luxo").click();
  await expect(page.getByTestId("portfolio-card-recepcao-dourada")).toBeVisible();
  await expect(page.getByTestId("portfolio-card-floral-classico")).toHaveCount(0);

  await page.getByTestId("portfolio-card-recepcao-dourada").click();
  await expect(page.getByTestId("portfolio-lightbox")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("portfolio-lightbox")).toHaveCount(0);
});

test("contact form generates a WhatsApp link", async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (url?: string | URL | undefined) => {
      // @ts-expect-error test helper
      window.__lastOpened = url?.toString();
      return null;
    };
  });

  await page.goto("/contato");

  await page.getByLabel("Nome").fill("Marina Prado");
  await page.getByLabel("WhatsApp").fill("(17) 99999-9999");
  await page.getByLabel("Tipo de evento").selectOption("Casamento");
  await page.getByLabel("Data do evento").fill("2026-12-12");
  await page.getByLabel("Convidados estimados").fill("180");
  await page
    .getByLabel("Mensagem")
    .fill("Desejo uma cerimônia clássica com floral claro e iluminação quente.");

  await page
    .getByRole("button", { name: /Enviar briefing pelo WhatsApp/i })
    .click();

  await expect(page.getByTestId("contact-status")).toContainText("Briefing pronto");
  const href = await page.getByTestId("generated-whatsapp-link").getAttribute("href");
  expect(href).toContain("wa.me");
  expect(href).toContain(encodeURIComponent("Marina Prado"));

  const lastOpened = await page.evaluate(() => {
    // @ts-expect-error test helper
    return window.__lastOpened as string | undefined;
  });
  expect(lastOpened).toContain("wa.me");
  expect(lastOpened).toContain(encodeURIComponent("Casamento"));
});
