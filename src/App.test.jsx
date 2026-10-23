import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, it, vi } from "vitest";
import App, { Checkout } from "./App.jsx";
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
