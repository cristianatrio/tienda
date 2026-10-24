import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Marquee } from "./Marquee.jsx";
import { Reveal } from "./Reveal.jsx";
import { SplitText } from "./SplitText.jsx";

afterEach(() => {
  delete window.IntersectionObserver;
  delete document.documentElement.dataset.motion;
  localStorage.clear();
});

describe("aparición al hacer scroll", () => {
  it("muestra el contenido de inmediato sin IntersectionObserver", () => {
    render(<Reveal>Hola</Reveal>);
    expect(screen.getByText("Hola")).toHaveClass("is-visible");
  });

  it("revela el contenido cuando entra en pantalla", () => {
    let notify;
    window.IntersectionObserver = vi.fn(function (callback) {
      notify = callback;
      this.observe = vi.fn();
      this.unobserve = vi.fn();
    });
    render(<Reveal>Hola</Reveal>);
    const node = screen.getByText("Hola");
    expect(node).not.toHaveClass("is-visible");
    act(() => notify([{ isIntersecting: true, target: node }]));
    expect(node).toHaveClass("is-visible");
  });
});

it("divide un título en palabras sin perder su nombre accesible", () => {
  render(
    <SplitText as="h1" lines={["El día termina.", "La aventura sigue."]} />,
  );
  const heading = screen.getByRole("heading", {
    name: "El día termina. La aventura sigue.",
  });
  expect(heading.querySelectorAll(".word")).toHaveLength(6);
});

it("permite pausar las animaciones continuas y recuerda la elección", () => {
  render(<Marquee />);
  const pause = screen.getByRole("button", { name: "Pausar animaciones" });
  expect(pause).toHaveAttribute("aria-pressed", "false");
  fireEvent.click(pause);
  expect(pause).toHaveAttribute("aria-pressed", "true");
  expect(document.documentElement.dataset.motion).toBe("paused");
  expect(localStorage.getItem("airkids-motion")).toBe("paused");
});
