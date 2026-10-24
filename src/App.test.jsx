import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, it, vi } from "vitest";
import App from "./App.jsx";
import { Checkout } from "./pages/Checkout.jsx";
import { demoProducts } from "./data.js";
import { loadCatalog, placeOrder } from "./services.js";
vi.mock("./services.js", () => ({
  isDemo: true,
  loadCatalog: vi.fn(),
  placeOrder: vi.fn(),
}));
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  loadCatalog.mockResolvedValue(demoProducts);
  window.scrollTo = vi.fn();
});
it("muestra productos y filtra por nombre", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  await screen.findByRole("heading", { name: "Grogu" });
  fireEvent.change(screen.getByRole("searchbox"), {
    target: { value: "lilo" },
  });
  expect(
    screen.queryByRole("heading", { name: "Grogu" }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Lilo" })).toBeInTheDocument();
});
it("muestra producto inexistente", async () => {
  render(
    <MemoryRouter initialEntries={["/item/missing"]}>
      <App />
    </MemoryRouter>,
  );
  expect(
    await screen.findByRole("heading", { name: "Este producto no existe" }),
  ).toBeInTheDocument();
});
it("permite reintentar la carga", async () => {
  loadCatalog.mockRejectedValueOnce(new Error("offline"));
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(
    await screen.findByRole("button", { name: "Volver a intentar" }),
  );
  expect(
    await screen.findByRole("heading", { name: "Grogu" }),
  ).toBeInTheDocument();
});
function fillCheckout() {
  for (const name of ["Nombre", "Apellido", "Teléfono"])
    fireEvent.change(screen.getByLabelText(name), {
      target: { value: "Demo" },
    });
  for (const name of ["Email", "Repetir email"])
    fireEvent.change(screen.getByLabelText(name), {
      target: { value: "demo@example.com" },
    });
}
it.each([true, false])(
  "confirma solamente cuando el servidor acepta: %s",
  async (success) => {
    const done = vi.fn();
    if (success) placeOrder.mockResolvedValue({ id: "DEMO-1" });
    else placeOrder.mockRejectedValue(new Error("offline"));
    render(
      <Checkout
        rows={[{ id: "3120", quantity: 1 }]}
        total={67.52}
        onSuccess={done}
      />,
    );
    fillCheckout();
    fireEvent.submit(
      screen.getByRole("button", { name: /Simular pedido/ }).closest("form"),
    );
    await waitFor(() => expect(placeOrder).toHaveBeenCalledTimes(1));
    if (success)
      await waitFor(() => expect(done).toHaveBeenCalledWith("DEMO-1"));
    else {
      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Tu carrito se conserva",
      );
      expect(done).not.toHaveBeenCalled();
    }
  },
);
it("bloquea emails diferentes", () => {
  render(
    <Checkout
      rows={[{ id: "a", quantity: 1 }]}
      total={1}
      onSuccess={vi.fn()}
    />,
  );
  fillCheckout();
  fireEvent.change(screen.getByLabelText("Repetir email"), {
    target: { value: "other@example.com" },
  });
  fireEvent.submit(
    screen.getByRole("button", { name: /Simular pedido/ }).closest("form"),
  );
  expect(placeOrder).not.toHaveBeenCalled();
  expect(screen.getByRole("alert")).toHaveTextContent("emails coincidan");
});
it("bloquea solicitudes simultáneas", () => {
  placeOrder.mockReturnValue(new Promise(() => {}));
  render(
    <Checkout
      rows={[{ id: "a", quantity: 1 }]}
      total={1}
      onSuccess={vi.fn()}
    />,
  );
  fillCheckout();
  const form = screen
    .getByRole("button", { name: /Simular pedido/ })
    .closest("form");
  fireEvent.submit(form);
  fireEvent.submit(form);
  expect(placeOrder).toHaveBeenCalledTimes(1);
});
function renderApp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}
it("cambia a inglés, actualiza el documento y recuerda la elección", async () => {
  const first = renderApp();
  await screen.findByRole("heading", { name: "Elegí su próxima aventura" });
  fireEvent.click(screen.getByRole("button", { name: /English/ }));
  expect(
    screen.getByRole("heading", { name: "Pick their next adventure" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /English/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(document.documentElement.lang).toBe("en");
  expect(localStorage.getItem("airkids-lang")).toBe("en");
  first.unmount();
  renderApp("/item/3120");
  expect(
    await screen.findByRole("button", { name: "Add to cart" }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Two-piece set with a Grogu print/),
  ).toBeInTheDocument();
});
it("apaga la luz y guarda el modo noche", async () => {
  renderApp();
  await screen.findByRole("heading", { name: "Grogu" });
  const toggle = screen.getByRole("button", { name: "Modo noche" });
  expect(toggle).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(document.documentElement.dataset.theme).toBe("night");
  expect(localStorage.getItem("airkids-theme")).toBe("night");
});
it("agrega desde el catálogo y actualiza el contador", async () => {
  renderApp();
  fireEvent.click(
    await screen.findByRole("button", { name: "Agregar Grogu al carrito" }),
  );
  expect(
    screen.getByRole("link", { name: /Carrito\s+1\s+producto$/ }),
  ).toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent(
    "Grogu se agregó al carrito",
  );
});
it("ajusta cantidades dentro del carrito", async () => {
  localStorage.setItem(
    "airkids-cart-v1",
    JSON.stringify([{ id: "3120", quantity: 1 }]),
  );
  renderApp("/cart");
  fireEvent.click(
    await screen.findByRole("button", { name: "Sumar una unidad de Grogu" }),
  );
  expect(
    screen.getByRole("link", { name: /Carrito\s+2\s+productos/ }),
  ).toBeInTheDocument();
});
