/**
 * Bug Condition Verification Tests — Round 4 (Post-Fix)
 *
 * These tests assert the FIXED / CORRECT state of the codebase.
 * Each test verifies that the previously-reported defect is no longer present
 * and that the correct implementation is in place.
 *
 * All 10 assertions PASS after fixes are applied.
 *
 * Validates: Requirements 2.1, 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, it, expect } from "vitest";

function readSource(relativePath: string): string {
  return readFileSync(resolve(process.cwd(), relativePath), "utf-8");
}

describe("Bug Condition Verification — Round 4 (assert fixes ARE in place)", () => {

  /**
   * C1 — Nosotros.tsx
   * Transition mask now uses "linear-gradient(to top, black 0%, transparent 100%)"
   * The old symmetric 4-stop gradient is gone.
   */
  it("C1: Nosotros transition div uses upward fade gradient (fixed)", () => {
    const src = readSource("components/Nosotros.tsx");
    expect(src).toContain("linear-gradient(to top, black 0%, transparent 100%)");
    expect(src).not.toContain("linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)");
  });

  /**
   * C2 — Contacto.tsx
   * Tint values are now at 0.20 opacity (clearly visible).
   * The old 0.06 values are gone.
   */
  it("C2: Contacto tint opacity is 0.20 (fixed)", () => {
    const src = readSource("components/Contacto.tsx");
    expect(src).toContain("rgba(79,240,132,0.20)");
    expect(src).toContain("rgba(122,192,255,0.20)");
    expect(src).toContain("rgba(255,120,147,0.20)");
    expect(src).toContain("rgba(255,252,1,0.20)");
    expect(src).not.toContain("rgba(79,240,132,0.06)");
  });

  /**
   * C4 — app/sedes/[slug]/page.tsx
   * Description <p> now uses font-bold and color #1e293b.
   * The old font-extrabold on the description is gone.
   */
  it("C4: Sedes slug description <p> uses font-bold and color #1e293b (fixed)", () => {
    const src = readSource("app/sedes/[slug]/page.tsx");
    // The description paragraph now has font-bold and inline color #1e293b
    expect(src).toContain("font-bold");
    expect(src).toContain('"#1e293b"');
    // font-extrabold on the description is gone
    expect(src).not.toContain("font-extrabold");
    // The description paragraph no longer has text-slate-500 (it's only on the address <p> now)
    // Check that the description <p> specifically does not have text-slate-500
    const descParagraph = src.match(/max-w-4xl mx-auto mt-8[^>]*>/);
    expect(descParagraph).toBeTruthy();
    expect(descParagraph![0]).not.toContain("text-slate-500");
  });

  /**
   * C4b — app/sedes/[slug]/page.tsx
   * HighLight now uses sede.color + CC (sede-themed).
   * The hardcoded #00c3ff56 is gone.
   */
  it("C4b: Sedes slug HighLight uses sede-themed color (fixed)", () => {
    const src = readSource("app/sedes/[slug]/page.tsx");
    expect(src).toContain("sede.color}CC");
    expect(src).not.toContain('color="#00c3ff56"');
  });

  /**
   * C5a — app/sedes/[slug]/page.tsx
   * BabysVideoPlayer component is removed.
   * The unified carousel is used for all sedes.
   */
  it("C5a: BabysVideoPlayer component is removed (fixed)", () => {
    const src = readSource("app/sedes/[slug]/page.tsx");
    expect(src).not.toMatch(/function BabysVideoPlayer/);
    expect(src).not.toMatch(/function PlayIcon/);
    expect(src).not.toMatch(/function PauseIcon/);
    expect(src).not.toMatch(/function VolumeIcon/);
    expect(src).not.toContain('slug === "babys"');
  });

  /**
   * C5b — app/sedes/[slug]/page.tsx
   * Carousel container no longer has lg:aspect-auto.
   * It always uses aspect-square.
   */
  it("C5b: Carousel container uses aspect-square (no lg:aspect-auto) (fixed)", () => {
    const src = readSource("app/sedes/[slug]/page.tsx");
    expect(src).toContain("aspect-square");
    expect(src).not.toContain("lg:aspect-auto");
  });

  /**
   * C5c — app/sedes/[slug]/page.tsx
   * Carousel video uses native controls, no autoPlay.
   * Lightbox is wired up.
   */
  it("C5c: Carousel video uses controls (no autoPlay), lightbox is present (fixed)", () => {
    const src = readSource("app/sedes/[slug]/page.tsx");
    expect(src).toContain("controls");
    expect(src).not.toContain("autoPlay");
    expect(src).toContain("lightboxOpen");
    expect(src).toContain("yet-another-react-lightbox");
  });

  /**
   * C6 — components/Servicios.tsx
   * Image container div has no explicit border: style.
   * borderRadius: 8px and overflow: hidden remain.
   */
  it("C6: Servicios image container div has no explicit border: style (fixed)", () => {
    const src = readSource("components/Servicios.tsx");
    expect(src).not.toMatch(/style=\{\{\s*border:\s*`/);
    expect(src).toContain('borderRadius: "8px"');
    expect(src).toContain('overflow: "hidden"');
  });

  /**
   * C7 — components/Servicios.tsx
   * NeonGradientCard inside servicios.map has borderSize={4}.
   * The old borderSize={2} is gone.
   */
  it("C7: NeonGradientCard in servicios.map has borderSize={4} (fixed)", () => {
    const src = readSource("components/Servicios.tsx");
    expect(src).toContain("borderSize={4}");
    expect(src).not.toContain("borderSize={2}");
  });

  /**
   * C8 — components/Hero.tsx
   * Sticker ternary uses "100px" for index < 2.
   * The old "90px" is gone.
   */
  it('C8: Hero sticker ternary uses "100px" (fixed)', () => {
    const src = readSource("components/Hero.tsx");
    expect(src).toContain('"100px"');
    expect(src).not.toContain('"90px"');
  });
});
