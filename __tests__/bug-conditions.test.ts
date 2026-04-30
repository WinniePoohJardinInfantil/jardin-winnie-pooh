/**
 * Bug Condition Exploration Test
 * 
 * This test MUST FAIL on unfixed code — failure confirms each defect exists.
 * DO NOT fix the code when it fails.
 * 
 * This test uses static source-code analysis (reading files as strings) to avoid
 * complex mocking requirements for Next.js, Framer Motion, Supabase, etc.
 */

import { describe, test, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

// Helper to read source files
function readSource(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf-8");
}

describe("Bug Condition Exploration - All 14 UI Defects", () => {
  
  test("C1: Navbar desktop link has fontWeight: 600 and fontSize: 0.9rem", () => {
    const source = readSource("components/Navbar.tsx");
    
    // Assert fontWeight: 600 is present in desktop link style
    expect(source).toMatch(/fontWeight:\s*600/);
    
    // Assert fontSize: "0.9rem" is present in desktop link style
    expect(source).toMatch(/fontSize:\s*["']0\.9rem["']/);
  });

  test("C2: Hero '7 idiomas' HighLight does NOT have type=\"underline\" prop", () => {
    const source = readSource("components/Hero.tsx");
    
    // Find the "7 idiomas" HighLight instance
    const idiomasHighlightMatch = source.match(
      /<HighLight[^>]*color=["']#00c3ff56["'][^>]*>7 idiomas<\/HighLight>/
    );
    
    expect(idiomasHighlightMatch).toBeTruthy();
    
    // Assert it does NOT have type="underline"
    const hasUnderlineType = idiomasHighlightMatch![0].includes('type="underline"');
    expect(hasUnderlineType).toBe(false);
  });

  test("C3: Stats sticker containers at index 0 and 1 do NOT have conditional sizing (all use same 70px)", () => {
    const source = readSource("components/Hero.tsx");
    
    // Assert there's no conditional sizing based on index (no "index < 2" or similar)
    // The fix would introduce something like: index < 2 ? "90px" : "70px"
    expect(source).not.toMatch(/index\s*<\s*2/);
    
    // Assert the sticker container uses 70px (hardcoded for all, not conditional)
    // The stats.map section has a motion.div with width/height 70px
    expect(source).toMatch(/width:\s*["']70px["']/);
    expect(source).toMatch(/height:\s*["']70px["']/);
  });

  test("C4: highlighter.tsx default action is 'highlight' not 'underline'", () => {
    const source = readSource("components/ui/highlighter.tsx");
    
    // Assert the default parameter is action = "highlight"
    expect(source).toMatch(/action\s*=\s*["']highlight["']/);
  });

  test("C5: Nosotros.tsx source contains 🎯 and 📅 emoji characters", () => {
    const source = readSource("components/Nosotros.tsx");
    
    // Assert both emojis are present in the source
    expect(source).toContain("🎯");
    expect(source).toContain("📅");
  });

  test("C6: Nosotros card header flex row does NOT have justifyContent: 'center'", () => {
    const source = readSource("components/Nosotros.tsx");
    
    // The card header flex row is the outer div containing the emoji icon div + h3 title.
    // It has: display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem"
    // The bug: this outer row does NOT have justifyContent: "center"
    // (The inner emoji icon div does have justifyContent: "center", but that's a different element)
    
    // Assert the outer header row (identified by gap: "1rem" and marginBottom: "2rem") 
    // does NOT have justifyContent: "center" on the same style object
    const headerRowPattern = /display:\s*["']flex["'][^}]*gap:\s*["']1rem["'][^}]*marginBottom:\s*["']2rem["'][^}]*justifyContent:\s*["']center["']/;
    expect(source).not.toMatch(headerRowPattern);
    
    // Also verify the outer header row exists (to confirm we're testing the right thing)
    const headerRowExists = source.match(/display:\s*["']flex["'][^}]*alignItems:\s*["']center["'][^}]*gap:\s*["']1rem["'][^}]*marginBottom:\s*["']2rem["']/);
    expect(headerRowExists).toBeTruthy();
  });

  test("C7: 'Horarios disponibles' element has fontSize: '1.2rem' and color: '#EB8100'", () => {
    const source = readSource("components/Nosotros.tsx");
    
    // Find the Horarios disponibles section
    expect(source).toContain("Horarios disponibles");
    
    // Assert fontSize: "1.2rem" is present
    expect(source).toMatch(/fontSize:\s*["']1\.2rem["']/);
    
    // Assert color: "#EB8100" is present
    expect(source).toMatch(/color:\s*["']#EB8100["']/);
  });

  test("C8: NeonGradientCard in Nosotros does NOT have explicit borderSize prop", () => {
    const source = readSource("components/Nosotros.tsx");
    
    // Assert NeonGradientCard is used
    expect(source).toContain("NeonGradientCard");
    
    // Assert no borderSize prop is passed (would appear as borderSize={...})
    expect(source).not.toMatch(/borderSize\s*=\s*\{/);
  });

  test("C9: Sedes address <p> has class text-[0.95rem]", () => {
    const source = readSource("components/Sedes.tsx");
    
    // Assert the text-[0.95rem] class is present
    expect(source).toMatch(/text-\[0\.95rem\]/);
  });

  test("C10: Sedes section does NOT contain sedes-bg image reference", () => {
    const source = readSource("components/Sedes.tsx");
    
    // Assert no reference to sedes-bg image
    expect(source).not.toContain("sedes-bg");
  });

  test("C11: Sedes card boxShadow does NOT contain 'inset'", () => {
    const source = readSource("components/Sedes.tsx");
    
    // Find boxShadow declarations
    const boxShadowMatches = source.match(/boxShadow:\s*["`'][^"`']*["`']/g);
    expect(boxShadowMatches).toBeTruthy();
    
    // Assert none contain "inset"
    const hasInset = boxShadowMatches!.some(match => match.includes("inset"));
    expect(hasInset).toBe(false);
  });

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

  test("C13: Servicios card <h3> renders {s.titulo} as a plain string, not via a ColoredTitle helper", () => {
    const source = readSource("components/Servicios.tsx");
    
    // Assert there's no ColoredTitle component defined
    expect(source).not.toMatch(/function\s+ColoredTitle/);
    expect(source).not.toMatch(/const\s+ColoredTitle/);
    
    // Assert the h3 contains {s.titulo} directly
    expect(source).toMatch(/<h3[^>]*>\s*\{s\.titulo\}\s*<\/h3>/);
  });

  test("C14a: Servicios card inner div has bg-white/95 class", () => {
    const source = readSource("components/Servicios.tsx");
    
    // Assert bg-white/95 class is present
    expect(source).toMatch(/bg-white\/95/);
  });

  test("C14b: Servicios decorative elements use .webp images", () => {
    const source = readSource("components/Servicios.tsx");
    
    // Assert .webp images are used in decorative elements
    const webpMatches = source.match(/\.webp/g);
    expect(webpMatches).toBeTruthy();
    expect(webpMatches!.length).toBeGreaterThanOrEqual(3);
    
    // Assert the specific decorative images are present
    expect(source).toContain("winnie-piggy.webp");
    expect(source).toContain("winnie-feliz.webp");
    expect(source).toContain("winnie-estrellas.webp");
  });
});
