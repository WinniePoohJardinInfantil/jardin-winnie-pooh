/**
 * Bug Condition Verification Test — Round 2 (Post All 3 Rounds of Fixes)
 *
 * These tests assert the FIXED / CORRECT state of the codebase.
 * Each test verifies that the previously-reported defect is no longer present
 * and that the correct implementation is in place.
 *
 * Uses static source-code analysis (reading files as strings) to avoid
 * complex mocking requirements for Next.js, Framer Motion, etc.
 *
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12, 1.13
 */

import { describe, test, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

// Helper to read source files
function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf-8");
}

describe("Bug Condition Verification Round 2 — 13 UI Fixes (assert fixes ARE in place)", () => {

  // C1: Navbar brand-subtitle does NOT have color: "var(--muted-foreground)" — it now has color: "#FF1F6D"
  test("C1: Navbar brand-subtitle has color: #FF1F6D (not var(--muted-foreground)) (fixed)", () => {
    const source = readSource("components/Navbar.tsx");

    // Assert the correct pink color IS present in the brand-subtitle block
    expect(source).toMatch(/color:\s*["']#FF1F6D["']/);

    // Assert the defective grey color is gone
    expect(source).not.toMatch(/color:\s*["']var\(--muted-foreground\)["']/);
  });

  // C2: Nosotros calendar item row DOES have justifyContent: "center"
  test("C2: Nosotros calendar item row HAS justifyContent: \"center\" (fixed)", () => {
    const source = readSource("components/Nosotros.tsx");

    // The calendar items are inside a .map() that renders divs with display: flex.
    // The fix adds justifyContent: "center" to each row div.
    // We locate the calendar items block by finding the array literal containing
    // the emoji/texto objects (📆, 🏖️, ✅) and check for justifyContent: "center".
    const calendarBlock = source.match(/emoji:[\s\S]{0,3000}Horarios disponibles/);
    expect(calendarBlock).toBeTruthy();

    // The row container SHOULD now have justifyContent: "center"
    expect(calendarBlock![0]).toMatch(/justifyContent:\s*["']center["']/);
  });

  // C3: Nosotros Propósito description does NOT contain old text — it contains "Somos el comienzo"
  test("C3: Nosotros Propósito description contains 'Somos el comienzo' (not old text) (fixed)", () => {
    const source = readSource("components/Nosotros.tsx");

    // Assert the new correct description IS present
    expect(source).toContain("Somos el comienzo");

    // Assert the stale generic description is gone
    expect(source).not.toContain("Atención y cuidado integral a niños y niñas en Medellín.");
  });

  // C4: Nosotros transition divider DOES contain sedes-bg image reference
  test("C4: Nosotros transition divider DOES contain sedes-bg image reference (fixed)", () => {
    const source = readSource("components/Nosotros.tsx");

    // Assert the source now contains "sedes-bg" (background image in divider)
    expect(source).toContain("sedes-bg");
  });

  // C5: Sedes background image wrapper has opacity: 0.6 (not 0.35)
  test("C5: Sedes background image wrapper has opacity: 0.6 (fixed)", () => {
    const source = readSource("components/Sedes.tsx");

    // Assert the correct opacity value IS present
    expect(source).toMatch(/opacity:\s*0\.6/);

    // Assert the too-faint opacity value is gone
    expect(source).not.toMatch(/opacity:\s*0\.35/);
  });

  // C6: Sedes card boxShadow DOES contain outer glow pattern "0 0 20px 4px"
  test("C6: Sedes card boxShadow DOES contain outer glow pattern (0 0 20px 4px) (fixed)", () => {
    const source = readSource("components/Sedes.tsx");

    // Assert the outer glow pattern IS present
    expect(source).toMatch(/boxShadow:[\s\S]{0,100}0 0 \d+px \d+px/);
  });

  // C7: Sedes card inner div does NOT have rgba(255, 255, 255, 0.9) — it uses ${sede.color}0A
  test("C7: Sedes card inner div uses ${sede.color}0A background (not rgba(255,255,255,0.9)) (fixed)", () => {
    const source = readSource("components/Sedes.tsx");

    // Assert the tinted background IS present
    expect(source).toMatch(/\$\{sede\.color\}0A/);

    // Assert the pure white background is gone
    expect(source).not.toContain('rgba(255, 255, 255, 0.9)');
  });

  // C8: Servicios winnie-globo corner character has width: "220px" (not 100px)
  test("C8: Servicios winnie-globo corner character has width: \"220px\" (fixed)", () => {
    const source = readSource("components/Servicios.tsx");

    // Find the winnie-globo section and assert it uses 220px
    const winnieGloboBlock = source.match(/winnie-globo[\s\S]{0,400}/);
    expect(winnieGloboBlock).toBeTruthy();
    expect(winnieGloboBlock![0]).toMatch(/width:\s*["']220px["']/);

    // Assert the old too-small size is gone from the winnie-globo block
    expect(winnieGloboBlock![0]).not.toMatch(/width:\s*["']100px["']/);
  });

  // C9: Servicios does NOT define a ColoredTitle function — uses AuroraText instead
  test("C9: Servicios does NOT define a ColoredTitle function (uses AuroraText instead) (fixed)", () => {
    const source = readSource("components/Servicios.tsx");

    // Assert ColoredTitle function is NOT present
    expect(source).not.toMatch(/function\s+ColoredTitle/);

    // Assert AuroraText IS used instead
    expect(source).toContain("AuroraText");
  });

  // C10: Servicios card image container border removed in round 4 (Bug 6 fix)
  // Updated in round 4: border: 2px solid was removed; container now has borderRadius: 8px + overflow: hidden
  test("C10: Servicios card image container has NO border (border removed in round 4) (fixed)", () => {
    const source = readSource("components/Servicios.tsx");

    // Assert the 2px solid border is NO LONGER present (removed in round 4)
    expect(source).not.toMatch(/border:\s*[`"']?2px solid/);

    // Assert the replacement style IS present (borderRadius: 8px, overflow: hidden)
    expect(source).toMatch(/borderRadius:\s*["']8px["']/);
    expect(source).toMatch(/overflow:\s*["']hidden["']/);
  });

  // C11: Contacto motion.a elements DO have maxWidth: "480px" style
  test("C11: Contacto motion.a elements DO have maxWidth: \"480px\" style (fixed)", () => {
    const source = readSource("components/Contacto.tsx");

    // Assert maxWidth: 480 IS present on the contact boxes
    expect(source).toMatch(/maxWidth:\s*["']?480/);
  });

  // C12: Sedes slug page background Image src is "/images/sedes-slug-bg.jpg" (not white.jpg)
  test("C12: Sedes slug page background Image src is \"/images/sedes-slug-bg.jpg\" (fixed)", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Assert the correct background image IS present
    expect(source).toContain('src="/images/sedes-slug-bg.jpg"');

    // Assert the placeholder white image is gone
    expect(source).not.toContain('src="/images/white.jpg"');
  });

  // C13: Sedes slug page DOES define an isVideo helper function
  test("C13: Sedes slug page DOES define an isVideo helper function (fixed)", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Assert the isVideo helper IS present
    expect(source).toMatch(/const\s+isVideo\s*=/);
  });

});
