/**
 * Bug Condition Exploration Test — Round 2
 *
 * This test MUST FAIL on unfixed code — failure confirms each defect exists.
 * DO NOT fix the code when it fails.
 *
 * Uses static source-code analysis (reading files as strings) to avoid
 * complex mocking requirements for Next.js, Framer Motion, etc.
 *
 * All 13 assertions encode the EXPECTED (fixed) state.
 * They will FAIL on unfixed code and PASS after the fix is applied.
 */

import { describe, test, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

// Helper to read source files
function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf-8");
}

describe("Bug Condition Exploration Round 2 — 13 UI Defects", () => {

  // C1: Navbar.tsx — brand-subtitle should NOT use var(--muted-foreground) grey
  // and SHOULD have fontWeight: 700
  test("C1: Navbar brand-subtitle does NOT have color: var(--muted-foreground) and HAS fontWeight: 700", () => {
    const source = readSource("components/Navbar.tsx");

    // Assert the defective grey color is gone
    expect(source).not.toMatch(/color:\s*["']var\(--muted-foreground\)["']/);

    // Assert fontWeight: 700 is present in the brand-subtitle block
    // The brand-subtitle div is the one with className="brand-subtitle"
    const brandSubtitleBlock = source.match(/className="brand-subtitle"[\s\S]{0,300}/);
    expect(brandSubtitleBlock).toBeTruthy();
    expect(brandSubtitleBlock![0]).toMatch(/fontWeight:\s*7\d{2}/);
  });

  // C2: Nosotros.tsx — calendar item row SHOULD have justifyContent: "center"
  test("C2: Nosotros calendar item row has justifyContent: \"center\"", () => {
    const source = readSource("components/Nosotros.tsx");

    // The calendar items section maps over 3 items with emoji 📆, 🏖️, ✅
    // Assert the row flex container has justifyContent: "center"
    expect(source).toMatch(/justifyContent:\s*["']center["']/);
  });

  // C3: Nosotros.tsx — old description text should be gone
  test("C3: Nosotros Propósito does NOT contain old description text", () => {
    const source = readSource("components/Nosotros.tsx");

    // Assert the stale generic description is no longer present
    expect(source).not.toContain("Atención y cuidado integral a niños y niñas en Medellín.");
  });

  // C4: Nosotros.tsx — transition divider at bottom SHOULD reference sedes-bg image
  test("C4: Nosotros transition divider contains a reference to sedes-bg image", () => {
    const source = readSource("components/Nosotros.tsx");

    // The transition element after the closing </section> tag should contain
    // a next/image <Image> with sedes-bg in the src
    expect(source).toMatch(/sedes-bg/);
  });

  // C5: Sedes.tsx — background image wrapper should NOT have opacity: 0.35
  test("C5: Sedes background image wrapper does NOT have opacity: 0.35", () => {
    const source = readSource("components/Sedes.tsx");

    // Assert the too-faint opacity value is gone
    expect(source).not.toMatch(/opacity:\s*0\.35/);
  });

  // C6: Sedes.tsx — card boxShadow SHOULD contain a glow pattern like "0 0 20px"
  test("C6: Sedes card boxShadow contains a glow pattern (0 0 Npx)", () => {
    const source = readSource("components/Sedes.tsx");

    // Assert the boxShadow includes an outer glow value
    expect(source).toMatch(/boxShadow:[\s\S]{0,200}0 0 \d+px/);
  });

  // C7: Sedes.tsx — card inner div should NOT have background: "rgba(255, 255, 255, 0.9)"
  test("C7: Sedes card inner div does NOT have background: rgba(255, 255, 255, 0.9)", () => {
    const source = readSource("components/Sedes.tsx");

    // Assert the pure white background is gone
    expect(source).not.toContain('rgba(255, 255, 255, 0.9)');
  });

  // C8: Servicios.tsx — winnie-globo corner character div should NOT have width: "100px"
  test("C8: Servicios winnie-globo corner character does NOT have width: \"100px\"", () => {
    const source = readSource("components/Servicios.tsx");

    // Find the winnie-globo section and assert it no longer uses 100px
    const winnieGloboBlock = source.match(/winnie-globo[\s\S]{0,400}/);
    expect(winnieGloboBlock).toBeTruthy();
    expect(winnieGloboBlock![0]).not.toMatch(/width:\s*["']100px["']/);
  });

  // C9: Servicios.tsx — ColoredTitle function should NOT be defined (replaced by AuroraText)
  test("C9: Servicios does NOT define a ColoredTitle function", () => {
    const source = readSource("components/Servicios.tsx");

    // Assert ColoredTitle function is gone
    expect(source).not.toMatch(/function\s+ColoredTitle/);
    expect(source).not.toMatch(/const\s+ColoredTitle\s*=/);
  });

  // C10: Servicios.tsx — image container div SHOULD have a border: "2px solid" style
  test("C10: Servicios card image container has a border: 2px solid style", () => {
    const source = readSource("components/Servicios.tsx");

    // Assert a 2px solid border is present on the image container
    expect(source).toMatch(/border:\s*["'`]2px solid/);
  });

  // C11: Contacto.tsx — motion.a elements SHOULD have maxWidth style
  test("C11: Contacto motion.a elements have maxWidth style", () => {
    const source = readSource("components/Contacto.tsx");

    // Assert maxWidth: 480 (or similar) is present on the contact boxes
    expect(source).toMatch(/maxWidth:\s*["']?480/);
  });

  // C12: app/sedes/[slug]/page.tsx — should NOT contain src="/images/white.jpg"
  test("C12: Sedes slug page does NOT contain src=\"/images/white.jpg\" (placeholder background)", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Assert the placeholder white image is gone
    expect(source).not.toContain('src="/images/white.jpg"');
  });

  // C13: app/sedes/[slug]/page.tsx — SHOULD contain isVideo helper function
  test("C13: Sedes slug page defines an isVideo helper function", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Assert the isVideo helper is present (video support added)
    expect(source).toMatch(/const\s+isVideo\s*=|function\s+isVideo/);
  });

});
