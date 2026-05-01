/**
 * Bug Condition Exploration Tests — Round 4
 *
 * These tests use static source-code analysis (read files as strings, regex/string matching)
 * to assert that each known defect IS PRESENT in the unfixed source.
 *
 * All 10 assertions PASS on unfixed code  → confirms the bugs exist.
 * After fixes are applied, these tests will FAIL → confirms the bugs are gone.
 *
 * Validates: Requirements 1.1, 2.1, 4.1, 5.1, 5.2, 5.3, 5.4, 6.1, 7.1, 8.1
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, it, expect } from "vitest";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readSource(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf-8");
}

// ---------------------------------------------------------------------------
// Source files
// ---------------------------------------------------------------------------

const nosotrosSrc   = readSource("components/Nosotros.tsx");
const contactoSrc   = readSource("components/Contacto.tsx");
const sedesSlugSrc  = readSource("app/sedes/[slug]/page.tsx");
const serviciosSrc  = readSource("components/Servicios.tsx");
const heroSrc       = readSource("components/Hero.tsx");

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Bug Condition Exploration — Round 4 (all assertions PASS on unfixed code)", () => {

  /**
   * C1 — Nosotros.tsx
   * The transition div maskImage IS the symmetric 4-stop gradient.
   * After fix it should become "linear-gradient(to top, black 0%, transparent 100%)".
   */
  it("C1: Nosotros transition div uses symmetric 4-stop gradient (defect present)", () => {
    expect(nosotrosSrc).toContain(
      "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"
    );
  });

  /**
   * C2 — Contacto.tsx
   * Tint values are at 0.06 opacity (too faint).
   * After fix all four entries should use 0.20.
   */
  it("C2: Contacto tint opacity is 0.06 (defect present)", () => {
    expect(contactoSrc).toContain("rgba(79,240,132,0.06)");
  });

  /**
   * C4 — app/sedes/[slug]/page.tsx
   * Description <p> has the `text-slate-500` Tailwind class.
   * After fix the class should be removed and replaced with an inline style.
   */
  it("C4: Sedes slug description <p> has text-slate-500 class (defect present)", () => {
    expect(sedesSlugSrc).toContain("text-slate-500");
  });

  /**
   * C4b — app/sedes/[slug]/page.tsx
   * HighLight in description uses hardcoded color "#00c3ff56".
   * After fix it should use the sede-themed color: `${sede.color}CC`.
   */
  it("C4b: Sedes slug HighLight uses hardcoded color #00c3ff56 (defect present)", () => {
    expect(sedesSlugSrc).toContain('color="#00c3ff56"');
  });

  /**
   * C5a — app/sedes/[slug]/page.tsx
   * The `BabysVideoPlayer` component is still defined in the file.
   * After fix the component and its helpers (PlayIcon, PauseIcon, VolumeIcon) should be deleted.
   */
  it("C5a: BabysVideoPlayer component is defined (defect present)", () => {
    expect(sedesSlugSrc).toMatch(/function BabysVideoPlayer/);
  });

  /**
   * C5b — app/sedes/[slug]/page.tsx
   * The carousel container has the `lg:aspect-auto` class.
   * After fix `lg:aspect-auto` should be removed so the carousel stays aspect-square on all viewports.
   */
  it("C5b: Carousel container has lg:aspect-auto class (defect present)", () => {
    expect(sedesSlugSrc).toContain("lg:aspect-auto");
  });

  /**
   * C5c — app/sedes/[slug]/page.tsx
   * The carousel video element uses the `autoPlay` attribute.
   * After fix the video should use `controls` without `autoPlay`.
   */
  it("C5c: Carousel video uses autoPlay attribute (defect present)", () => {
    expect(sedesSlugSrc).toContain("autoPlay");
  });

  /**
   * C6 — components/Servicios.tsx
   * The image container div has an explicit `border:` property in a template-literal inline style.
   * After fix the border should be removed; only borderRadius and overflow should remain.
   */
  it("C6: Servicios image container div has explicit border: style with template literal (defect present)", () => {
    expect(serviciosSrc).toMatch(/style=\{\{\s*border:\s*`/);
  });

  /**
   * C7 — components/Servicios.tsx
   * NeonGradientCard inside servicios.map has `borderSize={2}`.
   * After fix it should be `borderSize={4}` to match the Nosotros cards.
   */
  it("C7: NeonGradientCard in servicios.map has borderSize={2} (defect present)", () => {
    expect(serviciosSrc).toContain("borderSize={2}");
  });

  /**
   * C8 — components/Hero.tsx
   * The sticker motion.div ternary uses "90px" for index < 2.
   * After fix it should use "100px".
   */
  it('C8: Hero sticker ternary uses "90px" (defect present)', () => {
    expect(heroSrc).toContain('"90px"');
  });
});
