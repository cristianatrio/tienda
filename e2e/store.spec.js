import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("catálogo, carrito persistente, checkout y accesibilidad", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Grogu" })).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("heading", { name: "Grogu" }).getByRole("link").click();
  await page.getByRole("button", { name: "Agregar al carrito" }).click();
  await page.getByRole("link", { name: "Ver mi carrito" }).click();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Mi carrito" })).toBeVisible();
  for (const label of ["Nombre", "Apellido", "Teléfono"])
    await page.getByLabel(label, { exact: true }).fill("Demo");
  for (const label of ["Email", "Repetir email"])
    await page.getByLabel(label, { exact: true }).fill("demo@example.com");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("button", { name: /Simular pedido/ }).click();
  await expect(
    page.getByRole("heading", { name: "¡Demo completada!" }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText("DEMO-");
});
test("navegación y pantallas inexistentes", async ({ page }) => {
  await page.goto("/categories/Cortos");
  await expect(page.getByRole("heading", { name: "Grogu" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Lilo" })).toHaveCount(0);
  await page.goto("/item/no-existe");
  await expect(
    page.getByRole("heading", { name: "Este producto no existe" }),
  ).toBeVisible();
  await page.goto("/no-existe");
  await expect(
    page.getByRole("heading", { name: "Esta página se fue a dormir" }),
  ).toBeVisible();
});
