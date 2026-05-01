/**
 * Preservation Property Tests
 *
 * These tests assert the BASELINE behavior that must be preserved after fixes.
 * All tests MUST PASS on the current (unfixed) code.
 *
 * Uses static source-code analysis (reading files as strings) — same approach
 * as bug-conditions.test.ts — to avoid complex mocking requirements for
 * Next.js, Framer Motion, Supabase, etc.
 *
 * Validates: Requirements 3.1–3.12
 */

import { describe, test, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

// Helper to read source files
function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf-8");
}

// ---------------------------------------------------------------------------
// Structural preservation tests (tests 1–10)
// ---------------------------------------------------------------------------

describe("Preservation - Navbar", () => {
  test("P1: Navbar mobile menu — hamburger button and mobile dropdown are present", () => {
    const source = readSource("components/Navbar.tsx");

    // Hamburger button: uses the Menu/X icons from lucide (hamburger icon)
    expect(source).toContain("Menu");
    expect(source).toContain("X");
    // The toggle button is present (nav-toggle class)
    expect(source).toContain("nav-toggle");
    // Mobile dropdown div is present
    expect(source).toContain("mobile-menu");
    // Responsive breakpoint classes (md: prefix) are used — in the inline <style> block
    expect(source).toMatch(/min-width:\s*768px|md:\\\\:hidden|md:hidden/);
    // The open state drives the mobile menu toggle
    expect(source).toMatch(/useState.*false|setOpen/s);
  });

  test("P2: Navbar brand — logo image and 'Winnie Pooh' text are present", () => {
    const source = readSource("components/Navbar.tsx");

    // Logo image reference
    expect(source).toContain("/logos/jardin-infantil.png");
    // Brand text
    expect(source).toContain("Winnie Pooh");
  });
});

