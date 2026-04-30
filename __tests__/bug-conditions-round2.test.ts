/**
 * Bug Condition Exploration Test — Round 2
 *
 * This test MUST PASS on unfixed code — passing confirms each defect IS present.
 * All 13 assertions encode the CURRENT (defective) state.
 * They will FAIL after the fix is applied (which is the correct outcome post-fix).
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

describe("Bug Condition Exploration Round 2 — 13 UI Defects (assert defects ARE present)", () => {

  // C1: Navbar.tsx — brand-subtitle div HAS color: "var(--muted-foreground)" (defect present)
  test("C1: Navbar brand-subtitle has color: var(--muted-foreground) (defect present)", () => {
    const source = readSource("components/Navbar.tsx");

    // Assert the defective grey color IS present in the brand-subtitle block
    expect(source).toMatch(/color:\s*["']var\(--muted-foreground\)["']/);
  });

  // C2: Nosotros.tsx — calendar item row does NOT have justifyContent: "center" (defect present)
  test("C2: Nosotros calendar item row does NOT have justifyContent: \"center\" (defect present)", () => {
    const source = readSource("components/Nosotros.tsx");

    // The calendar items section maps over 3 items (Periodo anual, Receso, Octubre)
    // The row div has display: flex, alignItems: center but NO justifyContent: center
    // We verify by checking the calendar items array section lacks justifyContent center
    // The calendar items array starts with "Periodo anual" and ends before the Horarios box
    const calendarSection = source.match(/Periodo anual[\s\S]{0,2000}Horarios disponibles/);
    expect(calendarSection).toBeTruthy();
    // The row container should NOT have justifyContent: "center"
    expect(calendarSection![0]).not.toMatch(/justifyContent:\s*["']center["']/);
  });

  // C3: Nosotros.tsx — Propósito description contains the old string (defect present)
  test("C3: Nosotros Propósito description contains old text (defect present)", () => {
    const source = readSource("components/Nosotros.tsx");

    // Assert the stale generic description IS present
    expect(source).toContain("Atención y cuidado integral a niños y niñas en Medellín.");
  });

  // C4: Nosotros.tsx — transition divider does NOT contain a sedes-bg image reference (defect present)
  test("C4: Nosotros transition divider does NOT contain sedes-bg image reference (defect present)", () => {
    const source = readSource("components/Nosotros.tsx");

    // The divider at the bottom of the component is a plain gradient div with no image
    // Assert the source does NOT contain "sedes-bg" (no background image in divider)
    expect(source).not.toContain("sedes-bg");
  });

  // C5: Sedes.tsx — background image wrapper HAS opacity: 0.35 (defect present)
  test("C5: Sedes background image wrapper has opacity: 0.35 (defect present)", () => {
    const source = readSource("components/Sedes.tsx");

    // Assert the too-faint opacity value IS present
    expect(source).toMatch(/opacity:\s*0\.35/);
  });

  // C6: Sedes.tsx — card boxShadow does NOT contain an outer glow pattern like "0 0 20px 4px" (defect present)
  test("C6: Sedes card boxShadow does NOT contain an outer glow pattern (0 0 Npx Npx) (defect present)", () => {
    const source = readSource("components/Sedes.tsx");

    // The current defective boxShadow is: `0 25px 45px -15px ${sede.color}20, inset 0 0 40px ${sede.color}18`
    // It has an inset shadow but NO outer glow (no "0 0 20px 4px" style outer glow)
    // The fix will add: `0 0 20px 4px ${sede.color}25` as an outer glow
    // Assert the outer glow pattern (non-inset "0 0 Npx Npx") is NOT present
    expect(source).not.toMatch(/boxShadow:[\s\S]{0,50}0 0 \d+px \d+px/);
  });

  // C7: Sedes.tsx — card inner div HAS background: "rgba(255, 255, 255, 0.9)" (defect present)
  test("C7: Sedes card inner div has background: rgba(255, 255, 255, 0.9) (defect present)", () => {
    const source = readSource("components/Sedes.tsx");

    // Assert the pure white background IS present
    expect(source).toContain('rgba(255, 255, 255, 0.9)');
  });

  // C8: Servicios.tsx — winnie-globo corner character div HAS width: "100px" (defect present)
  test("C8: Servicios winnie-globo corner character has width: \"100px\" (defect present)", () => {
    const source = readSource("components/Servicios.tsx");

    // Find the winnie-globo section and assert it uses 100px (too small)
    const winnieGloboBlock = source.match(/winnie-globo[\s\S]{0,400}/);
    expect(winnieGloboBlock).toBeTruthy();
    expect(winnieGloboBlock![0]).toMatch(/width:\s*["']100px["']/);
  });

  // C9: Servicios.tsx — ColoredTitle function IS defined (defect present)
  test("C9: Servicios defines a ColoredTitle function (defect present)", () => {
    const source = readSource("components/Servicios.tsx");

    // Assert ColoredTitle function IS present (should be replaced by AuroraText)
    expect(source).toMatch(/function\s+ColoredTitle/);
  });

  // C10: Servicios.tsx — image container div does NOT have a border: "2px solid" style (defect present)
  test("C10: Servicios card image container does NOT have a border: 2px solid style (defect present)", () => {
    const source = readSource("components/Servicios.tsx");

    // Assert a 2px solid border is NOT present on the image container
    expect(source).not.toMatch(/border:\s*["'`]2px solid/);
  });

  // C11: Contacto.tsx — motion.a elements do NOT have maxWidth style (defect present)
  test("C11: Contacto motion.a elements do NOT have maxWidth style (defect present)", () => {
    const source = readSource("components/Contacto.tsx");

    // Assert maxWidth: 480 is NOT present on the contact boxes
    expect(source).not.toMatch(/maxWidth:\s*["']?480/);
  });

  // C12: app/sedes/[slug]/page.tsx — background Image src IS "/images/white.jpg" (defect present)
  test("C12: Sedes slug page background Image src is \"/images/white.jpg\" (defect present)", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Assert the placeholder white image IS present
    expect(source).toContain('src="/images/white.jpg"');
  });

  // C13: app/sedes/[slug]/page.tsx — isVideo helper function is NOT defined (defect present)
  test("C13: Sedes slug page does NOT define an isVideo helper function (defect present)", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Assert the isVideo helper is NOT present (video support missing)
    expect(source).not.toMatch(/const\s+isVideo\s*=/);
    expect(source).not.toMatch(/function\s+isVideo/);
  });

});
