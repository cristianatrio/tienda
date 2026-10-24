import { act, fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MotionProvider } from "../motionPreference.jsx";
import { useDeviceTilt } from "../useDeviceTilt.js";
import { Marquee } from "./Marquee.jsx";
import { MotionSwitch } from "./MotionSwitch.jsx";
import { Reveal } from "./Reveal.jsx";
import { SplitText } from "./SplitText.jsx";

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  delete window.IntersectionObserver;
  delete document.documentElement.dataset.motion;
  window.matchMedia = originalMatchMedia;
  vi.unstubAllGlobals();
  localStorage.clear();
});

function mockMedia(matching) {
  window.matchMedia = (query) => ({
    matches: matching.includes(query),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  });
}

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

describe("preferencia de animaciones", () => {
  it("sigue al sistema: con menos movimiento arranca en modo calmo", () => {
    mockMedia(["(prefers-reduced-motion: reduce)"]);
    render(
      <MotionProvider>
        <MotionSwitch />
      </MotionProvider>,
    );
    expect(screen.getByRole("button", { name: "Animaciones" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(document.documentElement.dataset.motion).toBe("calm");
  });

  it("el visitante las activa y la elección se recuerda", () => {
    mockMedia(["(prefers-reduced-motion: reduce)"]);
    render(
      <MotionProvider>
        <MotionSwitch />
      </MotionProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Animaciones" }));
    expect(screen.getByRole("button", { name: "Animaciones" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(document.documentElement.dataset.motion).toBe("full");
    expect(localStorage.getItem("airkids-motion")).toBe("full");
  });

  it("la pausa de la franja comparte el mismo estado", () => {
    render(
      <MotionProvider>
        <MotionSwitch />
        <Marquee />
      </MotionProvider>,
    );
    const pause = screen.getByRole("button", { name: "Pausar animaciones" });
    expect(pause).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(pause);
    expect(pause).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Animaciones" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(document.documentElement.dataset.motion).toBe("calm");
    expect(localStorage.getItem("airkids-motion")).toBe("calm");
  });
});

describe("inclinación del celular", () => {
  function Tilted() {
    const ref = useRef(null);
    useDeviceTilt(ref);
    return <div ref={ref} data-testid="hero" />;
  }

  function tilt(beta, gamma) {
    act(() => {
      window.dispatchEvent(
        Object.assign(new Event("deviceorientation"), { beta, gamma }),
      );
    });
  }

  it("mueve las variables según el giro desde la posición inicial", () => {
    mockMedia(["(pointer: coarse)"]);
    vi.stubGlobal("requestAnimationFrame", (callback) => {
      callback();
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", () => {});
    document.documentElement.dataset.motion = "full";
    render(<Tilted />);
    const hero = screen.getByTestId("hero");
    tilt(50, 0);
    expect(hero.style.getPropertyValue("--px")).toBe("0.000");
    tilt(60, 50);
    expect(hero.style.getPropertyValue("--px")).toBe("1.000");
    expect(hero.style.getPropertyValue("--py")).toBe("0.400");
  });

  it("se queda quieto en modo calmo o con mouse", () => {
    vi.stubGlobal("requestAnimationFrame", (callback) => {
      callback();
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", () => {});
    document.documentElement.dataset.motion = "calm";
    mockMedia(["(pointer: coarse)"]);
    render(<Tilted />);
    tilt(50, 0);
    tilt(70, 20);
    expect(screen.getByTestId("hero").style.getPropertyValue("--px")).toBe("");
  });
});