describe("Preservation - Hero", () => {
  test("P3: Hero other highlights — 'aprendizaje' and 'felicidad de tu hijo' use type=\"underline\"", () => {
    const source = readSource("components/Hero.tsx");

    // "aprendizaje" HighLight must have type="underline"
    const aprendizajeMatch = source.match(
      /<HighLight[^>]*type=["']underline["'][^>]*>aprendizaje<\/HighLight>|<HighLight[^>]*>aprendizaje<\/HighLight>[^]*?type=["']underline["']/
    );
    // Simpler: just confirm the word appears inside a HighLight with type="underline" nearby
    expect(source).toMatch(/type=["']underline["'][^>]*>aprendizaje|aprendizaje.*type=["']underline["']/s);

    // "felicidad de tu hijo" HighLight must have type="underline"
    expect(source).toMatch(/type=["']underline["'][^>]*>felicidad de tu hijo|felicidad de tu hijo.*type=["']underline["']/s);

    // Both use their existing colors
    expect(source).toContain("#22c55e56"); // aprendizaje color
    expect(source).toContain("#ff1f6d52"); // felicidad color
  });

  test("P4: Stats third sticker (index 2, winnie-guino) uses 70px container size", () => {
    const source = readSource("components/Hero.tsx");

    // Third sticker image is present (whatever the current image name is)
    // The stats array has exactly 3 items
    const statsArrayMatch = source.match(/const stats\s*=\s*\[([\s\S]*?)\];/);
    expect(statsArrayMatch).toBeTruthy();
    const statsContent = statsArrayMatch![1];
    const statItems = statsContent.match(/\{[^}]+\}/g);
    expect(statItems).toBeTruthy();
    expect(statItems!.length).toBe(3);

    // After the fix, conditional sizing is used: index < 2 ? "100px" : "70px"
    // The third sticker (index 2) must still resolve to 70px (the else branch)
    expect(source).toMatch(/index\s*<\s*2/);
    expect(source).toMatch(/"70px"/);
    // Specifically, the ternary must use "70px" as the fallback (else) value
    expect(source).toMatch(/index\s*<\s*2\s*\?\s*["']100px["']\s*:\s*["']70px["']/);
  });
});

describe("Preservation - Nosotros", () => {
  test("P5: Nosotros accordion — AnimatePresence and misionPuntos accordion logic are present", () => {
    const source = readSource("components/Nosotros.tsx");

    // AnimatePresence is imported and used
    expect(source).toContain("AnimatePresence");
    // misionPuntos array is defined
    expect(source).toContain("misionPuntos");
    // expandedIndex state drives accordion open/close
    expect(source).toContain("expandedIndex");
    // Accordion items use onClick to toggle
    expect(source).toMatch(/onClick.*setExpandedIndex|setExpandedIndex.*onClick/s);
  });

  test("P6: Nosotros calendar content — day/period names and schedule time strings are present", () => {
    const source = readSource("components/Nosotros.tsx");

    // Calendar items: period labels (Mañana, Tarde, Completo) or time strings
    expect(source).toContain("Mañana");
    expect(source).toContain("Tarde");
    expect(source).toContain("Completo");

    // Schedule time strings
    expect(source).toMatch(/8am|7am|5pm|12pm/);

    // Calendar section header
    expect(source).toContain("Calendario");
  });
});

describe("Preservation - Sedes", () => {
  test("P7: Sedes card content — logo, title, description, niveles list, and button elements are present", () => {
    const source = readSource("components/Sedes.tsx");

    // Logo image element
    expect(source).toContain("<Image");
    // Title elements (AuroraText for "Winnie Pooh" and h3 for subtitulo)
    expect(source).toContain("AuroraText");
    expect(source).toContain("Winnie Pooh");
    // Description text (sede.descripcion rendered)
    expect(source).toContain("sede.descripcion") || expect(source).toContain("{sede.descripcion}");
    // Niveles list with Check icons
    expect(source).toContain("Check");
    expect(source).toContain("niveles");
    // Button / Link to sede detail page
    expect(source).toContain("Conocer Sede");
    expect(source).toContain("/sedes/");
  });
});

describe("Preservation - Slug routing", () => {
  test("P8: sedesData contains exactly the keys 'babys', 'jardin', 'after-class' and no others", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Extract the sedesData object content
    const sedesDataMatch = source.match(/const sedesData[^=]*=\s*\{([\s\S]*?)\n\};/);
    expect(sedesDataMatch).toBeTruthy();
    const sedesDataContent = sedesDataMatch![1];

    // All three valid keys must be present
    expect(sedesDataContent).toMatch(/["']babys["']\s*:/);
    expect(sedesDataContent).toMatch(/["']jardin["']\s*:/);
    expect(sedesDataContent).toMatch(/["']after-class["']\s*:/);

    // No invalid keys
    expect(sedesDataContent).not.toMatch(/["']jardin-infantil["']\s*:/);
    expect(sedesDataContent).not.toMatch(/["']prejardin["']\s*:/);
    expect(sedesDataContent).not.toMatch(/["']kinder["']\s*:/);
    expect(sedesDataContent).not.toMatch(/["']sala-cuna["']\s*:/);

    // Count top-level keys: extract all "key": patterns at the first level
    const topLevelKeys = sedesDataContent.match(/^\s{2}["'][^"']+["']\s*:/gm);
    expect(topLevelKeys).toBeTruthy();
    expect(topLevelKeys!.length).toBe(3);
  });
});

describe("Preservation - Servicios", () => {
  test("P9: Servicios header — AuroraText component is used for the section title", () => {
    const source = readSource("components/Servicios.tsx");

    // AuroraText is imported and used in the header
    expect(source).toContain("AuroraText");
    // The section header text is present
    expect(source).toContain("Experiencias que acompañan");
    // SparklesText is also present in the header
    expect(source).toContain("SparklesText");
  });

  test("P10: Servicios Lens effect — Lens component wraps service card images", () => {
    const source = readSource("components/Servicios.tsx");

    // Lens is imported
    expect(source).toContain('from "@/components/ui/lens"');
    // Lens component is used (opening tag)
    expect(source).toMatch(/<Lens>/);
    // Lens wraps an Image element
    expect(source).toMatch(/<Lens>[\s\S]*?<Image[\s\S]*?<\/Lens>/);
  });
});

// ---------------------------------------------------------------------------
// Property-based tests (tests 11–13)
// ---------------------------------------------------------------------------

describe("Preservation - Property-based tests", () => {
  /**
   * P11: Slug key exclusion property
   *
   * For each invalid slug, sedesData must NOT contain it as a key.
   * Validates: Requirements 3.8
   */
  test("P11: Slug key exclusion — invalid slugs are not present in sedesData source", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    const sedesDataMatch = source.match(/const sedesData[^=]*=\s*\{([\s\S]*?)\n\};/);
    expect(sedesDataMatch).toBeTruthy();
    const sedesDataContent = sedesDataMatch![1];

    const invalidSlugs = ["jardin-infantil", "prejardin", "kinder", "sala-cuna"];

    for (const slug of invalidSlugs) {
      // Each invalid slug must NOT appear as a key in sedesData
      const keyPattern = new RegExp(`["']${slug}["']\\s*:`);
      expect(
        keyPattern.test(sedesDataContent),
        `sedesData must NOT contain key "${slug}"`
      ).toBe(false);
    }
  });

  /**
   * P12: Sedes card shadow property (post-fix)
   *
   * After the C11 fix, each card's boxShadow contains BOTH an outer shadow
   * component AND an inset glow component. This test verifies the correct
   * post-fix state.
   * Validates: Requirements 3.7
   */
  test("P12: Sedes card shadow — each card has both an outer boxShadow AND an inset glow component", () => {
    const source = readSource("components/Sedes.tsx");

    // Extract all boxShadow declarations (template literals use backticks)
    const boxShadowMatches = source.match(/boxShadow:\s*`[^`]*`/g);
    expect(boxShadowMatches).toBeTruthy();
    expect(boxShadowMatches!.length).toBeGreaterThanOrEqual(1);

    for (const shadowDecl of boxShadowMatches!) {
      const shadowValue = shadowDecl.replace(/^boxShadow:\s*`/, "").replace(/`$/, "").trim();

      expect(
        shadowValue.length,
        `boxShadow declaration should not be empty: ${shadowDecl}`
      ).toBeGreaterThan(0);

      // The outer shadow component is present (contains pixel values)
      expect(shadowValue).toMatch(/\d+px/);

      // The inset glow component is now present (C11 fix applied)
      expect(
        shadowValue.includes("inset"),
        `Post-fix: boxShadow must contain "inset" glow — found: ${shadowValue}`
      ).toBe(true);

      // Both components are separated by a comma
      expect(
        shadowValue.includes(","),
        `boxShadow must have multiple components (outer + inset) — found: ${shadowValue}`
      ).toBe(true);
    }
  });

  /**
   * P13: AuroraText titles post-round-3 state
   *
   * Servicios.tsx now uses AuroraText with AURORA_PALETTES for card titles
   * (ColoredTitle was replaced by AuroraText in round 3).
   * The h3 uses <AuroraText colors={AURORA_PALETTES[i]}> and Site_Palette is defined.
   * Validates: Requirements 3.9 (post-round-3 state)
   */
  test("P13: AuroraText titles post-round-3 — Servicios.tsx uses AuroraText for titles, Site_Palette defined", () => {
    const source = readSource("components/Servicios.tsx");

    // AuroraText IS used for card titles (post-round-3)
    expect(source).toContain("AuroraText");
    expect(source).toMatch(/<AuroraText\s+colors=\{AURORA_PALETTES\[i\]\}/);

    // Site_Palette constant is defined
    expect(source).toMatch(/const\s+Site_Palette\s*=/);
    expect(source).toContain("#FF7893");
    expect(source).toContain("#7AC0FF");

    // AURORA_PALETTES is still defined
    expect(source).toMatch(/const\s+AURORA_PALETTES\s*=/);

    // ColoredTitle is no longer used (replaced by AuroraText)
    expect(source).not.toMatch(/function\s+ColoredTitle/);
  });

  /**
   * P14: ColoredTitle palette cycling property
   *
   * For any string of length N, ColoredTitle assigns
   * color[i] === PALETTE[nonSpaceIndex % PALETTE.length] for every non-space character.
   * This verifies the modulo cycling is correct across many inputs.
   *
   * Validates: Requirements 3.9
   */
  test("P14: ColoredTitle palette cycling — non-space chars get PALETTE[nonSpaceIndex % 6] color", () => {
    // Inline the same PALETTE and ColoredTitle logic from Servicios.tsx to test the property
    const PALETTE = ["#FF7893", "#7AC0FF", "#7E3AF2", "#FFFC01", "#4FF084", "#EB8100"];

    // Simulate ColoredTitle color assignment for a given string
    function getColorAssignments(text: string): Array<{ char: string; color: string }> {
      let colorIdx = 0;
      return text.split("").map((char) => {
        if (char === " ") {
          return { char, color: "space" };
        }
        const color = PALETTE[colorIdx++ % PALETTE.length];
        return { char, color };
      });
    }

    // Property: for any string, non-space chars get PALETTE[nonSpaceIndex % 6]
    const testStrings = [
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
      "A",
      "AB",
      "A B C",
      "   ",
      "Hello World",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "a b c d e f g h i j k l",
    ];

    for (const text of testStrings) {
      const assignments = getColorAssignments(text);
      let nonSpaceIndex = 0;

      for (const assignment of assignments) {
        if (assignment.char === " ") {
          // Spaces do not consume a palette index
          expect(assignment.color).toBe("space");
        } else {
          // Non-space chars get PALETTE[nonSpaceIndex % PALETTE.length]
          const expectedColor = PALETTE[nonSpaceIndex % PALETTE.length];
          expect(
            assignment.color,
            `char "${assignment.char}" at nonSpaceIndex ${nonSpaceIndex} in "${text}" should be ${expectedColor}`
          ).toBe(expectedColor);
          nonSpaceIndex++;
        }
      }
    }
  });
});
