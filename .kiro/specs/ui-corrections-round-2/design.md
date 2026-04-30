# UI Corrections Round 2 - Bugfix Design

## Overview

This document formalizes the design for fixing 13 visual and functional defects identified in the second round of UI corrections for the Guarderia Winnie Pooh Next.js website (Next.js 16, React 19). The defects span six components: Navbar, Nosotros, Sedes, Servicios, Contacto, and the Sedes slug page. Each fix is targeted and minimal, preserving all unrelated behavior.
The bug condition C(X) is satisfied when any of the 13 defective rendering states is present. The fix F-prime must produce the correct visual output P(result) for each buggy input while leaving all non-buggy inputs unchanged (preservation).

---

## Glossary

- **Bug_Condition (C)**: The set of rendering states that produce a visually or functionally incorrect output, as enumerated in the 13 defects below.
- **Property (P)**: The desired correct rendering or behavior for each defect when the fix is applied.
- **Preservation**: All rendering and behavior not covered by the 13 defects must remain identical after the fix.
- **isBugCondition(input)**: Pseudocode function returning true when a component render state matches one of the 13 defective conditions.
- **expectedBehavior(result)**: Pseudocode function returning true when the rendered output satisfies the correct specification for that defect.
- **AuroraText**: Animated gradient text component at components/ui/aurora-text.tsx. Accepts a colors array prop.
- **ColoredTitle**: Local helper in components/Servicios.tsx cycling per-letter static colors. To be replaced by AuroraText.
- **MagicCard**: Card wrapper in components/ui/magic-card.tsx used in Sedes.
- **NeonGradientCard**: Card wrapper in components/ui/neon-gradient-card.tsx used in Servicios and Nosotros.
- **sede.color**: Primary theme color per sede card (yellow #FFB400, pink #FF7893, blue #00C2FF).
- **sedes-slug-bg.jpg**: Image at public/images/sedes-slug-bg.jpg to be used as background for sede slug pages.
- **fotos array**: Array of media file paths in each sede entry in app/sedes/[slug]/page.tsx. May contain image or video files.

---

## Bug Details

### Bug Condition

The bug manifests across 13 distinct rendering defects in six components. Each defect is a separate instance of isBugCondition returning true.
**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type ComponentRenderState
  OUTPUT: boolean
  RETURN (
    -- C1: Navbar subtitle invisible
    (input.component == Navbar
     AND input.brandSubtitle.color == var(--muted-foreground)
     AND input.brandSubtitle.fontWeight < 700)
    OR
    -- C2: Nosotros Calendario text not centered / no line breaks
    (input.component == Nosotros.Calendario
     AND (input.calendarItems.textAlign != center
          OR input.calendarItems.lineBreakAfterFirstPhrase == false))
    OR
    -- C3: Nosotros Proposito stale description text
    (input.component == Nosotros.Proposito
     AND input.descriptionText == Atencion y cuidado integral a ninos y ninas en Medellin.)
    OR
    -- C4: Nosotros->Sedes transition is plain gradient, no background image
    (input.component == Nosotros.Divider
     AND input.dividerStyle == linear-gradient(to bottom, #ffffff, #f8fafc)
     AND input.hasBackgroundImage == false)
    OR
    -- C5: Sedes background image barely visible
    (input.component == Sedes.Background
     AND input.imageOpacity <= 0.35
     AND input.overlayStrength == strong)
    OR
    -- C6: Sedes card border has no glow
    (input.component == Sedes.Card
     AND input.borderGlow == false)
    OR
    -- C7: Sedes card background is plain white, no color tint
    (input.component == Sedes.Card
     AND input.backgroundTint == rgba(255,255,255,0.9))
    OR
    -- C8: Servicios corner characters too small
    (input.component == Servicios.CornerCharacters
     AND input.characterWidth <= 110)
    OR
    -- C9: Servicios card titles use ColoredTitle instead of AuroraText
    (input.component == Servicios.CardTitle
     AND input.titleComponent == ColoredTitle)
    OR
    -- C10: Servicios card image container has no border/frame
    (input.component == Servicios.CardImageContainer
     AND input.hasBorder == false)
    OR
    -- C11: Contacto info boxes too wide
    (input.component == Contacto.InfoBoxes
     AND input.boxWidth == full-column)
    OR
    -- C12: Sedes slug page uses white.jpg placeholder background
    (input.component == SedeSlugPage.Background
     AND input.backgroundSrc == /images/white.jpg)
    OR
    -- C13: Sedes slug carousel renders video as Image
    (input.component == SedeSlugPage.Carousel
     AND input.mediaType == video
     AND input.renderedAs == Image)
  )
END FUNCTION

### Examples

**C1 - Navbar subtitle:**
Defective: color is var(--muted-foreground) grey, fontSize 0.65rem, no fontWeight override. Subtitle is nearly invisible against the white navbar.
Expected: subtitle in a visible accent color (e.g. #FF1F6D or #FFB400) with fontWeight 700 or 800.
**C2 - Nosotros Calendario:**
Defective: calendar item rows use alignItems center (flex row) but the text span has no textAlign center. The br tags exist in JSX but the container is not centered.
Expected: each calendar entry text is center-aligned and the line break after the first phrase is visible.
**C3 - Nosotros Proposito description:**
Defective: generic description text does not reflect brand legacy.
Expected: Somos el comienzo de una vida plena para sus hijos. +30 anos de amor y dedicacion a nuestros pequenos.
**C4 - Nosotros->Sedes transition:**
Defective: plain linear-gradient div, 120px tall, no image.
Expected: transition element mirroring the Hero->Nosotros fade with absolutely-positioned background image and mask gradient.
**C5 - Sedes background opacity:**
Defective: opacity 0.35 on image wrapper plus strong radial white overlay -- image barely perceptible.
Expected: opacity 0.55-0.65 on image wrapper, reduced white overlay center stop.
**C6 - Sedes card border glow:**
Defective: border 3px solid with 12% alpha, no box-shadow glow.
Expected: border at higher alpha (~60%) plus boxShadow with colored glow.
**C7 - Sedes card background tint:**
Defective: background rgba(255,255,255,0.9) -- pure white, no color identity.
Expected: very light colored tint (4-7% alpha) matching sede theme color.
**C8 - Servicios corner character sizes:**
Defective: winnie-globo at 100px, others at 110px -- too small for the section.
Expected: winnie-globo at ~220px, others at ~220-240px, all within section bounds.
**C9 - Servicios card titles:**
Defective: ColoredTitle component -- static per-letter color cycling, no animation.
Expected: AuroraText with a rotated palette per card index so each card has a visually distinct aurora gradient.
**C10 - Servicios card image border:**
Defective: image container div has no border, only a blurred background glow div inside.
Expected: visible border with borderRadius matching the container, wrapping the Lens+Image area.
**C11 - Contacto info boxes width:**
Defective: each motion.a box stretches to full grid column width.
Expected: boxes use maxWidth ~480px with margin 0 auto, centered in the column.
**C12 - Sedes slug background:**
Defective: src /images/white.jpg at opacity 0.4 -- blank white image, no visual background.
Expected: src /images/sedes-slug-bg.jpg with same mask gradient and radial overlay pattern used in Hero and Contacto.
**C13 - Sedes slug carousel video support:**
Defective: all fotos items passed to next/image Image regardless of extension -- video files fail to render.
Expected: detect .mp4 / .webm extensions, render those as HTML5 video element (autoPlay muted loop playsInline), render all other extensions as Image exactly as before.

---

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Navbar: Winnie Pooh text, logo image, navbar height, link styles, WhatsApp button, and all other navbar elements remain exactly as before.
- Nosotros Calendario: all existing content, colors, emoji icons, and layout of the Calendario card unchanged except for text alignment and line breaks.
- Nosotros Proposito: the expandable mission points list, card styling, font size, color, and alignment of all other Proposito card content unchanged.
- Nosotros and Sedes sections: all content, layout, and z-index of both sections completely unchanged by the addition of the transition element.
- Sedes: same background image file used; all card content fully readable after opacity/overlay adjustment.
- Sedes cards: all card content, text, images, buttons, and layout inside each sede card unchanged after adding glowing border and color tint.
- Servicios: on screens narrower than xl breakpoint, the four corner character images continue to be hidden (hidden xl:block).
- Servicios: all other service card content (description text, card layout, NeonGradientCard styling, Lens effect) unchanged after replacing ColoredTitle with AuroraText.
- Servicios: the Lens hover/zoom effect remains fully functional on each service card image after adding the border/frame.
- Contacto: all text, icons, links, functionality, and all other Contacto section content (title, description, locations column, hours) unchanged after narrowing the info boxes.
- Sedes slug page: all existing page content, layout, Navbar, Footer, carousel, map, info card, and WhatsApp button completely unchanged after adding the background image.
- Sedes slug carousel: image items continue to render exactly as before using next/image Image elements with the same styling and behavior.
**Scope:**
All inputs that do NOT match one of the 13 bug conditions should be completely unaffected by these fixes. This includes:
- All other sections not listed above (Hero, Galeria, Resenas, Footer, WhatsAppButton)
- All admin pages and API routes
- All responsive breakpoint behaviors not explicitly changed
- All animation and interaction behaviors not explicitly changed
**Note:** The actual expected correct behavior for each defect is defined in the Correctness Properties section (Properties 1-13). This section focuses on what must NOT change.

---

## Hypothesized Root Cause

Based on code analysis of the source files, the root causes for each defect are:
1. **C1 - Navbar subtitle**: The brand-subtitle div uses `color: var(--muted-foreground)` (low-contrast grey) and `fontSize: 0.65rem` with no fontWeight override. Fix: change color to a brand accent and add fontWeight 700.
2. **C2 - Nosotros Calendario alignment**: The calendar item row uses `display: flex, alignItems: center` but the text span has no textAlign property. Fix: add `textAlign: center` to the text span and `justifyContent: center` to the row.
3. **C3 - Nosotros Proposito text**: The description paragraph hardcodes a generic string. Fix: replace with the new brand messaging about 30 years of dedication.
4. **C4 - Nosotros->Sedes transition**: The divider is a plain CSS gradient div with no background image. Fix: replace with a relative-positioned container holding a masked Image that fades from transparent to white, mirroring the Hero pattern.
5. **C5 - Sedes background visibility**: The image wrapper has opacity 0.35 and the radial overlay uses rgba(255,255,255,0.6) at center -- both suppress the image too aggressively. Fix: increase opacity to 0.55-0.65 and reduce overlay center stop to rgba(255,255,255,0.3).
6. **C6 - Sedes card border glow**: The card inner div uses border with 12% alpha and no glow in boxShadow. Fix: increase border alpha to ~60% and add an outer glow via boxShadow.
7. **C7 - Sedes card background tint**: The card inner div uses pure white background. Fix: replace with a ~4% alpha tint of the sede theme color.
8. **C8 - Servicios corner character sizes**: The four corner character divs use hardcoded 100-110px widths. Fix: increase to ~220-240px, maintaining aspect ratios and keeping within section bounds.
9. **C9 - Servicios card titles**: The h3 uses ColoredTitle which produces static per-letter colors with no animation. Fix: replace with AuroraText using a palette rotated by card index i.
10. **C10 - Servicios card image border**: The image container div has no visible border. Fix: add a 2px solid border using the card color1 value with matching borderRadius.
11. **C11 - Contacto info boxes width**: Each motion.a box stretches to fill the full column width with no maxWidth constraint. Fix: add maxWidth 480px and center the boxes within the column.
12. **C12 - Sedes slug background**: The background Image uses src /images/white.jpg which is a blank white image. The correct file sedes-slug-bg.jpg exists in public/images/. Fix: replace src and adjust opacity/overlay to match the Hero pattern.
13. **C13 - Sedes slug carousel video**: The carousel renders all fotos items as next/image Image elements. Fix: add an isVideo helper checking for .mp4 and .webm extensions, and conditionally render a native HTML5 video element for video items.

---

## Correctness Properties

Property 1: Bug Condition - Navbar Subtitle Visibility
_For any_ render of the Navbar component where the bug condition holds (isBugCondition returns true for C1), the fixed Navbar SHALL display the JARDIN INFANTIL subtitle with a visible contrasting color and fontWeight >= 700, clearly distinguishable from the white navbar background.
**Validates: Requirements 2.1, 3.1**
Property 2: Bug Condition - Nosotros Calendario Text Alignment
_For any_ render of the Nosotros Calendario card where the bug condition holds (C2), the fixed component SHALL display all calendar entry text centered horizontally, with a visible line break after the first phrase in each entry.
**Validates: Requirements 2.2, 3.2**
Property 3: Bug Condition - Nosotros Proposito Brand Messaging
_For any_ render of the Nosotros Proposito card where the bug condition holds (C3), the fixed component SHALL display the description text as the new brand messaging string, with the same font size, color, alignment, and styling as the previous text.
**Validates: Requirements 2.3, 3.3**
Property 4: Bug Condition - Nosotros to Sedes Gradient Transition
_For any_ render of the page where the bug condition holds (C4), the fixed transition element SHALL apply a gradient or fade using a background image, visually matching the same style and technique used between Hero and Nosotros, without changing any content, layout, or z-index of either section.
**Validates: Requirements 2.4, 3.4**
Property 5: Bug Condition - Sedes Background Image Visibility
_For any_ render of the Sedes section where the bug condition holds (C5), the fixed component SHALL display the background image noticeably more visible (opacity >= 0.55) with a reduced white overlay, while all card content remains fully readable.
**Validates: Requirements 2.5, 3.5**
Property 6: Bug Condition - Sedes Card Glowing Border
_For any_ render of a Sedes card where the bug condition holds (C6), the fixed component SHALL display a glowing border matching the sede theme color (yellow for Jardin, pink for Babys, blue for After Class), applied to the outer border/frame of the card container.
**Validates: Requirements 2.6, 3.6**
Property 7: Bug Condition - Sedes Card Colored Background Tint
_For any_ render of a Sedes card where the bug condition holds (C7), the fixed component SHALL display a very light colored background tint matching the sede theme color, subtle enough that all text remains fully readable, with no font colors, sizes, or other card content styles changed.
**Validates: Requirements 2.7, 3.7**
Property 8: Bug Condition - Servicios Corner Character Sizes
_For any_ render of the Servicios section on xl+ screens where the bug condition holds (C8), the fixed component SHALL display each of the four corner character images at approximately double or triple their current rendered size, all fully within the visible bounds of the section, none overlapping the service cards.
**Validates: Requirements 2.8, 3.8**
Property 9: Bug Condition - Servicios Card Titles Use AuroraText
_For any_ render of a Servicios card where the bug condition holds (C9), the fixed component SHALL display the card title using the AuroraText component with a rotated color palette per card index, with font size, font weight, and all other h3 styles unchanged.
**Validates: Requirements 2.9, 3.9**
Property 10: Bug Condition - Servicios Card Image Border
_For any_ render of a Servicios card where the bug condition holds (C10), the fixed component SHALL display a visible border or rounded frame around the card image container, with the existing Lens hover/zoom effect remaining fully functional.
**Validates: Requirements 2.10, 3.10**
Property 11: Bug Condition - Contacto Info Boxes Width
_For any_ render of the Contacto section where the bug condition holds (C11), the fixed component SHALL display each of the four info boxes narrowed to fit snugly around its content, all four boxes centered horizontally, with no text, icons, links, or functionality inside any box changed.
**Validates: Requirements 2.11, 3.11**
Property 12: Bug Condition - Sedes Slug Page Background Image
_For any_ render of a sede slug page where the bug condition holds (C12), the fixed component SHALL display an absolutely-positioned background image using sedes-slug-bg.jpg with image treatment matching the Hero and Contacto sections, sitting behind all page content without obscuring readability.
**Validates: Requirements 2.12, 3.12**
Property 13: Bug Condition - Sedes Slug Carousel Video Support
_For any_ render of the sede slug page carousel where the bug condition holds (C13), the fixed component SHALL detect video files by extension (.mp4, .webm), render them as native HTML5 video elements with autoPlay muted loop playsInline, render image items exactly as before, and maintain identical carousel navigation for both media types.
**Validates: Requirements 2.13, 3.13**
Property 14: Preservation - All Non-Buggy Inputs Unchanged
_For any_ input where the bug condition does NOT hold (isBugCondition returns false for all 13 conditions), the fixed components SHALL produce exactly the same rendered output as the original components, preserving all existing functionality, layout, styling, and behavior for all non-buggy inputs.
**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12, 3.13**

---

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct, the following specific changes are required:

---

**Fix 1 - Navbar subtitle (C1)**
File: `components/Navbar.tsx`
Element: The `brand-subtitle` div inside the brand Link
Changes:
- Change `color: var(--muted-foreground)` to `color: #FF1F6D` (or another brand accent)
- Add `fontWeight: 700` (or 800)
- Optionally increase `fontSize` from `0.65rem` to `0.7rem` for better legibility

---

**Fix 2 - Nosotros Calendario alignment (C2)**
File: `components/Nosotros.tsx`
Element: The calendar item row divs and their text spans
Changes:
- Add `textAlign: center` to the text span inside each calendar item
- Add `justifyContent: center` to the row flex container (or change to `flexDirection: column, alignItems: center`)
- Verify the br tags in the JSX are rendering correctly (they already exist in the current code)

---

**Fix 3 - Nosotros Proposito description (C3)**
File: `components/Nosotros.tsx`
Element: The description paragraph in the Proposito NeonGradientCard
Changes:
- Replace the string literal with: Somos el comienzo de una vida plena para sus hijos. +30 anos de amor y dedicacion a nuestros pequenos
- Keep all other paragraph styles (fontFamily, fontSize, color, lineHeight, textAlign) identical

---

**Fix 4 - Nosotros->Sedes transition (C4)**
File: `components/Nosotros.tsx`
Element: The divider div at the bottom of the component (after the closing section tag)
Changes:
- Replace the plain gradient div with a relative-positioned container (height ~200px)
- Inside: an absolutely-positioned div with maskImage linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)
- Inside that: a next/image Image using src /images/sedes-bg.jpg, fill, objectFit cover
- On top: a radial gradient overlay div (rgba(255,255,255,0.4) center to transparent)
- The container should have overflow hidden and pointer-events none
- marginBottom -2px to prevent gap between sections

---

**Fix 5 - Sedes background visibility (C5)**
File: `components/Sedes.tsx`
Element: The absolute background div and its children
Changes:
- Change `opacity: 0.35` to `opacity: 0.6` on the image wrapper div
- Change the radial gradient overlay from `rgba(255,255,255,0.6) 0%` to `rgba(255,255,255,0.3) 0%`

---

**Fix 6 - Sedes card glowing border (C6)**
File: `components/Sedes.tsx`
Element: The inner card div inside each MagicCard
Changes:
- Change `border: 3px solid ${sede.color}20` to `border: 3px solid ${sede.color}60`
- Update boxShadow to include an outer glow: `0 25px 45px -15px ${sede.color}20, 0 0 20px 4px ${sede.color}25, inset 0 0 40px ${sede.color}18`

---

**Fix 7 - Sedes card background tint (C7)**
File: `components/Sedes.tsx`
Element: The inner card div background style
Changes:
- Change `background: rgba(255,255,255,0.9)` to a template literal: `background: ${sede.color}0A` (approximately 4% alpha)
- This gives Jardin a very light yellow, Babys a very light pink, After Class a very light blue
- Verify all text colors remain readable (they use explicit color values, not inherited)

---

**Fix 8 - Servicios corner character sizes (C8)**
File: `components/Servicios.tsx`
Element: The four absolutely-positioned corner character divs
Changes:
- winnie-globo (top-left): change width from 100px to 220px, update Image width/height props to 220/946 (maintaining 213:916 ratio)
- elefante-globo (bottom-left): change width from 110px to 230px, update Image width/height props to 230/305
- tigger-globo (top-right): change width from 110px to 230px, update Image width/height props to 230/336
- piggy-globo (bottom-right): change width from 110px to 230px, update Image width/height props to 230/335
- Adjust top/bottom/left/right positioning if needed to keep characters within section bounds

---

**Fix 9 - Servicios card titles use AuroraText (C9)**
File: `components/Servicios.tsx`
Element: The h3 inside each service card, and the ColoredTitle function
Changes:
- Remove the ColoredTitle function entirely
- Define a AURORA_PALETTES array of 12 palette arrays (one per card), each being a rotation of the base PALETTE by the card index
- Replace `<ColoredTitle text={s.titulo} />` with `<AuroraText colors={AURORA_PALETTES[i]}>{s.titulo}</AuroraText>`
- Keep all h3 styles (fontFamily, fontSize, fontWeight, lineHeight) identical
- Example palette rotation: card 0 uses PALETTE as-is, card 1 shifts by 1, card 2 shifts by 2, etc.

---

**Fix 10 - Servicios card image border (C10)**
File: `components/Servicios.tsx`
Element: The image container div wrapping the blurred glow div and the Lens component
Changes:
- Add `border: 2px solid ${s.color1}` to the image container div
- Add `borderRadius: 12px` (matching the existing rounded-xl class)
- Keep the Lens component and Image unchanged inside

---

**Fix 11 - Contacto info boxes width (C11)**
File: `components/Contacto.tsx`
Element: The left column div and each motion.a contact box
Changes:
- Add `alignItems: center` to the left column flex container
- Add `width: 100%` and `maxWidth: 480px` to each motion.a element
- This constrains each box to a maximum of 480px and centers it within the column

---

**Fix 12 - Sedes slug page background (C12)**
File: `app/sedes/[slug]/page.tsx`
Element: The absolute background div at the top of the main element
Changes:
- Change `src="/images/white.jpg"` to `src="/images/sedes-slug-bg.jpg"`
- Change `opacity-40` class to `opacity-60` (or use inline style opacity 0.6)
- Adjust the mask gradient to match Hero: `linear-gradient(to bottom, black 60%, transparent 100%)`
- Keep the gradient overlay div unchanged

---

**Fix 13 - Sedes slug carousel video support (C13)**
File: `app/sedes/[slug]/page.tsx`
Element: The AnimatePresence carousel motion.div and its media rendering
Changes:
- Add a helper function: `const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src)`
- Inside the carousel motion.div, replace the single Image element with a conditional:
  - If isVideo(sede.fotos[fotoActual]): render `<video src={...} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />`
  - Else: render the existing `<Image src={...} alt="Instalaciones" fill className="object-cover" priority />` unchanged
- No changes to carousel navigation, dots, arrows, or AnimatePresence behavior

---

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate each bug on unfixed code, then verify the fix works correctly and preserves existing behavior.

---

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate each of the 13 bugs BEFORE implementing the fix. Confirm or refute the root cause analysis.
**Test Plan**: Write snapshot or DOM assertion tests for each component in its current (unfixed) state. Run these tests on the UNFIXED code to observe failures and understand the root cause.
**Test Cases**:
1. **C1 - Navbar subtitle color**: Assert that the brand-subtitle element has a computed color that is NOT var(--muted-foreground) grey. Will fail on unfixed code.
2. **C2 - Calendario alignment**: Assert that calendar item text spans have textAlign center. Will fail on unfixed code.
3. **C3 - Proposito text**: Assert that the description paragraph does NOT contain the old generic string. Will fail on unfixed code.
4. **C4 - Transition element**: Assert that the divider element contains a background image element. Will fail on unfixed code.
5. **C5 - Sedes background opacity**: Assert that the image wrapper opacity is >= 0.55. Will fail on unfixed code.
6. **C6 - Sedes card glow**: Assert that the card boxShadow contains a glow value. Will fail on unfixed code.
7. **C7 - Sedes card tint**: Assert that the card background is NOT rgba(255,255,255,0.9). Will fail on unfixed code.
8. **C8 - Corner character sizes**: Assert that the winnie-globo div width is >= 200px. Will fail on unfixed code.
9. **C9 - Card title component**: Assert that no ColoredTitle spans exist in the rendered service cards. Will fail on unfixed code.
10. **C10 - Card image border**: Assert that the image container div has a border style. Will fail on unfixed code.
11. **C11 - Info box width**: Assert that each contact motion.a has a maxWidth style. Will fail on unfixed code.
12. **C12 - Slug background src**: Assert that the background Image src is NOT /images/white.jpg. Will fail on unfixed code.
13. **C13 - Video rendering**: Assert that a .mp4 fotos item renders as a video element, not an img element. Will fail on unfixed code.
**Expected Counterexamples**:
- Navbar subtitle renders in grey with no fontWeight override
- Calendar text is left-aligned within the flex row
- Proposito description contains the old generic string
- Transition divider has no child Image element
- Sedes background image is barely visible at opacity 0.35
- Sedes cards have no glow in their boxShadow
- Sedes cards have pure white backgrounds
- Corner characters are 100-110px wide
- Service card titles use per-letter colored spans (ColoredTitle output)
- Service card image containers have no border
- Contact boxes stretch to full column width
- Slug page background uses white.jpg
- Video fotos items render as img elements (or fail to render)

---

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed components produce the expected behavior.
**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := fixedComponent(input)
  ASSERT expectedBehavior(result)
END FOR
```
**Fix Check Tests**:
1. Render fixed Navbar -- assert brand-subtitle color is a visible accent and fontWeight >= 700
2. Render fixed Nosotros -- assert calendar text spans have textAlign center
3. Render fixed Nosotros -- assert Proposito description contains the new brand messaging string
4. Render fixed Nosotros -- assert the transition element contains an img element (from next/image)
5. Render fixed Sedes -- assert background image wrapper opacity >= 0.55
6. Render fixed Sedes -- assert each card boxShadow contains a glow value
7. Render fixed Sedes -- assert each card background is NOT pure white
8. Render fixed Servicios -- assert winnie-globo div width >= 200px
9. Render fixed Servicios -- assert each card h3 contains an AuroraText span (animate-aurora class)
10. Render fixed Servicios -- assert each card image container has a border style
11. Render fixed Contacto -- assert each motion.a has maxWidth style set
12. Render fixed slug page -- assert background Image src is /images/sedes-slug-bg.jpg
13. Render fixed slug page with .mp4 fotos item -- assert a video element is rendered

---

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed components produce the same result as the original components.
**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT originalComponent(input) = fixedComponent(input)
END FOR
```
**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs
**Preservation Test Cases**:
1. **Navbar links preservation**: Verify all nav links, WhatsApp button, logo image, and mobile menu render identically after the subtitle fix
2. **Nosotros Proposito list preservation**: Verify the expandable misionPuntos list items render identically after the description text change
3. **Nosotros Calendario content preservation**: Verify all emoji icons, schedule text, and horarios box render identically after the alignment fix
4. **Sedes card content preservation**: Verify all card text, logos, nivel lists, address, and CTA buttons render identically after border/tint/background fixes
5. **Servicios card content preservation**: Verify description text, NeonGradientCard styling, and Lens effect render identically after title and border fixes
6. **Servicios responsive preservation**: Verify corner characters are hidden on screens narrower than xl after the size increase
7. **Contacto right column preservation**: Verify the locations, hours, and BorderBeam card render identically after the info box width fix
8. **Slug page carousel image preservation**: Verify .jpg and .webp fotos items continue to render as next/image Image elements after adding video support
9. **Slug page layout preservation**: Verify the info card, map, Navbar, Footer, and WhatsApp button render identically after the background image fix

---

### Unit Tests

- Test Navbar renders brand-subtitle with correct color and fontWeight after fix
- Test Nosotros Calendario items have textAlign center after fix
- Test Nosotros Proposito description text matches new brand messaging
- Test Sedes background image opacity is within expected range
- Test each Sedes card has a glow in its boxShadow
- Test each Sedes card background is a colored tint, not pure white
- Test Servicios corner character widths are >= 200px
- Test Servicios card titles render AuroraText (animate-aurora class present)
- Test Servicios card image containers have a border style
- Test Contacto info boxes have maxWidth style
- Test slug page background Image src is sedes-slug-bg.jpg
- Test isVideo helper returns true for .mp4 and .webm, false for .jpg, .webp, .png
- Test slug page carousel renders video element for .mp4 fotos item
- Test slug page carousel renders Image element for .jpg fotos item

### Property-Based Tests

- Generate random sede color values and verify each Sedes card background tint is always a low-alpha version of that color (never pure white)
- Generate random sede color values and verify each Sedes card boxShadow always contains a glow component
- Generate random arrays of fotos paths (mix of .jpg, .webp, .mp4, .webm) and verify each item renders as the correct element type
- Generate random card indices (0-11) and verify each Servicios card title uses a distinct AuroraText palette rotation
- Generate random contact box content lengths and verify each box never exceeds maxWidth 480px

### Integration Tests

- Full page render: verify the Nosotros->Sedes transition element is visible between the two sections
- Full page render: verify the Sedes background image is visible through the cards
- Slug page render for each of the three sedes (jardin, babys, after-class): verify background image is visible and all content is readable
- Slug page carousel navigation: verify arrows and dots work correctly for both image and video items
- Responsive test at xl breakpoint: verify Servicios corner characters appear at xl and are hidden below xl
