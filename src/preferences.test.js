import { describe, expect, it } from "vitest";
import { detectLanguage, detectTheme } from "./preferences.js";

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
});
