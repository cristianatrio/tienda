import { describe, expect, it } from "vitest";
import { detectLanguage, detectMotion, detectTheme } from "./preferences.js";

describe("preferencias del visitante", () => {
  it("usa el idioma guardado antes que el del navegador", () => {
    expect(detectLanguage("en", ["es-AR"])).toBe("en");
    expect(detectLanguage("es", ["en-US"])).toBe("es");
  });

  it("detecta español y usa inglés para cualquier otro idioma", () => {
    expect(detectLanguage(null, ["es-AR", "en"])).toBe("es");
    expect(detectLanguage(null, ["en-US"])).toBe("en");
    expect(detectLanguage(null, ["fr-FR"])).toBe("en");
    expect(detectLanguage("klingon", [])).toBe("es");
  });

  it("respeta el tema guardado y luego la preferencia del sistema", () => {
    expect(detectTheme("day", true)).toBe("day");
    expect(detectTheme("night", false)).toBe("night");
    expect(detectTheme(null, true)).toBe("night");
    expect(detectTheme("sepia", false)).toBe("day");
  });

  it("usa la elección de animaciones guardada y si no, la del sistema", () => {
    expect(detectMotion("full", true)).toBe("full");
    expect(detectMotion("calm", false)).toBe("calm");
    expect(detectMotion(null, false)).toBe("full");
    expect(detectMotion(null, true)).toBe("calm");
  });

  it("entiende la pausa guardada por la versión anterior", () => {
    expect(detectMotion("paused", false)).toBe("calm");
    expect(detectMotion("running", true)).toBe("full");
  });
});
