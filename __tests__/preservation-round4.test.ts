/**
 * Preservation Property Tests — Round 4
 *
 * These tests assert the BASELINE behavior that must be preserved after fixes.
 * All 14 tests MUST PASS on the current (unfixed) code.
 *
 * Uses static source-code analysis (reading files as strings) to avoid complex
 * mocking requirements for Next.js, Framer Motion, etc.
 *
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10
 */

import { describe, test, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

// Helper to read source files
function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf-8");
}

// ---------------------------------------------------------------------------
// P1: Nosotros.tsx — section content preserved
// ---------------------------------------------------------------------------
describe("Preservation - Nosotros section content (P1)", () => {
  /**
   * P1: The Nosotros section must retain its accordion, AnimatePresence,
   * NeonGradientCard layout, and the "Propósito" heading.
   *
   * Validates: Requirements 3.1
   */
  test("P1: Nosotros source contains misionPuntos, AnimatePresence, expandedIndex, NeonGradientCard, borderSize={4}, and Propósito heading", () => {
    const source = readSource("components/Nosotros.tsx");

    // Accordion data array
    expect(source).toContain("misionPuntos");

    // AnimatePresence wraps accordion expand/collapse
    expect(source).toContain("AnimatePresence");

    // expandedIndex state drives which accordion item is open
    expect(source).toContain("expandedIndex");

    // NeonGradientCard is used for the Propósito and Calendario cards
    expect(source).toContain("NeonGradientCard");

    // Both NeonGradientCards use borderSize={4}
    expect(source).toContain("borderSize={4}");

    // The Propósito heading text
    expect(source).toContain("Propósito");
  });
});

// ---------------------------------------------------------------------------
// P2: Nosotros.tsx — transition container structure preserved
// ---------------------------------------------------------------------------
describe("Preservation - Nosotros transition container (P2)", () => {
  /**
   * P2: The transition div between Nosotros and Sedes must keep its outer
   * container dimensions and overflow/pointer-events settings intact.
   * Only the maskImage value changes in the fix — the container itself must not.
   *
   * Validates: Requirements 3.2
   */
  test("P2: Nosotros transition div retains height: 200px, overflow: hidden, pointerEvents: none, and marginBottom: -2px", () => {
    const source = readSource("components/Nosotros.tsx");

    // Outer container height
    expect(source).toContain('height: "200px"');

    // Overflow hidden to clip the image
    expect(source).toContain('overflow: "hidden"');

    // Pointer events none so it doesn't block scroll
    expect(source).toContain('pointerEvents: "none"');

    // Negative margin to eliminate gap between sections
    expect(source).toContain('marginBottom: "-2px"');
  });
});

// ---------------------------------------------------------------------------
// P3: Contacto.tsx — right column preserved
// ---------------------------------------------------------------------------
describe("Preservation - Contacto right column (P3)", () => {
  /**
   * P3: The right column of the Contacto section (locations, hours, BorderBeam,
   * PulsatingButton, and sede addresses) must remain completely unchanged.
   *
   * Validates: Requirements 3.3, 3.9
   */
  test("P3: Contacto source contains Nuestras Ubicaciones, BorderBeam, Horarios Disponibles, PulsatingButton, Calle 51, and Carrera 81", () => {
    const source = readSource("components/Contacto.tsx");

    // Right column heading
    expect(source).toContain("Nuestras Ubicaciones");

    // BorderBeam decorative component in the right column card
    expect(source).toContain("BorderBeam");

    // Hours section heading
    expect(source).toContain("Horarios Disponibles");

    // PulsatingButton CTA in the left column
    expect(source).toContain("PulsatingButton");

    // Sede address 1 — Jardín Infantil & After Class
    expect(source).toContain("Calle 51");

    // Sede address 2 — Winnie Pooh Baby's
    expect(source).toContain("Carrera 81");
  });
});

// ---------------------------------------------------------------------------
// P4: Contacto.tsx — contact card structure preserved
// ---------------------------------------------------------------------------
describe("Preservation - Contacto card structure (P4)", () => {
  /**
   * P4: All four contact entries must still be present with their label values,
   * and the hover interaction handlers must remain on the card elements.
   *
   * Validates: Requirements 3.3
   */
  test("P4: Contacto source contains all four label values and onMouseEnter / onMouseLeave handlers", () => {
    const source = readSource("components/Contacto.tsx");

    // All four contact labels
    expect(source).toContain('"WhatsApp"');
    expect(source).toContain('"Correo"');
    expect(source).toContain('"Instagram"');
    expect(source).toContain('"Reseñas Google"');

    // Hover interaction handlers
    expect(source).toContain("onMouseEnter");
    expect(source).toContain("onMouseLeave");
  });
});

