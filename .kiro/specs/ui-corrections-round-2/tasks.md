# Implementation Plan

- [ ] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - 13 UI Rendering Defects (Round 2)
  - **CRITICAL**: This test MUST FAIL on unfixed code — failure confirms the bugs exist
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior — it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate all 13 bugs exist
  - **Scoped PBT Approach**: Each assertion targets the concrete defective state in the source file (static source-code analysis — read files as strings, assert on content)
  - Create `__tests__/bug-conditions-round2.test.ts` with the following assertions (all must FAIL on unfixed code):
    - C1 (Navbar.tsx): brand-subtitle div does NOT have `color: var(--muted-foreground)` — assert `source` does not match `/color:\s*["']var\(--muted-foreground\)["']/` in the brand-subtitle block
    - C2 (Nosotros.tsx): calendar item row has `justifyContent: "center"` — assert source matches `/justifyContent:\s*["']center["']/` in the calendar items section
    - C3 (Nosotros.tsx): Propósito description does NOT contain the old string — assert source does not contain `"Atención y cuidado integral a niños y niñas en Medellín."`
    - C4 (Nosotros.tsx): transition divider contains a next/image `<Image` element — assert source matches `/<Image[^>]*sedes-bg/` after the closing `</section>` tag
    - C5 (Sedes.tsx): background image wrapper opacity is NOT `0.35` — assert source does not match `/opacity:\s*0\.35/`
    - C6 (Sedes.tsx): card boxShadow contains a glow value — assert source matches `/boxShadow:.*0 0 \d+px/` or similar glow pattern
    - C7 (Sedes.tsx): card background is NOT `rgba(255, 255, 255, 0.9)` — assert source does not contain `"rgba(255, 255, 255, 0.9)"`
    - C8 (Servicios.tsx): winnie-globo div width is >= 200px — assert source does not match `/width:\s*["']100px["']/` for the winnie-globo corner character
    - C9 (Servicios.tsx): no `ColoredTitle` function defined — assert source does not match `/function\s+ColoredTitle/`
    - C10 (Servicios.tsx): image container div has a border style — assert source matches `/border:\s*["']2px solid/` in the image container
    - C11 (Contacto.tsx): each motion.a has a maxWidth style — assert source matches `/maxWidth:\s*["']?480/`
    - C12 (app/sedes/[slug]/page.tsx): background Image src is NOT `/images/white.jpg` — assert source does not contain `src="/images/white.jpg"`
    - C13 (app/sedes/[slug]/page.tsx): `isVideo` helper function is defined — assert source matches `/const isVideo\s*=/` or `/function isVideo/`
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct — it proves the bugs exist)
  - Document counterexamples found (e.g., "brand-subtitle still has var(--muted-foreground)", "white.jpg still referenced")
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12, 1.13_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - All Non-Buggy Rendering States Unchanged
  - **IMPORTANT**: Follow observation-first methodology — observe current source, write tests that assert those patterns
  - Create `__tests__/preservation-round2.test.ts` with the following assertions (all must PASS on unfixed code):
    - P1 (Navbar.tsx): "Winnie Pooh" text, logo `/logos/jardin-infantil.png`, WhatsApp button, mobile menu toggle, and nav links array are all present in source
    - P2 (Nosotros.tsx): `misionPuntos` array, `AnimatePresence`, `expandedIndex` state, and accordion `onClick` logic are all present
    - P3 (Nosotros.tsx): Calendario content — "Mañana", "Tarde", "Completo", schedule time strings (8am, 7am, 5pm), and "Calendario" heading are all present
    - P4 (Sedes.tsx): card content — `<Image`, `AuroraText`, "Winnie Pooh", `Check`, `niveles`, "Conocer Sede", and `/sedes/` link are all present
    - P5 (Sedes.tsx): same background image file `sedes-bg.jpg` is still referenced after opacity change
    - P6 (Servicios.tsx): `NeonGradientCard`, `Lens`, `SparklesText`, "Experiencias que acompañan", and `hidden xl:block` class are all present
    - P7 (Servicios.tsx): `servicios` array still has 12 entries — assert `servicios.map` and all 12 `titulo` strings are present
    - P8 (Contacto.tsx): right column content — "Nuestras Ubicaciones", `BorderBeam`, "Horarios Disponibles", sedes addresses, and `PulsatingButton` are all present
    - P9 (app/sedes/[slug]/page.tsx): `sedesData` still has exactly the three keys `babys`, `jardin`, `after-class` and no others
    - P10 (app/sedes/[slug]/page.tsx): carousel navigation — `ChevronLeft`, `ChevronRight`, `AnimatePresence`, dot buttons, and `fotoActual` state are all present
    - P11 (app/sedes/[slug]/page.tsx): image items in carousel still render as `<Image` — assert source contains `<Image` inside the `AnimatePresence` block
    - P12 property: for each of the 12 `servicios` entries, the `titulo` string is still present in source after the AuroraText replacement (no titles dropped)
    - P13 property: for each of the three sedes slugs (`babys`, `jardin`, `after-class`), the `fotos` array key is still present in `sedesData`
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: All tests PASS (confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and all passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12, 3.13_

- [ ] 3. Fix Navbar subtitle (C1) — components/Navbar.tsx

  - [ ] 3.1 Implement the fix
    - In the `brand-subtitle` div, change `color: "var(--muted-foreground)"` to `color: "#FF1F6D"` (brand accent)
    - Add `fontWeight: 700` to the same style object
    - Optionally increase `fontSize` from `"0.65rem"` to `"0.7rem"` for legibility
    - Leave all other navbar elements (Winnie Pooh text, logo, links, WhatsApp button, mobile menu) completely unchanged
    - _Bug_Condition: input.brandSubtitle.color == var(--muted-foreground) AND input.brandSubtitle.fontWeight < 700_
    - _Expected_Behavior: subtitle color is a visible accent (#FF1F6D) with fontWeight >= 700_
    - _Preservation: all other navbar elements unchanged (logo, links, WhatsApp button, mobile menu)_
    - _Requirements: 2.1, 3.1_

- [ ] 4. Fix Nosotros section (C2, C3, C4) — components/Nosotros.tsx

  - [ ] 4.1 Fix Calendario text alignment (C2)
    - In each calendar item row div, add `justifyContent: "center"` to the flex container style
    - Add `textAlign: "center"` to the text `<span>` inside each calendar item
    - Verify the existing `<br />` tags in the JSX are rendering correctly (they already exist)
    - Leave all emoji icons, colors, schedule content, and horarios box unchanged
    - _Bug_Condition: calendarItems.textAlign != center OR calendarItems.lineBreakAfterFirstPhrase == false_
    - _Expected_Behavior: all calendar entry text is centered; line break after first phrase is visible_
    - _Preservation: all existing content, colors, emoji icons, and layout unchanged_
    - _Requirements: 2.2, 3.2_

  - [ ] 4.2 Fix Propósito description text (C3)
    - Replace the string `"Atención y cuidado integral a niños y niñas en Medellín."` with `"Somos el comienzo de una vida plena para sus hijos. +30 años de amor y dedicación a nuestros pequeños"`
    - Keep all paragraph styles (fontFamily, fontSize, color, lineHeight, textAlign) identical
    - Leave the expandable misionPuntos list, card styling, and all other Propósito content unchanged
    - _Bug_Condition: descriptionText == "Atención y cuidado integral a niños y niñas en Medellín."_
    - _Expected_Behavior: description shows new brand messaging about 30 years of dedication_
    - _Preservation: expandable list, card styling, font size, color, alignment all unchanged_
    - _Requirements: 2.3, 3.3_

  - [ ] 4.3 Fix Nosotros→Sedes transition gradient (C4)
    - Replace the plain `linear-gradient` divider div at the bottom of the component with a relative-positioned container (height ~200px, overflow hidden, pointer-events none)
    - Inside: an absolutely-positioned div with `maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"` and `WebkitMaskImage` equivalent
    - Inside that: a `next/image` `<Image>` using `src="/images/sedes-bg.jpg"`, `fill`, `style={{ objectFit: "cover" }}`
    - On top: a radial gradient overlay div (`rgba(255,255,255,0.4)` center to transparent)
    - Set `marginBottom: "-2px"` on the container to prevent gap between sections
    - Leave all content, layout, and z-index of both Nosotros and Sedes sections unchanged
    - _Bug_Condition: dividerStyle == linear-gradient(to bottom, #ffffff, #f8fafc) AND hasBackgroundImage == false_
    - _Expected_Behavior: transition element uses background image with mask gradient, matching Hero→Nosotros style_
    - _Preservation: all content, layout, and z-index of both sections completely unchanged_
    - _Requirements: 2.4, 3.4_

- [ ] 5. Fix Sedes section (C5, C6, C7) — components/Sedes.tsx

  - [ ] 5.1 Fix background image visibility (C5)
    - Change `opacity: 0.35` to `opacity: 0.6` on the image wrapper div (the `relative w-full h-full` div inside the absolute background container)
    - Change the radial gradient overlay from `rgba(255,255,255,0.6) 0%` to `rgba(255,255,255,0.3) 0%`
    - Keep the same `sedes-bg.jpg` image file and all card content unchanged
    - _Bug_Condition: imageOpacity <= 0.35 AND overlayStrength == strong_
    - _Expected_Behavior: background image opacity >= 0.55, reduced white overlay, all card content readable_
    - _Preservation: same background image file; all card content fully readable_
    - _Requirements: 2.5, 3.5_

  - [ ] 5.2 Fix card glowing border (C6)
    - Change `border: \`3px solid ${sede.color}20\`` to `border: \`3px solid ${sede.color}60\`` on the inner card div
    - Update `boxShadow` to include an outer glow: `` `0 25px 45px -15px ${sede.color}20, 0 0 20px 4px ${sede.color}25, inset 0 0 40px ${sede.color}18` ``
    - Leave all card content, text, images, buttons, and layout inside each card unchanged
    - _Bug_Condition: borderGlow == false (border alpha 12%, no box-shadow glow)_
    - _Expected_Behavior: border at ~60% alpha plus boxShadow with colored glow per sede theme color_
    - _Preservation: all card content, text, images, buttons, and layout unchanged_
    - _Requirements: 2.6, 3.6_

  - [ ] 5.3 Fix card colored background tint (C7)
    - Change `background: "rgba(255, 255, 255, 0.9)"` to `` background: `${sede.color}0A` `` (approximately 4% alpha of the sede theme color)
    - Verify all text remains readable (text uses explicit color values, not inherited)
    - Leave all font colors, sizes, and other card content styles unchanged
    - _Bug_Condition: backgroundTint == rgba(255,255,255,0.9) (pure white, no color identity)_
    - _Expected_Behavior: very light colored tint (~4% alpha) matching sede theme color; all text readable_
    - _Preservation: all font colors, sizes, and other card content styles unchanged_
    - _Requirements: 2.7, 3.7_

- [ ] 6. Fix Servicios section (C8, C9, C10) — components/Servicios.tsx

  - [ ] 6.1 Fix corner character sizes (C8)
    - winnie-globo (top-left): change wrapper `width` from `"100px"` to `"220px"`, update `<Image>` `width` prop to `220` and `height` to `946` (maintaining aspect ratio)
    - elefante-globo (bottom-left): change wrapper `width` from `"110px"` to `"230px"`, update `<Image>` `width` to `230` and `height` to `305`
    - tigger-globo (top-right): change wrapper `width` from `"110px"` to `"230px"`, update `<Image>` `width` to `230` and `height` to `336`
    - piggy-globo (bottom-right): change wrapper `width` from `"110px"` to `"230px"`, update `<Image>` `width` to `230` and `height` to `335`
    - Keep the `hidden xl:block` class on all four corner character divs unchanged
    - Adjust `top`/`bottom`/`left`/`right` positioning if needed to keep characters within section bounds and not overlapping cards
    - _Bug_Condition: characterWidth <= 110 (winnie-globo at 100px, others at 110px)_
    - _Expected_Behavior: all four corner characters at ~220-230px, within section bounds, not overlapping cards_
    - _Preservation: hidden xl:block responsive behavior intact; no overlap with service cards_
    - _Requirements: 2.8, 3.8_

  - [ ] 6.2 Replace ColoredTitle with AuroraText for card titles (C9)
    - Remove the `ColoredTitle` function entirely from the file
    - Define an `AURORA_PALETTES` array of 12 palette arrays — each is `PALETTE` rotated by the card index `i` (card 0 uses PALETTE as-is, card 1 shifts by 1, card 2 shifts by 2, etc.)
    - Replace `<ColoredTitle text={s.titulo} />` with `<AuroraText colors={AURORA_PALETTES[i]}>{s.titulo}</AuroraText>` inside the `h3`
    - Keep all `h3` styles (fontFamily, fontSize, fontWeight, lineHeight) identical; change `color: "inherit"` if needed since AuroraText handles color
    - Leave all other service card content (description text, card layout, NeonGradientCard styling, Lens effect) unchanged
    - _Bug_Condition: titleComponent == ColoredTitle (static per-letter color cycling, no animation)_
    - _Expected_Behavior: AuroraText with rotated palette per card index; font size, weight, and h3 styles unchanged_
    - _Preservation: all other card content, NeonGradientCard styling, Lens effect unchanged_
    - _Requirements: 2.9, 3.9_

  - [ ] 6.3 Add border/frame to card image container (C10)
    - Add `border: \`2px solid ${s.color1}\`` to the image container div (the `relative mb-6 w-full overflow-hidden rounded-xl` div)
    - Add `borderRadius: "12px"` to match the existing `rounded-xl` class
    - Keep the `Lens` component and `<Image>` unchanged inside the container
    - Keep the blurred glow `div` inside the container unchanged
    - _Bug_Condition: hasBorder == false (image container div has no border)_
    - _Expected_Behavior: visible 2px solid border using card color1, borderRadius 12px; Lens effect fully functional_
    - _Preservation: Lens hover/zoom effect fully functional; all other card content unchanged_
    - _Requirements: 2.10, 3.10_

- [ ] 7. Fix Contacto info boxes width (C11) — components/Contacto.tsx

  - [ ] 7.1 Implement the fix
    - Add `alignItems: "center"` to the left column flex container div (the `display: "flex", flexDirection: "column"` div)
    - Add `width: "100%"` and `maxWidth: "480px"` to each `motion.a` element's style object
    - Leave all text, icons, links, functionality, and all other Contacto section content (title, description, right column, hours) unchanged
    - _Bug_Condition: boxWidth == full-column (motion.a stretches to full grid column width, no maxWidth)_
    - _Expected_Behavior: each info box maxWidth 480px, centered in column; no text/icons/links/functionality changed_
    - _Preservation: all text, icons, links, functionality, and other Contacto content unchanged_
    - _Requirements: 2.11, 3.11_

- [ ] 8. Fix Sedes slug page (C12, C13) — app/sedes/[slug]/page.tsx

  - [ ] 8.1 Fix background image (C12)
    - Change `src="/images/white.jpg"` to `src="/images/sedes-slug-bg.jpg"` on the background `<Image>` element
    - Change `opacity-40` class (or inline `opacity: 0.4`) to `opacity-60` (or `opacity: 0.6`)
    - Adjust the mask gradient to match Hero: `maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"` (already present — verify it is correct)
    - Leave the gradient overlay div, all page content, layout, Navbar, Footer, carousel, map, info card, and WhatsApp button completely unchanged
    - _Bug_Condition: backgroundSrc == /images/white.jpg (blank white image, no visual background)_
    - _Expected_Behavior: sedes-slug-bg.jpg displayed with opacity ~0.6, mask gradient matching Hero/Contacto style_
    - _Preservation: all existing page content, layout, and functionality completely unchanged_
    - _Requirements: 2.12, 3.12_

  - [ ] 8.2 Add video support to carousel (C13)
    - Add a helper function above the component: `const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src)`
    - Inside the `AnimatePresence` carousel `motion.div`, replace the single `<Image>` element with a conditional:
      - If `isVideo(sede.fotos[fotoActual])`: render `<video src={sede.fotos[fotoActual]} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />`
      - Else: render the existing `<Image src={sede.fotos[fotoActual]} alt="Instalaciones" fill className="object-cover" priority />` unchanged
    - Make no changes to carousel navigation (arrows, dots, `AnimatePresence`, `fotoActual` state, `direccion` state)
    - _Bug_Condition: mediaType == video AND renderedAs == Image (video files passed to next/image fail to render)_
    - _Expected_Behavior: .mp4/.webm render as HTML5 video (autoPlay muted loop playsInline); images render as before_
    - _Preservation: carousel navigation, dots, arrows, AnimatePresence behavior, and image rendering all unchanged_
    - _Requirements: 2.13, 3.13_

- [ ] 9. Verify bug condition exploration test now passes

  - [ ] 9.1 Re-run the SAME test from task 1
    - **Property 1: Expected Behavior** - 13 UI Rendering Defects (Round 2)
    - **IMPORTANT**: Re-run `__tests__/bug-conditions-round2.test.ts` — do NOT write a new test
    - The test from task 1 encodes the expected behavior for all 13 fixes
    - Run: `npx vitest run __tests__/bug-conditions-round2.test.ts`
    - **EXPECTED OUTCOME**: All 13 assertions PASS (confirms all bugs are fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13_

  - [ ] 9.2 Verify preservation tests still pass
    - **Property 2: Preservation** - All Non-Buggy Rendering States Unchanged
    - **IMPORTANT**: Re-run `__tests__/preservation-round2.test.ts` — do NOT write new tests
    - Run: `npx vitest run __tests__/preservation-round2.test.ts`
    - **EXPECTED OUTCOME**: All preservation assertions PASS (confirms no regressions)
    - Confirm all tests still pass after fixes (no regressions)

- [ ] 10. Checkpoint — Ensure all tests pass
  - Run the full test suite: `npx vitest run`
  - Ensure both `bug-conditions-round2.test.ts` and `preservation-round2.test.ts` pass
  - Ensure existing `bug-conditions.test.ts` and `preservation.test.ts` (round 1) still pass
  - Ask the user if any questions arise about visual results that cannot be verified by static analysis
