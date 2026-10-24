import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const noViolations = async (page) =>
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

test("catálogo, carrito persistente, checkout y accesibilidad", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Grogu" })).toBeVisible();
  await noViolations(page);
  await page.getByRole("heading", { name: "Grogu" }).getByRole("link").click();
  await page.getByRole("button", { name: "Agregar al carrito" }).click();
  await page.getByRole("link", { name: "Ver mi carrito" }).click();
  await page.reload();
  await expect(page.getByRole("heading", { name: "Mi carrito" })).toBeVisible();
  for (const label of ["Nombre", "Apellido", "Teléfono"])
    await page.getByLabel(label, { exact: true }).fill("Demo");
  for (const label of ["Email", "Repetir email"])
    await page.getByLabel(label, { exact: true }).fill("demo@example.com");
  await noViolations(page);
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

test("cambia a inglés desde el encabezado y lo conserva al recargar", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("group", { name: "Idioma" })
    .getByRole("button", { name: /^(English|EN)$/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "Pick their next adventure" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle("AirKids: pajamas for little dreamers");
  await page.getByRole("button", { name: "Add Lilo to cart" }).click();
  await page.reload();
  await expect(
    page.getByRole("link", { name: /^Cart\s+1\s+item$/ }),
  ).toBeVisible();
  await expect(page.getByText("ARS 67.52").first()).toBeVisible();
  await noViolations(page);
});

test("modo noche accesible y sin desborde horizontal", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Apagá la luz" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night");
  await expect(
    page.getByRole("button", { name: "Modo noche" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night");
  await page.getByRole("button", { name: "Agregar Grogu al carrito" }).click();
  for (const path of ["/", "/item/3122", "/cart", "/nosotros"]) {
    await page.goto(path);
    await page.getByRole("main").waitFor();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, path).toBeLessThanOrEqual(0);
    await noViolations(page);
  }
});

test.describe("visitante con navegador en inglés", () => {
  test.use({ locale: "en-US", colorScheme: "dark" });
  test("detecta idioma y tema del sistema", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "night");
    await expect(
      page.getByRole("heading", {
        name: "The day is over. The adventure isn’t.",
      }),
    ).toBeVisible();
  });
});

test.describe("visitante que acepta animaciones", () => {
  test.use({ reducedMotion: "no-preference" });
  test("revela textos al leer, vuela al carrito y permite pausar", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "El día termina. La aventura sigue." }),
    ).toHaveClass(/is-visible/);
    const story = page.getByRole("heading", {
      name: "Menos pantallas. Más historias.",
    });
    await expect(story).not.toHaveClass(/is-visible/);
    await story.scrollIntoViewIfNeeded();
    await expect(story).toHaveClass(/is-visible/);

    await page
      .getByRole("button", { name: "Agregar Grogu al carrito" })
      .click();
    await expect(page.locator(".fly-clone")).toHaveCount(1);
    await expect(page.locator(".fly-clone")).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: /^Carrito\s+1\s+producto$/ }),
    ).toBeVisible();

    const pause = page.getByRole("button", { name: "Pausar animaciones" });
    await pause.click();
    await expect(pause).toHaveAttribute("aria-pressed", "true");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
    // Once the entrance has played, the animated page must pass axe too.
    await page.waitForFunction(() =>
      document
        .getAnimations()
        .every(
          (a) =>
            a.playState !== "running" ||
            !(a.timeline instanceof DocumentTimeline),
        ),
    );
    await noViolations(page);

    await page.getByRole("heading", { name: "Lilo" }).getByRole("link").click();
    await expect(page).toHaveURL(/\/item\/3121$/);
    await expect(
      page.getByRole("heading", { name: "Lilo", level: 1 }),
    ).toBeVisible();
  });
});