// ---------------------------------------------------------------------------
// P5: Contacto.tsx — contact entry bg values preserved (property-based)
// ---------------------------------------------------------------------------
describe("Preservation - Contacto contact entry bg values (P5)", () => {
  /**
   * P5: For each of the 4 contact entries, the bg value (icon background color)
   * must still be present in source — these are distinct from the tint values
   * being fixed and must not be altered.
   *
   * Validates: Requirements 3.3
   */
  test("P5: Each of the 4 contact entry bg values is present in Contacto.tsx source", () => {
    const source = readSource("components/Contacto.tsx");

    const bgValues = [
      '"#4FF08422"', // WhatsApp icon background
      '"#7AC0FF22"', // Correo icon background
      '"#FF789322"', // Instagram icon background
      '"#FFFC0122"', // Reseñas Google icon background
    ];

    // Property: for every bg value in the expected list, it must appear in source
    for (const bg of bgValues) {
      expect(
        source.includes(bg),
        `Contacto.tsx must contain bg value ${bg} — icon backgrounds must not be altered`
      ).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// P6: app/sedes/[slug]/page.tsx — info card preserved
// ---------------------------------------------------------------------------
describe("Preservation - Sedes slug info card (P6)", () => {
  /**
   * P6: The info card (left column) must retain its Detalles heading, edades,
   * servicios, MapPin icon, WhatsApp CTA button, and whatsappLink variable.
   *
   * Validates: Requirements 3.5
   */
  test("P6: Sedes slug page contains Detalles, sede.edades, sede.servicios, MapPin, ¡Preguntar Ahora!, and whatsappLink", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Info card heading (rendered as JSX text content, not a string literal)
    expect(source).toContain("Detalles");

    // Edades list rendered from sede data
    expect(source).toContain("sede.edades");

    // Servicios list rendered from sede data
    expect(source).toContain("sede.servicios");

    // MapPin icon for the address
    expect(source).toContain("MapPin");

    // WhatsApp CTA button label
    expect(source).toContain("¡Preguntar Ahora!");

    // WhatsApp link variable
    expect(source).toContain("whatsappLink");
  });
});

// ---------------------------------------------------------------------------
// P7: app/sedes/[slug]/page.tsx — map NeonGradientCard preserved
// ---------------------------------------------------------------------------
describe("Preservation - Sedes slug map NeonGradientCard (P7)", () => {
  /**
   * P7: The map column must still use NeonGradientCard with borderRadius={56}
   * and render the Google Maps iframe using sede.mapaUrl.
   *
   * Validates: Requirements 3.5
   */
  test("P7: Sedes slug page contains sede.mapaUrl, <iframe, and borderRadius={56}", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Map URL from sede data
    expect(source).toContain("sede.mapaUrl");

    // Google Maps iframe element
    expect(source).toContain("<iframe");

    // NeonGradientCard borderRadius for the map card
    expect(source).toContain("borderRadius={56}");
  });
});

// ---------------------------------------------------------------------------
// P8: app/sedes/[slug]/page.tsx — carousel navigation preserved
// ---------------------------------------------------------------------------
describe("Preservation - Sedes slug carousel navigation (P8)", () => {
  /**
   * P8: The carousel navigation arrows, dot indicators, and state functions
   * must all remain intact after the fix.
   *
   * Validates: Requirements 3.6
   */
  test("P8: Sedes slug page contains ChevronLeft, ChevronRight, fotoAnterior, proximaFoto, and setFotoActual dot buttons", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Left arrow navigation icon
    expect(source).toContain("ChevronLeft");

    // Right arrow navigation icon
    expect(source).toContain("ChevronRight");

    // Previous photo handler function
    expect(source).toContain("fotoAnterior");

    // Next photo handler function
    expect(source).toContain("proximaFoto");

    // Dot indicator buttons use setFotoActual to jump to a specific index
    expect(source).toContain("setFotoActual");
  });
});

// ---------------------------------------------------------------------------
// P9: app/sedes/[slug]/page.tsx — sedesData keys preserved
// ---------------------------------------------------------------------------
describe("Preservation - sedesData keys (P9)", () => {
  /**
   * P9: The sedesData object must still contain exactly the three valid slug
   * keys: babys, jardin, and after-class.
   *
   * Validates: Requirements 3.5
   */
  test("P9: sedesData contains babys, jardin, and after-class as top-level keys", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    const validSlugs = ["babys", "jardin", "after-class"];

    // Extract the sedesData object content
    const sedesDataMatch = source.match(/const sedesData[^=]*=\s*\{([\s\S]*?)\n\};/);
    expect(sedesDataMatch, "sedesData object must be present in source").toBeTruthy();
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

// ---------------------------------------------------------------------------
// P10: components/Servicios.tsx — Lens effect and card content preserved
// ---------------------------------------------------------------------------
describe("Preservation - Servicios Lens effect and card content (P10)", () => {
  /**
   * P10: The Lens hover/zoom effect, AuroraText titles, SparklesText header,
   * section heading, and all 12 service titles must remain intact.
   *
   * Validates: Requirements 3.7
   */
  test("P10: Servicios source contains <Lens>, AuroraText, SparklesText, Experiencias que acompañan, and all 12 titulo strings", () => {
    const source = readSource("components/Servicios.tsx");

    // Lens component wraps card images
    expect(source).toContain("<Lens>");

    // AuroraText used for service card titles
    expect(source).toContain("AuroraText");

    // SparklesText used in the section header
    expect(source).toContain("SparklesText");

    // Section heading text
    expect(source).toContain("Experiencias que acompañan");

    // All 12 service titles
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
      expect(
        source.includes(titulo),
        `Servicios.tsx must contain titulo: "${titulo}"`
      ).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// P11: components/Servicios.tsx — decorative corner characters preserved
// ---------------------------------------------------------------------------
describe("Preservation - Servicios decorative corner images (P11)", () => {
  /**
   * P11: The four decorative corner images and their responsive visibility
   * class must remain in the Servicios section.
   *
   * Validates: Requirements 3.7
   */
  test("P11: Servicios source contains winnie-globo.png, elefante-globo.png, tigger-globo.png, piggy-globo.png, and hidden xl:block", () => {
    const source = readSource("components/Servicios.tsx");

    // Top-left corner image
    expect(source).toContain("winnie-globo.png");

    // Bottom-left corner image
    expect(source).toContain("elefante-globo.png");

    // Top-right corner image
    expect(source).toContain("tigger-globo.png");

    // Bottom-right corner image
    expect(source).toContain("piggy-globo.png");

    // Responsive class that hides corner images on smaller screens
    expect(source).toContain("hidden xl:block");
  });
});

// ---------------------------------------------------------------------------
// P12: components/Hero.tsx — stat card container preserved
// ---------------------------------------------------------------------------
describe("Preservation - Hero stat card container (P12)", () => {
  /**
   * P12: The stat card container dimensions (220×200px), NumberTicker, and
   * all three stat label strings must remain unchanged.
   *
   * Validates: Requirements 3.8
   */
  test("P12: Hero source contains width: 220px, height: 200px, NumberTicker, and all three stat label strings", () => {
    const source = readSource("components/Hero.tsx");

    // Stat card container width
    expect(source).toContain('width: "220px"');

    // Stat card container height
    expect(source).toContain('height: "200px"');

    // NumberTicker component for animated stat numbers
    expect(source).toContain("NumberTicker");

    // All three stat label strings
    expect(source).toContain("Años de experiencia");
    expect(source).toContain("Sedes en Medellín");
    expect(source).toContain("Idiomas");
  });
});

// ---------------------------------------------------------------------------
// P13: components/Hero.tsx — sticker index 2 preserved
// ---------------------------------------------------------------------------
describe("Preservation - Hero sticker index 2 (P13)", () => {
  /**
   * P13: The sticker ternary must still contain "70px" as the else branch
   * for index 2. The fix only changes the "90px" values for index 0 and 1;
   * the 70px value for index 2 must remain untouched.
   *
   * Validates: Requirements 3.8
   */
  test("P13: Hero source contains 70px in the sticker ternary (else branch for index 2)", () => {
    const source = readSource("components/Hero.tsx");

    // The 70px value for the index 2 sticker must still be present
    expect(source).toContain('"70px"');
  });
});

// ---------------------------------------------------------------------------
// P14: app/galeria/page.tsx — Galería page completely unmodified
// ---------------------------------------------------------------------------
describe("Preservation - Galería page unmodified (P14)", () => {
  /**
   * P14: The Galería page must remain completely unchanged — the lightbox
   * library import, the page heading, and the columnCount masonry layout
   * must all still be present.
   *
   * Validates: Requirements 3.10
   */
  test("P14: Galería page source contains yet-another-react-lightbox, Nuestros Momentos Mágicos, and columnCount", () => {
    const source = readSource("app/galeria/page.tsx");

    // Lightbox library import
    expect(source).toContain("yet-another-react-lightbox");

    // Page heading text
    expect(source).toContain("Nuestros Momentos Mágicos");

    // Masonry layout uses columnCount
    expect(source).toContain("columnCount");
  });
});
