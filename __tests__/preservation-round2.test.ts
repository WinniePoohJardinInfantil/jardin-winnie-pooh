/**
 * Preservation Property Tests — Round 2
 *
 * These tests assert the BASELINE behavior that must be preserved after fixes.
 * All tests MUST PASS on the current (unfixed) code.
 *
 * Uses static source-code analysis (reading files as strings) — same approach
 * as bug-conditions-round2.test.ts — to avoid complex mocking requirements for
 * Next.js, Framer Motion, etc.
 *
 * Validates: Requirements 3.1–3.13
 */

import { describe, test, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

// Helper to read source files
function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf-8");
}

// ---------------------------------------------------------------------------
// P1: Navbar.tsx — core brand and navigation elements are present
// ---------------------------------------------------------------------------
describe("Preservation - Navbar (P1)", () => {
  test("P1: Navbar has Winnie Pooh text, logo, WhatsApp button, mobile menu toggle, and nav links array", () => {
    const source = readSource("components/Navbar.tsx");

    // Brand text
    expect(source).toContain("Winnie Pooh");

    // Logo image reference
    expect(source).toContain("/logos/jardin-infantil.png");

    // WhatsApp button — links to wa.me
    expect(source).toContain("wa.me");

    // Mobile menu toggle button (nav-toggle class)
    expect(source).toContain("nav-toggle");

    // Nav links array is defined
    expect(source).toMatch(/const links\s*=/);
    // At least one link entry is present
    expect(source).toMatch(/label:\s*["']Inicio["']/);
  });
});

// ---------------------------------------------------------------------------
// P2: Nosotros.tsx — accordion / mision structure is present
// ---------------------------------------------------------------------------
describe("Preservation - Nosotros accordion (P2)", () => {
  test("P2: Nosotros has misionPuntos array, AnimatePresence, expandedIndex state, and accordion onClick logic", () => {
    const source = readSource("components/Nosotros.tsx");

    // misionPuntos array is defined
    expect(source).toContain("misionPuntos");

    // AnimatePresence is imported and used
    expect(source).toContain("AnimatePresence");

    // expandedIndex state drives accordion open/close
    expect(source).toContain("expandedIndex");

    // Accordion items use onClick to toggle
    expect(source).toMatch(/onClick.*setExpandedIndex|setExpandedIndex.*onClick/s);
  });
});

// ---------------------------------------------------------------------------
// P3: Nosotros.tsx — Calendario content is present
// ---------------------------------------------------------------------------
describe("Preservation - Nosotros Calendario (P3)", () => {
  test("P3: Nosotros Calendario has Mañana, Tarde, Completo, schedule time strings, and Calendario heading", () => {
    const source = readSource("components/Nosotros.tsx");

    // Schedule jornada labels
    expect(source).toContain("Mañana");
    expect(source).toContain("Tarde");
    expect(source).toContain("Completo");

    // Schedule time strings (8am, 7am, 5pm)
    expect(source).toMatch(/8am/);
    expect(source).toMatch(/7am/);
    expect(source).toMatch(/5pm/);

    // Calendario section heading
    expect(source).toContain("Calendario");
  });
});

// ---------------------------------------------------------------------------
// P4: Sedes.tsx — card content elements are present
// ---------------------------------------------------------------------------
describe("Preservation - Sedes card content (P4)", () => {
  test("P4: Sedes has <Image, AuroraText, Winnie Pooh, Check, niveles, Conocer Sede, and /sedes/ link", () => {
    const source = readSource("components/Sedes.tsx");

    // Logo image element
    expect(source).toContain("<Image");

    // AuroraText used for brand name
    expect(source).toContain("AuroraText");

    // Brand name text
    expect(source).toContain("Winnie Pooh");

    // Check icon for niveles list
    expect(source).toContain("Check");

    // niveles array is iterated
    expect(source).toContain("niveles");

    // CTA button text
    expect(source).toContain("Conocer Sede");

    // Link to sede detail page
    expect(source).toContain("/sedes/");
  });
});

// ---------------------------------------------------------------------------
// P5: Sedes.tsx — background image file is still sedes-bg.jpg
// ---------------------------------------------------------------------------
describe("Preservation - Sedes background image (P5)", () => {
  test("P5: Sedes still references sedes-bg.jpg as the background image", () => {
    const source = readSource("components/Sedes.tsx");

    // The same background image file must still be referenced
    expect(source).toContain("sedes-bg.jpg");
  });
});

// ---------------------------------------------------------------------------
// P6: Servicios.tsx — key UI components and section heading are present
// ---------------------------------------------------------------------------
describe("Preservation - Servicios components (P6)", () => {
  test("P6: Servicios has NeonGradientCard, Lens, SparklesText, Experiencias que acompañan, and hidden xl:block class", () => {
    const source = readSource("components/Servicios.tsx");

    // NeonGradientCard is used for service cards
    expect(source).toContain("NeonGradientCard");

    // Lens component wraps card images
    expect(source).toContain("Lens");

    // SparklesText is used in the section header
    expect(source).toContain("SparklesText");

    // Section heading text
    expect(source).toContain("Experiencias que acompañan");

    // Corner character divs use hidden xl:block responsive class
    expect(source).toContain("hidden xl:block");
  });
});

// ---------------------------------------------------------------------------
// P7: Servicios.tsx — servicios array has exactly 12 entries with all titles
// ---------------------------------------------------------------------------
describe("Preservation - Servicios array (P7)", () => {
  test("P7: Servicios array has 12 entries — all 12 titulo strings are present in source", () => {
    const source = readSource("components/Servicios.tsx");

    const expectedTitles = [
      "Programa M.E.N",
      "Proyectos Mensuales",
      "Bebé Políglota",
      "Sensibilización Musical",
      "Iniciación al Inglés",
      "Gimnasia Infantil",
      "Fonoaudiología",
      "Salidas Pedagógicas",
      "Natación",
      "Pintura",
      "Baile",
      "Ahorro Escolar",
    ];

    for (const titulo of expectedTitles) {
      expect(source, `servicios array must contain titulo: "${titulo}"`).toContain(titulo);
    }

    // Verify the servicios array is defined and has 12 entries by counting titulo occurrences
    const tituloMatches = source.match(/titulo:\s*["'][^"']+["']/g);
    expect(tituloMatches).toBeTruthy();
    expect(tituloMatches!.length).toBe(12);
  });
});

// ---------------------------------------------------------------------------
// P8: Contacto.tsx — right column content is present
// ---------------------------------------------------------------------------
describe("Preservation - Contacto right column (P8)", () => {
  test("P8: Contacto has Nuestras Ubicaciones (or Ubicaciones), BorderBeam, Horarios, and PulsatingButton", () => {
    const source = readSource("components/Contacto.tsx");

    // Right column heading — accept either full or partial match
    expect(source).toMatch(/Nuestras Ubicaciones|Ubicaciones/);

    // BorderBeam component is used in the right column
    expect(source).toContain("BorderBeam");

    // Horarios section heading (Horarios Disponibles)
    expect(source).toContain("Horarios");

    // PulsatingButton is used in the left column CTA
    expect(source).toContain("PulsatingButton");
  });
});

// ---------------------------------------------------------------------------
// P9: app/sedes/[slug]/page.tsx — sedesData has exactly the three valid keys
// ---------------------------------------------------------------------------
describe("Preservation - sedesData keys (P9)", () => {
  test("P9: sedesData has exactly the three keys babys, jardin, after-class and no jardin-infantil", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Extract the sedesData object content
    const sedesDataMatch = source.match(/const sedesData[^=]*=\s*\{([\s\S]*?)\n\};/);
    expect(sedesDataMatch).toBeTruthy();
    const sedesDataContent = sedesDataMatch![1];

    // All three valid keys must be present
    expect(sedesDataContent).toMatch(/["']babys["']\s*:/);
    expect(sedesDataContent).toMatch(/["']jardin["']\s*:/);
    expect(sedesDataContent).toMatch(/["']after-class["']\s*:/);

    // The invalid key must NOT be present
    expect(sedesDataContent).not.toMatch(/["']jardin-infantil["']\s*:/);

    // Count top-level keys: exactly 3
    const topLevelKeys = sedesDataContent.match(/^\s{2}["'][^"']+["']\s*:/gm);
    expect(topLevelKeys).toBeTruthy();
    expect(topLevelKeys!.length).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// P10: app/sedes/[slug]/page.tsx — carousel navigation elements are present
// ---------------------------------------------------------------------------
describe("Preservation - Carousel navigation (P10)", () => {
  test("P10: Sedes slug page has ChevronLeft, ChevronRight, AnimatePresence, and fotoActual state", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Carousel navigation icons
    expect(source).toContain("ChevronLeft");
    expect(source).toContain("ChevronRight");

    // AnimatePresence wraps the carousel slides
    expect(source).toContain("AnimatePresence");

    // fotoActual state drives the current slide index
    expect(source).toContain("fotoActual");
  });
});

// ---------------------------------------------------------------------------
// P11: app/sedes/[slug]/page.tsx — carousel renders images as <Image
// ---------------------------------------------------------------------------
describe("Preservation - Carousel image rendering (P11)", () => {
  test("P11: Sedes slug page carousel renders items as <Image inside the AnimatePresence block", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Extract the AnimatePresence block (carousel section)
    const animatePresenceBlock = source.match(/<AnimatePresence[\s\S]*?<\/AnimatePresence>/);
    expect(animatePresenceBlock).toBeTruthy();

    // The carousel block must contain an <Image element
    expect(animatePresenceBlock![0]).toContain("<Image");
  });
});

// ---------------------------------------------------------------------------
// Property-based P12: all 12 servicios titles are present in Servicios.tsx
// ---------------------------------------------------------------------------
describe("Preservation - Property-based: servicios titles (P12)", () => {
  /**
   * P12: For each of the 12 servicios titles, assert the title string is
   * present in Servicios.tsx source (none dropped).
   *
   * Validates: Requirements 3.12
   */
  test("P12: Each of the 12 servicios titulo strings is present in Servicios.tsx source", () => {
    const source = readSource("components/Servicios.tsx");

    const serviciosTitles = [
      "Programa M.E.N",
      "Proyectos Mensuales",
      "Bebé Políglota",
      "Sensibilización Musical",
      "Iniciación al Inglés",
      "Gimnasia Infantil",
      "Fonoaudiología",
      "Salidas Pedagógicas",
      "Natación",
      "Pintura",
      "Baile",
      "Ahorro Escolar",
    ];

    // Property: for every titulo in the expected list, it must appear in source
    for (const titulo of serviciosTitles) {
      expect(
        source.includes(titulo),
        `Servicios.tsx must contain titulo: "${titulo}" — it must not have been dropped`
      ).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// Property-based P13: all three sedes slugs are present in sedesData
// ---------------------------------------------------------------------------
describe("Preservation - Property-based: sedes slugs (P13)", () => {
  /**
   * P13: For each of the three sedes slugs (babys, jardin, after-class),
   * assert the key is present in the sedesData source.
   *
   * Validates: Requirements 3.13
   */
  test("P13: Each of the three sedes slugs (babys, jardin, after-class) is a key in sedesData", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    const validSlugs = ["babys", "jardin", "after-class"];

    // Extract the sedesData object content
    const sedesDataMatch = source.match(/const sedesData[^=]*=\s*\{([\s\S]*?)\n\};/);
    expect(sedesDataMatch).toBeTruthy();
    const sedesDataContent = sedesDataMatch![1];

    // Property: for every valid slug, it must appear as a key in sedesData
    for (const slug of validSlugs) {
      const keyPattern = new RegExp(`["']${slug}["']\\s*:`);
      expect(
        keyPattern.test(sedesDataContent),
        `sedesData must contain key "${slug}" — it must not have been removed`
      ).toBe(true);
    }
  });
});
