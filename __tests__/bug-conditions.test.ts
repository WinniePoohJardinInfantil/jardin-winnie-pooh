/**
 * Bug Condition Verification Test (Post All 3 Rounds of Fixes)
 *
 * These tests assert the FIXED / CORRECT state of the codebase.
 * Each test verifies that the previously-reported defect is no longer present
 * and that the correct implementation is in place.
 *
 * Uses static source-code analysis (reading files as strings) to avoid
 * complex mocking requirements for Next.js, Framer Motion, Supabase, etc.
 */

import { describe, test, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

// Helper to read source files
function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf-8");
}

describe("Bug Condition Verification - All 14 UI Fixes (assert fixes ARE in place)", () => {

  // C1: Navbar desktop link now has fontWeight: 700 and fontSize: "1.05rem"
  test("C1: Navbar desktop link has fontWeight: 700 and fontSize: 1.05rem (fixed)", () => {
    const source = readSource("components/Navbar.tsx");

    // Assert fontWeight: 700 is present in desktop link style
    expect(source).toMatch(/fontWeight:\s*700/);

    // Assert fontSize: "1.05rem" is present in desktop link style
    expect(source).toMatch(/fontSize:\s*["']1\.05rem["']/);

    // Assert the old defective values are gone
    expect(source).not.toMatch(/fontWeight:\s*600/);
    expect(source).not.toMatch(/fontSize:\s*["']0\.9rem["']/);
  });

  // C2: Hero "7 idiomas" HighLight now HAS type="underline"
  test("C2: Hero '7 idiomas' HighLight HAS type=\"underline\" prop (fixed)", () => {
    const source = readSource("components/Hero.tsx");

    // The "7 idiomas" highlight should now have type="underline"
    // Match the HighLight with color="#00c3ff56" and type="underline" containing "7 idiomas"
    const idiomasSection = source.match(/7 idiomas[\s\S]{0,200}/);
    expect(idiomasSection).toBeTruthy();

    // Assert type="underline" is present near "7 idiomas"
    const nearbyContext = source.match(/HighLight[^>]*7 idiomas|7 idiomas[^<]*<\/HighLight>|<HighLight[\s\S]{0,100}7 idiomas/);
    expect(nearbyContext).toBeTruthy();

    // Assert the full HighLight with underline type and the 7 idiomas text is present
    expect(source).toMatch(/type=["']underline["'][\s\S]{0,50}7 idiomas|7 idiomas[\s\S]{0,50}type=["']underline["']|<HighLight[^>]*type=["']underline["'][^>]*>7 idiomas/);
  });

  // C3: Stats sticker containers DO have conditional sizing (index < 2)
  test("C3: Stats sticker containers have conditional sizing based on index < 2 (fixed)", () => {
    const source = readSource("components/Hero.tsx");

    // Assert conditional sizing IS present
    expect(source).toMatch(/index\s*<\s*2/);

    // Assert the larger size (90px) is used for first two stickers
    expect(source).toMatch(/["']90px["']/);
  });

  // C4: highlighter.tsx default action is now "underline" (not "highlight")
  test("C4: highlighter.tsx default action is 'underline' (fixed)", () => {
    const source = readSource("components/ui/highlighter.tsx");

    // Assert the default parameter is action = "underline"
    expect(source).toMatch(/action\s*=\s*["']underline["']/);

    // Assert the old defective default is gone
    expect(source).not.toMatch(/action\s*=\s*["']highlight["']/);
  });

  // C5: Nosotros.tsx does NOT contain 🎯 and 📅 emojis
  test("C5: Nosotros.tsx does NOT contain 🎯 and 📅 emoji characters (fixed)", () => {
    const source = readSource("components/Nosotros.tsx");

    // Assert both emojis are gone
    expect(source).not.toContain("🎯");
    expect(source).not.toContain("📅");
  });

  // C6: Nosotros card header flex row DOES have justifyContent: "center"
  test("C6: Nosotros card header flex row HAS justifyContent: 'center' (fixed)", () => {
    const source = readSource("components/Nosotros.tsx");

    // The card header flex row (display: flex, alignItems: center, gap: 1rem, marginBottom: 2rem)
    // should now include justifyContent: "center"
    const headerRowPattern = /display:\s*["']flex["'][^}]*gap:\s*["']1rem["'][^}]*marginBottom:\s*["']2rem["'][^}]*justifyContent:\s*["']center["']/;
    expect(source).toMatch(headerRowPattern);
  });

  // C7: "Horarios disponibles" has fontSize: "1.5rem" and color: "#00C2FF"
  test("C7: 'Horarios disponibles' element has fontSize: '1.5rem' and color: '#00C2FF' (fixed)", () => {
    const source = readSource("components/Nosotros.tsx");

    expect(source).toContain("Horarios disponibles");

    // The <p> element containing "Horarios disponibles" has its style defined before the text.
    // Capture the style block that immediately precedes the "Horarios disponibles" text.
    // We look for a <p style={{ ... }}> block within 400 chars before the text.
    const horariosSection = source.match(/<p style=\{\{[\s\S]{0,400}Horarios disponibles/);
    expect(horariosSection).toBeTruthy();

    // Assert fontSize: "1.5rem" is present in the Horarios <p> style
    expect(horariosSection![0]).toMatch(/fontSize:\s*["']1\.5rem["']/);

    // Assert color: "#00C2FF" is present in the Horarios <p> style
    expect(horariosSection![0]).toMatch(/color:\s*["']#00C2FF["']/);

    // Assert the old defective fontSize is gone from the Horarios section
    expect(horariosSection![0]).not.toMatch(/fontSize:\s*["']1\.2rem["']/);
  });

  // C8: NeonGradientCard in Nosotros DOES have explicit borderSize prop
  test("C8: NeonGradientCard in Nosotros HAS explicit borderSize prop (fixed)", () => {
    const source = readSource("components/Nosotros.tsx");

    // Assert NeonGradientCard is used
    expect(source).toContain("NeonGradientCard");

    // Assert borderSize prop IS present
    expect(source).toMatch(/borderSize\s*=\s*\{/);
  });

  // C9: Sedes address <p> has class text-[1.1rem] (not 0.95rem)
  test("C9: Sedes address <p> has class text-[1.1rem] (fixed)", () => {
    const source = readSource("components/Sedes.tsx");

    // Assert the correct text size class is present
    expect(source).toMatch(/text-\[1\.1rem\]/);

    // Assert the old defective class is gone
    expect(source).not.toMatch(/text-\[0\.95rem\]/);
  });

  // C10: Sedes section DOES contain sedes-bg image reference
  test("C10: Sedes section DOES contain sedes-bg image reference (fixed)", () => {
    const source = readSource("components/Sedes.tsx");

    // Assert sedes-bg image IS referenced
    expect(source).toContain("sedes-bg");
  });

  // C11: Sedes card boxShadow DOES contain "inset"
  test("C11: Sedes card boxShadow DOES contain 'inset' (fixed)", () => {
    const source = readSource("components/Sedes.tsx");

    // Find boxShadow declarations
    const boxShadowMatches = source.match(/boxShadow:\s*`[^`]*`/g);
    expect(boxShadowMatches).toBeTruthy();

    // Assert at least one contains "inset"
    const hasInset = boxShadowMatches!.some(match => match.includes("inset"));
    expect(hasInset).toBe(true);
  });

  // C12: sedesData does NOT contain key 'jardin-infantil' (unchanged — was already correct)
  test("C12: sedesData does NOT contain key 'jardin-infantil' (EXPECTED TO PASS)", () => {
    const source = readSource("app/sedes/[slug]/page.tsx");

    // Extract sedesData object keys
    const sedesDataMatch = source.match(/const sedesData[^=]*=\s*\{([\s\S]*?)\n\};/);
    expect(sedesDataMatch).toBeTruthy();

    const sedesDataContent = sedesDataMatch![1];

    // Assert "jardin-infantil" is NOT a key
    expect(sedesDataContent).not.toMatch(/["']jardin-infantil["']\s*:/);

    // Verify the correct keys exist
    expect(sedesDataContent).toMatch(/["']babys["']\s*:/);
    expect(sedesDataContent).toMatch(/["']jardin["']\s*:/);
    expect(sedesDataContent).toMatch(/["']after-class["']\s*:/);
  });

  // C13: Servicios card titles use AuroraText (post-round-3)
  test("C13: Servicios card titles use AuroraText (post-round-3)", () => {
    const source = readSource("components/Servicios.tsx");

    // After round 3: ColoredTitle replaced with AuroraText + AURORA_PALETTES
    expect(source).toContain("AuroraText");
    expect(source).toMatch(/<AuroraText\s+colors=\{AURORA_PALETTES\[i\]\}/);

    // Assert ColoredTitle is gone
    expect(source).not.toMatch(/function\s+ColoredTitle/);
    expect(source).not.toMatch(/const\s+ColoredTitle/);

    // Assert AURORA_PALETTES is defined
    expect(source).toMatch(/const\s+AURORA_PALETTES\s*=/);
  });

  test("C14a: Servicios card inner div has neutral white background (post-round-3)", () => {
    const source = readSource("components/Servicios.tsx");

    // After round 3: bg-white/95 replaced with rgba(255,255,255,0.85)
    expect(source).toContain("rgba(255,255,255,0.85)");

    // Assert the old bg-white/95 class is gone
    expect(source).not.toMatch(/bg-white\/95/);
  });

  test("C14b: Servicios decorative elements use character PNG images at corners", () => {
    const source = readSource("components/Servicios.tsx");

    // After round 1+2+3 fixes: .webp stickers replaced with .png corner characters
    expect(source).toContain("winnie-globo.png");
    expect(source).toContain("elefante-globo.png");
    expect(source).toContain("tigger-globo.png");
    expect(source).toContain("piggy-globo.png");

    // Assert the old .webp stickers are gone
    expect(source).not.toContain("winnie-piggy.webp");
    expect(source).not.toContain("winnie-feliz.webp");
    expect(source).not.toContain("winnie-estrellas.webp");
  });
});
