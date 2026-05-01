# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - 8 UI Rendering Defects (Round 4)
  - **CRITICAL**: This test MUST FAIL on unfixed code — failure confirms the bugs exist
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior — it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate all 8 bugs exist
  - **Scoped PBT Approach**: Each assertion targets the concrete defective state in the source file (static source-code analysis — read files as strings, assert on content)
  - Create `__tests__/bug-conditions-round4.test.ts` with the following assertions (all must FAIL on unfixed code):
    - C1 (Nosotros.tsx): transition div maskImage is the symmetric 4-stop gradient — assert source contains `"linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"` (this string must NOT be present after fix)
    - C2 (Contacto.tsx): tint values are at 0.06 opacity — assert source contains `"rgba(79,240,132,0.06)"` (must NOT be present after fix)
    - C4 (app/sedes/[slug]/page.tsx): description `<p>` has `text-slate-500` class — assert source contains `text-slate-500` in the description paragraph (must NOT be present after fix)
    - C4b (app/sedes/[slug]/page.tsx): HighLight in description uses hardcoded `#00c3ff56` — assert source contains `color="#00c3ff56"` in the description HighLight (must NOT be present after fix)
    - C5a (app/sedes/[slug]/page.tsx): `BabysVideoPlayer` component is defined — assert source matches `/function BabysVideoPlayer/`
    - C5b (app/sedes/[slug]/page.tsx): carousel container has `lg:aspect-auto` — assert source contains `lg:aspect-auto`
    - C5c (app/sedes/[slug]/page.tsx): carousel video uses `autoPlay` — assert source contains `autoPlay` inside the carousel AnimatePresence block
    - C6 (components/Servicios.tsx): image container div has an explicit `border:` style — assert source matches `/style=\{\{[^}]*border:\s*`/ in the image container div
    - C7 (components/Servicios.tsx): NeonGradientCard in servicios.map has `borderSize={2}` — assert source contains `borderSize={2}` inside the `servicios.map` block
    - C8 (components/Hero.tsx): sticker ternary uses `"90px"` — assert source contains `"90px"` in the sticker motion.div style
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct — it proves the bugs exist)
  - Document counterexamples found (e.g., "symmetric mask gradient still present", "tint still at 0.06", "BabysVideoPlayer still defined", "lg:aspect-auto still in carousel", "border still on image container", "borderSize still 2", "sticker still 90px")
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 2.1, 4.1, 5.1, 5.2, 5.3, 5.4, 6.1, 7.1, 8.1_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - All Non-Buggy Rendering States Unchanged
  - **IMPORTANT**: Follow observation-first methodology — observe current source, write tests that assert those patterns
  - Create `__tests__/preservation-round4.test.ts` with the following assertions (all must PASS on unfixed code):
    - P1 (Nosotros.tsx): section content preserved — assert source contains `misionPuntos`, `AnimatePresence`, `expandedIndex`, `NeonGradientCard`, `borderSize={4}`, and `"Propósito"` heading
    - P2 (Nosotros.tsx): transition container structure preserved — assert source contains `height: "200px"`, `overflow: "hidden"`, `pointerEvents: "none"`, and `marginBottom: "-2px"`
    - P3 (Contacto.tsx): right column preserved — assert source contains `"Nuestras Ubicaciones"`, `BorderBeam`, `"Horarios Disponibles"`, `PulsatingButton`, and both sede addresses (`"Calle 51"` and `"Carrera 81"`)
    - P4 (Contacto.tsx): contact card structure preserved — assert source contains all four `label` values (`"WhatsApp"`, `"Correo"`, `"Instagram"`, `"Reseñas Google"`) and `onMouseEnter` / `onMouseLeave` handlers
    - P5 property: for each of the 4 contact entries, the `bg` value (e.g. `"#4FF08422"`) is still present in source (icon background unchanged)
    - P6 (app/sedes/[slug]/page.tsx): info card preserved — assert source contains `"Detalles"`, `sede.edades`, `sede.servicios`, `MapPin`, `"¡Preguntar Ahora!"`, and `whatsappLink`
    - P7 (app/sedes/[slug]/page.tsx): map NeonGradientCard preserved — assert source contains `sede.mapaUrl`, `<iframe`, and `NeonGradientCard` with `borderRadius={56}`
    - P8 (app/sedes/[slug]/page.tsx): carousel navigation preserved — assert source contains `ChevronLeft`, `ChevronRight`, `fotoAnterior`, `proximaFoto`, and dot indicator buttons
    - P9 (app/sedes/[slug]/page.tsx): sedesData keys preserved — assert source contains `"babys"`, `"jardin"`, and `"after-class"` as top-level keys in `sedesData`
    - P10 (components/Servicios.tsx): Lens effect and card content preserved — assert source contains `<Lens>`, `AuroraText`, `SparklesText`, `"Experiencias que acompañan"`, and all 12 `titulo` strings
    - P11 (components/Servicios.tsx): decorative corner characters preserved — assert source contains `"winnie-globo.png"`, `"elefante-globo.png"`, `"tigger-globo.png"`, `"piggy-globo.png"`, and `hidden xl:block`
    - P12 (components/Hero.tsx): stat card container preserved — assert source contains `width: "220px"`, `height: "200px"`, `NumberTicker`, and all three `stat.label` strings
    - P13 (components/Hero.tsx): sticker index 2 preserved — assert source contains `"70px"` in the sticker ternary (the else branch for index 2 must remain)
    - P14 (app/galeria/page.tsx): Galería page completely unmodified — assert source still contains `"yet-another-react-lightbox"`, `"Nuestros Momentos Mágicos"`, and `columnCount`
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: All tests PASS (confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and all passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10_

- [x] 3. Fix Nosotros transition mask (Bug 1) — components/Nosotros.tsx

  - [x] 3.1 Implement the fix
    - In the transition `<div>` after the closing `</section>` tag, change `maskImage` and `WebkitMaskImage` from:
      `"linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"`
      to:
      `"linear-gradient(to top, black 0%, transparent 100%)"`
    - Leave the outer container div (`height: "200px"`, `overflow: "hidden"`, `pointerEvents: "none"`, `marginBottom: "-2px"`), the `<Image src="/images/sedes-bg.jpg">`, and the radial gradient overlay div completely unchanged
    - _Bug_Condition: transition div maskImage == "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"_
    - _Expected_Behavior: maskImage == "linear-gradient(to top, black 0%, transparent 100%)" — image fades upward cleanly_
    - _Preservation: all Nosotros section content, NeonGradientCard layout, accordion items, z-index, and padding unchanged_
    - _Requirements: 2.1, 3.1, 3.2_

- [x] 4. Fix Contacto card tint opacity (Bug 2) — components/Contacto.tsx

  - [x] 4.1 Implement the fix
    - In the `contactos` array, update the `tint` property of all four entries from `0.06` to `0.20`:
      - WhatsApp: `"rgba(79,240,132,0.06)"` → `"rgba(79,240,132,0.20)"`
      - Correo: `"rgba(122,192,255,0.06)"` → `"rgba(122,192,255,0.20)"`
      - Instagram: `"rgba(255,120,147,0.06)"` → `"rgba(255,120,147,0.20)"`
      - Google: `"rgba(255,252,1,0.06)"` → `"rgba(255,252,1,0.20)"`
    - Leave all other properties in each entry (`icon`, `label`, `valor`, `href`, `color`, `bg`) completely unchanged
    - Leave the right column (locations, hours, BorderBeam, PulsatingButton) and all hover effects unchanged
    - _Bug_Condition: tint opacity == 0.06 for any of the four contact entries_
    - _Expected_Behavior: tint opacity == 0.20 for all four entries — clearly visible pastel card backgrounds_
    - _Preservation: text, icons, hrefs, layout, hover effects, border colors, bg values, and right column all unchanged_
    - _Requirements: 2.2, 3.3, 3.9_

- [ ] 5. Fix Sedes slug description styling and carousel (Bugs 4 & 5) — app/sedes/[slug]/page.tsx

  - [ ] 5.1 Fix description paragraph styling (Bug 4)
    - Change the `<p>` className from:
      `"text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto mt-8 font-extrabold leading-relaxed"`
      to:
      `"text-xl md:text-2xl max-w-4xl mx-auto mt-8 font-bold leading-relaxed"`
      and add `style={{ color: "#1e293b" }}`
    - Change `<HighLight color="#00c3ff56" type="underline">` to `` <HighLight color={`${sede.color}CC`} type="underline"> ``
    - Leave the `SparklesText`/`AuroraText` title, the `h1` structure, and all other header content unchanged
    - _Bug_Condition: description <p> has text-slate-500 AND font-extrabold; HighLight color is hardcoded #00c3ff56_
    - _Expected_Behavior: <p> color is #1e293b with font-bold; HighLight color is ${sede.color}CC (sede-themed, 80% opacity)_
    - _Preservation: title block, info card, map, carousel navigation, Navbar, Footer, WhatsAppButton all unchanged_
    - _Requirements: 2.4, 3.4, 3.5_

  - [~] 5.2 Remove BabysVideoPlayer and unify carousel (Bug 5a, 5d)
    - Delete the `BabysVideoPlayer` function component entirely from the file
    - Delete the `PlayIcon`, `PauseIcon`, and `VolumeIcon` helper components entirely
    - Remove the `useRef` import if it is no longer used anywhere else in the file
    - Replace the entire `{slug === "babys" ? (...) : (...)}` ternary in the media column with the unified carousel JSX (the current `else` branch), so all sedes use the same carousel
    - Inside the carousel's `AnimatePresence`, change the video branch from:
      `<video src={...} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />`
      to:
      `<video src={...} controls className="w-full h-full object-contain" />`
    - _Bug_Condition: BabysVideoPlayer defined AND slug==="babys" conditional branch present AND video uses autoPlay_
    - _Expected_Behavior: single unified carousel for all sedes; video renders with native controls, no autoPlay_
    - _Preservation: carousel navigation arrows, dot indicators, AnimatePresence, fotoActual state all unchanged_
    - _Requirements: 2.5, 2.7, 2.8, 3.6_

  - [~] 5.3 Fix carousel aspect ratio and add lightbox (Bug 5b, 5c)
    - Change the carousel container's className from:
      `"relative w-full aspect-square lg:aspect-auto rounded-[4rem] overflow-hidden ..."`
      to:
      `"relative w-full aspect-square rounded-[4rem] overflow-hidden ..."` (remove `lg:aspect-auto`)
    - Add imports at the top of the file:
      ```tsx
      import Lightbox from "yet-another-react-lightbox";
      import Video from "yet-another-react-lightbox/plugins/video";
      import "yet-another-react-lightbox/styles.css";
      ```
    - Add state: `const [lightboxOpen, setLightboxOpen] = useState(false);`
    - Build a `slides` array from `sede.fotos` using the same pattern as `app/galeria/page.tsx`:
      - Video files (`.mp4`, `.webm`): `{ type: "video" as const, sources: [{ src, type: "video/mp4" }] }`
      - Image files: `{ src }`
    - Wrap each carousel item's `motion.div` (the one inside `AnimatePresence`) with an `onClick` handler that calls `setLightboxOpen(true)` (fotoActual is already set by the existing navigation)
    - Render `<Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} slides={slides} index={fotoActual} plugins={[Video]} />` just before the closing `</main>` tag
    - _Bug_Condition: carousel has lg:aspect-auto AND clicking carousel item does not open lightbox_
    - _Expected_Behavior: carousel always aspect-square; clicking any item opens Lightbox at correct index_
    - _Preservation: carousel navigation arrows, dot indicators, info card, map, Navbar, Footer all unchanged_
    - _Requirements: 2.5, 2.6, 3.5, 3.6_

- [ ] 6. Fix Servicios image border and NeonGradientCard borderSize (Bugs 6 & 7) — components/Servicios.tsx

  - [~] 6.1 Remove image container border (Bug 6)
    - On the `<div>` wrapping the glow div and `<Lens>` (currently has `style={{ border: \`2px solid ${Site_Palette[i % 6]}\`, borderRadius: "12px" }}`), change the inline style to:
      `style={{ borderRadius: "8px", overflow: "hidden" }}`
    - Remove the `border` property entirely; keep `borderRadius` and add `overflow: "hidden"` to ensure the Lens zoom effect is still clipped cleanly
    - Leave the `<Lens>` component, the glow `div`, the `<Image>` element, and all other card content unchanged
    - _Bug_Condition: image container div has border: `2px solid ${color}` leaving visible gap around object-contain image_
    - _Expected_Behavior: image container has no border; borderRadius: 8px and overflow: hidden remain_
    - _Preservation: Lens hover/zoom effect fully functional; AuroraText titles, description highlights, card layout unchanged_
    - _Requirements: 2.9, 3.7_

  - [~] 6.2 Increase NeonGradientCard borderSize (Bug 7)
    - In the `servicios.map()` render, change `borderSize={2}` to `borderSize={4}` on every `NeonGradientCard`
    - Leave all other `NeonGradientCard` props (`className`, `borderRadius`, `neonColors`) unchanged
    - _Bug_Condition: NeonGradientCard in servicios.map has borderSize={2} (thinner than Nosotros cards)_
    - _Expected_Behavior: borderSize={4} — visually consistent with the 4px border used in Nosotros cards_
    - _Preservation: all other NeonGradientCard props, card content, Lens effect, and section layout unchanged_
    - _Requirements: 2.10, 3.7_

- [ ] 7. Fix Hero sticker sizes (Bug 8) — components/Hero.tsx

  - [~] 7.1 Implement the fix
    - In the sticker `motion.div` style object, change the ternary from:
      `width: index < 2 ? "90px" : "70px", height: index < 2 ? "90px" : "70px"`
      to:
      `width: index < 2 ? "100px" : "70px", height: index < 2 ? "100px" : "70px"`
    - Leave the stat card container dimensions (220×200px), `NumberTicker`, label text, border, background, and the sticker for index 2 (70×70px) completely unchanged
    - _Bug_Condition: sticker motion.div for index 0 and 1 has width/height "90px"_
    - _Expected_Behavior: sticker width/height for index 0 and 1 is "100px"; index 2 remains "70px"_
    - _Preservation: stat card container (220×200px), number tickers, labels, borders, and index 2 sticker all unchanged_
    - _Requirements: 2.11, 3.8_

- [ ] 8. Verify bug condition exploration test now passes

  - [~] 8.1 Re-run the SAME test from task 1
    - **Property 1: Expected Behavior** - 8 UI Rendering Defects (Round 4)
    - **IMPORTANT**: Re-run `__tests__/bug-conditions-round4.test.ts` — do NOT write a new test
    - The test from task 1 encodes the expected behavior for all 8 fixes
    - Run: `npx vitest run __tests__/bug-conditions-round4.test.ts`
    - **EXPECTED OUTCOME**: All assertions PASS (confirms all bugs are fixed)
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11_

  - [ ] 8.2 Verify preservation tests still pass
    - **Property 2: Preservation** - All Non-Buggy Rendering States Unchanged
    - **IMPORTANT**: Re-run `__tests__/preservation-round4.test.ts` — do NOT write new tests
    - Run: `npx vitest run __tests__/preservation-round4.test.ts`
    - **EXPECTED OUTCOME**: All preservation assertions PASS (confirms no regressions)
    - Confirm all tests still pass after fixes (no regressions)

- [ ] 9. Checkpoint — Ensure all tests pass
  - Run the full test suite: `npx vitest run`
  - Ensure both `bug-conditions-round4.test.ts` and `preservation-round4.test.ts` pass
  - Ensure prior round tests (`bug-conditions-round2.test.ts`, `preservation-round2.test.ts`, `bug-conditions.test.ts`, `preservation.test.ts`) still pass
  - Ask the user if any questions arise about visual results that cannot be verified by static analysis
