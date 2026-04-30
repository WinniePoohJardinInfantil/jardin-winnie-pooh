# UI Corrections Round 4 — Bugfix Design

## Overview

This document formalizes the fix approach for 8 visual and behavioral defects identified across the Winnie Pooh website: the Nosotros→Sedes transition gradient, Contacto card tint opacity, Sedes slug title/description styling, the Sedes slug carousel (unification, aspect ratio, lightbox, native video), Servicios image frame border, Servicios NeonGradientCard border thickness, and Hero stats sticker sizes.

Each fix is minimal and targeted. No layout, content, or unrelated behavior is modified. The bug condition methodology is applied collectively: the bug condition C(X) identifies the set of rendered elements that currently exhibit the defect, and the fix ensures P(result) holds for all of them while preserving ¬C(X) — all other elements and behaviors remain identical.

---

## Glossary

- **Bug_Condition (C)**: The condition that identifies a rendered element or behavior that currently exhibits a defect — wrong CSS value, wrong component, wrong prop, or missing feature.
- **Property (P)**: The desired correct state after the fix — the specific CSS value, component structure, prop value, or behavior that must hold.
- **Preservation**: All rendered output, layout, interactions, and behaviors not covered by the 8 bug conditions must remain byte-for-byte identical after the fix.
- **isBugCondition(X)**: Pseudocode function that returns `true` when input X is one of the 8 defective elements/behaviors.
- **BabysVideoPlayer**: Custom video player component in `app/sedes/[slug]/page.tsx` that wraps `<video>` with manual play/pause, seek, and volume controls — to be removed.
- **yet-another-react-lightbox**: The lightbox library already used in `app/galeria/page.tsx`, imported as `Lightbox` with the `Video` plugin.
- **NeonGradientCard**: Component in `components/ui/neon-gradient-card.tsx` whose `borderSize` prop controls the CSS variable `--border-size` in pixels.
- **Site_Palette**: `["#FF7893", "#7AC0FF", "#7E3AF2", "#FFFC01", "#4FF084", "#EB8100"]` — the 6-color palette used in `Servicios.tsx`.
- **sedeColorBrand**: Derived color used in `app/sedes/[slug]/page.tsx` — `sede.color === "#FFFC01" ? "#D4C500" : sede.color`.

---

## Bug Details

### Bug Condition

The 8 bugs share a common structure: a specific rendered element or behavior deviates from the intended design. The bug manifests when any of the following conditions is true for a given rendered element or interaction X.

**Formal Specification:**

```
FUNCTION isBugCondition(X)
  INPUT: X — a rendered element, prop value, or user interaction
  OUTPUT: boolean

  RETURN (
    // Bug 1: Nosotros transition mask
    X IS the transition div in Nosotros.tsx
    AND X.style.maskImage = "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"
  ) OR (
    // Bug 2: Contacto tint opacity
    X IS a contact card in Contacto.tsx
    AND X.style.background IN ["rgba(79,240,132,0.06)", "rgba(122,192,255,0.06)",
                                "rgba(255,120,147,0.06)", "rgba(255,252,1,0.06)"]
  ) OR (
    // Bug 3: Sedes slug title color palette (already correct per source review — see note)
    // Confirmed: SparklesText wraps AuroraText with correct palette. No code change needed.
    FALSE
  ) OR (
    // Bug 4: Sedes slug description styling
    X IS the description <p> in app/sedes/[slug]/page.tsx
    AND (X.className CONTAINS "text-slate-500" OR X.className CONTAINS "font-extrabold")
  ) OR (
    // Bug 4b: HighLight color in description
    X IS the HighLight component in the description
    AND X.props.color = "#00c3ff56"
  ) OR (
    // Bug 5a: BabysVideoPlayer still present
    X IS the slug === "babys" conditional branch rendering BabysVideoPlayer
  ) OR (
    // Bug 5b: Carousel not always square
    X IS the carousel container div
    AND X.className CONTAINS "lg:aspect-auto"
  ) OR (
    // Bug 5c: No lightbox on carousel click
    X IS a carousel item (image or video)
    AND user clicks X
    AND no lightbox opens
  ) OR (
    // Bug 5d: Video uses autoPlay/muted/loop instead of controls
    X IS a <video> element inside the carousel
    AND X.props.autoPlay = true
  ) OR (
    // Bug 6: Servicios image container has explicit border
    X IS the image container div in Servicios.tsx
    AND X.style.border MATCHES "2px solid #[color]"
  ) OR (
    // Bug 7: NeonGradientCard borderSize too thin
    X IS a NeonGradientCard in servicios.map()
    AND X.props.borderSize = 2
  ) OR (
    // Bug 8: Hero stats sticker too small
    X IS the sticker motion.div for index 0 or 1 in Hero.tsx
    AND X.style.width = "90px"
  )
END FUNCTION
```

### Examples

**Bug 1 — Transition mask:**
- Current: `maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"` → produces a visible band/artifact in the middle of the transition strip.
- Expected: `maskImage: "linear-gradient(to top, black 0%, transparent 100%)"` → image fades from fully opaque at the bottom to fully transparent at the top, dissolving cleanly upward into the Sedes section.

**Bug 2 — Contacto tint:**
- Current: WhatsApp card background `rgba(79,240,132,0.06)` → nearly invisible green tint.
- Expected: `rgba(79,240,132,0.20)` → clearly visible pastel green, text remains fully legible.
- Same pattern for Correo (`0.06` → `0.20`), Instagram (`0.06` → `0.20`), Google (`0.06` → `0.20`).

**Bug 3 — Title (no change needed):**
- Source review confirms `app/sedes/[slug]/page.tsx` already uses `SparklesText` wrapping `AuroraText` with `colors={[sede.color, "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]}`. No code change required.

**Bug 4 — Description styling:**
- Current: `<p className="text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto mt-8 font-extrabold leading-relaxed">` with `<HighLight color="#00c3ff56" type="underline">`.
- Expected: `font-bold text-[#1e293b]` on the `<p>`, and `<HighLight color={sede.color} type="underline">` (or `${sede.color}CC` for 80% opacity) so the highlight matches the sede's theme color.

**Bug 5 — Carousel:**
- Current (babys): renders `<BabysVideoPlayer src={...} />` with custom play/pause/seek/volume controls.
- Expected (babys): same unified carousel as other sedes, with `<video src={...} controls className="w-full h-full object-contain" />`.
- Current (all sedes): carousel container has `aspect-square lg:aspect-auto` — loses square ratio on desktop.
- Expected: `aspect-square` always.
- Current: clicking a carousel item does nothing.
- Expected: opens `yet-another-react-lightbox` with the Video plugin at the clicked index.

**Bug 6 — Servicios image border:**
- Current: `style={{ border: \`2px solid ${Site_Palette[i % 6]}\`, borderRadius: "12px" }}` on the outer image container div — leaves visible gap between border and `object-contain` image.
- Expected: remove `border` entirely; keep `borderRadius: 8px` and `overflow: hidden` on the container (or move to the Lens wrapper).

**Bug 7 — NeonGradientCard border:**
- Current: `<NeonGradientCard borderSize={2} ...>` → thin 2px neon border.
- Expected: `<NeonGradientCard borderSize={4} ...>` → matches the 4px border used in Nosotros cards.

**Bug 8 — Hero sticker size:**
- Current: `width: index < 2 ? "90px" : "70px", height: index < 2 ? "90px" : "70px"`.
- Expected: `width: index < 2 ? "100px" : "70px", height: index < 2 ? "100px" : "70px"`.

---

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**

- `Nosotros.tsx`: All section content, NeonGradientCard layout, accordion items, z-index, and padding remain unchanged. Only the `maskImage` / `WebkitMaskImage` values on the transition `<div>` change.
- `Contacto.tsx`: Text, icons, hrefs, layout, hover effects, border colors, `bg` values, and the right-column panel (locations + hours) remain unchanged. Only the `tint` values in the `contactos` array change.
- `app/sedes/[slug]/page.tsx`: The information card (edades, servicios, dirección, WhatsApp button), the map NeonGradientCard, the Navbar, Footer, WhatsAppButton, and all page-level layout remain unchanged. The carousel navigation arrows and dot indicators remain unchanged.
- `components/Servicios.tsx`: The Lens hover/zoom effect, AuroraText titles, description text with highlights, decorative images, section header, and grid layout remain unchanged. Only the image container border style and `borderSize` prop change.
- `components/Hero.tsx`: The stat card container dimensions (220×200px), number ticker, label, border, background, and the sticker for index 2 (70×70px) remain unchanged. Only the sticker `width`/`height` for index 0 and 1 change.
- `app/galeria/page.tsx`: No modifications whatsoever.

**Scope:**
All inputs that do NOT match `isBugCondition(X)` — meaning every other element, prop, style, interaction, and page not listed in the 8 bugs — must be completely unaffected by this fix.

---

## Hypothesized Root Cause

1. **Bug 1 — Incorrect gradient direction**: The transition element was designed to show a slice of the background image with fade-in/out on both edges (symmetric mask). The intent was a one-directional dissolve upward, but the gradient was written symmetrically (`transparent → black → black → transparent`) instead of directionally (`black → transparent` from bottom to top).

2. **Bug 2 — Tint opacity too low**: The `tint` values were set to `0.06` (6%) opacity, likely copied from the `bg` icon background values (`${color}22` ≈ 13%) but halved. The visual result is nearly invisible on a white background. The correct range for a perceptible pastel card background is 20–25%.

3. **Bug 3 — No actual bug**: Source code inspection confirms the title already uses the correct nesting and palette. The requirements document described a potential issue that does not exist in the current code.

4. **Bug 4 — Stale styling from earlier iteration**: The description `<p>` retains `text-slate-500 font-extrabold` from an earlier design pass. The `HighLight` color `#00c3ff56` is a generic site-wide color rather than the sede-specific theme color, making the highlight feel disconnected from the page's color identity.

5. **Bug 5 — Incomplete unification**: The `babys` sede was given a bespoke `BabysVideoPlayer` component instead of being integrated into the shared carousel. The `lg:aspect-auto` class was added to allow the carousel to grow on desktop, but this breaks the intended square format. The lightbox was never wired up to the carousel (it exists only in Galería).

6. **Bug 6 — Border applied to wrong element**: The border was placed on the outer container div that also holds the `Lens` component and the glow `div`. Because the image uses `object-contain` with `p-2` padding, the border surrounds empty space rather than hugging the image. Removing the border and relying on `borderRadius` + `overflow: hidden` on the container achieves the intended clean frame.

7. **Bug 7 — Inconsistent borderSize default**: The `NeonGradientCard` default is `borderSize={2}` (per the component source). The Servicios cards were never explicitly upgraded to `borderSize={4}` when the Nosotros cards were, creating a visual inconsistency.

8. **Bug 8 — Off-by-one in size ternary**: The sticker sizes for index 0 and 1 were set to `90px` in a previous round. The intended size is `100px` — a 10% increase that was missed.

---

## Correctness Properties

Property 1: Bug Condition — All 8 defective elements are corrected

_For any_ rendered element or interaction X where `isBugCondition(X)` returns `true`, the fixed codebase SHALL produce the correct output P(X): the specific CSS value, prop, component structure, or behavior defined in the Expected Behavior section for that bug, with no visual artifacts, missing features, or incorrect values.

**Validates: Requirements 2.1, 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11**

Property 2: Preservation — All non-defective elements are unchanged

_For any_ rendered element, prop, style, interaction, or page where `isBugCondition(X)` returns `false`, the fixed codebase SHALL produce exactly the same output as the original codebase — same DOM structure, same CSS values, same behavior, same content — preserving all existing functionality for elements not covered by the 8 bug conditions.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10**

---

## Fix Implementation

### Changes Required

#### File: `components/Nosotros.tsx`

**Function/Element**: Transition `<div>` at the bottom of the component (after the closing `</section>` tag).

**Specific Changes:**

1. **Mask gradient direction**: Change `maskImage` and `WebkitMaskImage` from:
   ```
   "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)"
   ```
   to:
   ```
   "linear-gradient(to top, black 0%, transparent 100%)"
   ```
   This makes the image fully opaque at the bottom (where it meets Sedes) and fully transparent at the top (where it meets Nosotros content), creating a clean upward dissolve.

---

#### File: `components/Contacto.tsx`

**Element**: `contactos` array — `tint` property of each entry.

**Specific Changes:**

1. **Increase tint opacity** for all four entries from `0.06` to `0.20`:
   - WhatsApp: `"rgba(79,240,132,0.06)"` → `"rgba(79,240,132,0.20)"`
   - Correo: `"rgba(122,192,255,0.06)"` → `"rgba(122,192,255,0.20)"`
   - Instagram: `"rgba(255,120,147,0.06)"` → `"rgba(255,120,147,0.20)"`
   - Google: `"rgba(255,252,1,0.06)"` → `"rgba(255,252,1,0.20)"`

---

#### File: `app/sedes/[slug]/page.tsx`

**Specific Changes:**

1. **Bug 4 — Description paragraph**: Change the `<p>` className from:
   ```
   "text-xl md:text-2xl text-slate-500 max-w-4xl mx-auto mt-8 font-extrabold leading-relaxed"
   ```
   to:
   ```
   "text-xl md:text-2xl max-w-4xl mx-auto mt-8 font-bold leading-relaxed"
   ```
   with an inline `style={{ color: "#1e293b" }}`.

2. **Bug 4 — HighLight color**: Change `<HighLight color="#00c3ff56" type="underline">` to `<HighLight color={`${sede.color}CC`} type="underline">` (80% opacity of the sede's theme color), making the underline highlight visually tied to the sede identity.

3. **Bug 5 — Remove BabysVideoPlayer and related components**: Delete the `BabysVideoPlayer` function component and the `PlayIcon`, `PauseIcon`, `VolumeIcon` helper components entirely. Remove the `useRef` import if it is no longer used elsewhere in the file.

4. **Bug 5 — Remove slug === "babys" conditional branch**: Replace the entire `{slug === "babys" ? (...) : (...)}` ternary in the media column with the unified carousel JSX (the current `else` branch), so all sedes use the same carousel.

5. **Bug 5 — Always square carousel**: Change the carousel container's className from:
   ```
   "relative w-full aspect-square lg:aspect-auto rounded-[4rem] overflow-hidden ..."
   ```
   to:
   ```
   "relative w-full aspect-square rounded-[4rem] overflow-hidden ..."
   ```
   (remove `lg:aspect-auto`).

6. **Bug 5 — Native video with controls**: Inside the carousel's `AnimatePresence`, change the video branch from:
   ```tsx
   <video src={...} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
   ```
   to:
   ```tsx
   <video src={...} controls className="w-full h-full object-contain" />
   ```

7. **Bug 5 — Add lightbox**: Import `Lightbox` and `Video` plugin from `yet-another-react-lightbox` (same imports as `app/galeria/page.tsx`). Add `import "yet-another-react-lightbox/styles.css"`. Add state: `const [lightboxOpen, setLightboxOpen] = useState(false)`. Build a `slides` array from `sede.fotos` using the same pattern as Galería (video items use `{ type: "video", sources: [{ src, type: "video/mp4" }] }`, image items use `{ src }`). Wrap each carousel item's `motion.div` with an `onClick` handler that sets `fotoActual` and opens the lightbox. Render `<Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} slides={slides} index={fotoActual} plugins={[Video]} />` at the bottom of the JSX (before the closing `</main>`).

---

#### File: `components/Servicios.tsx`

**Specific Changes:**

1. **Bug 6 — Remove image container border**: On the `<div>` wrapping the glow div and `<Lens>`, remove the `border` and `borderRadius` from the inline `style` prop:
   ```tsx
   // Before:
   style={{ border: `2px solid ${Site_Palette[i % 6]}`, borderRadius: "12px" }}
   // After:
   style={{ borderRadius: "8px", overflow: "hidden" }}
   ```
   The `overflow: hidden` ensures the Lens zoom effect is still clipped cleanly. The `border-2` class on the outer `<div>` is removed; the existing `rounded-xl` Tailwind class on the same div can be kept or replaced by the inline `borderRadius: 8px`.

2. **Bug 7 — Increase NeonGradientCard borderSize**: Change `borderSize={2}` to `borderSize={4}` on every `NeonGradientCard` in the `servicios.map()` render.

---

#### File: `components/Hero.tsx`

**Specific Changes:**

1. **Bug 8 — Increase sticker size for index 0 and 1**: Change the ternary in the sticker `motion.div` style from:
   ```tsx
   width: index < 2 ? "90px" : "70px", height: index < 2 ? "90px" : "70px"
   ```
   to:
   ```tsx
   width: index < 2 ? "100px" : "70px", height: index < 2 ? "100px" : "70px"
   ```

---

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate each bug on the unfixed code, then verify the fix works correctly and preserves all existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate each bug BEFORE implementing the fix. Confirm or refute the root cause analysis.

**Test Plan**: Inspect the rendered output of each affected component/page in the browser (or via snapshot tests) on the UNFIXED code to observe the defects and confirm the root cause.

**Test Cases:**

1. **Transition artifact** (Bug 1): Load the homepage and scroll to the Nosotros→Sedes boundary. Observe the visible band/artifact in the transition strip. Confirms the symmetric mask gradient is the cause.
2. **Invisible card tints** (Bug 2): Load the Contacto section. Observe that the four contact cards have nearly identical white backgrounds with no visible color differentiation. Confirms the 6% opacity is too low.
3. **Description styling** (Bug 4): Visit `/sedes/jardin`. Observe the description paragraph is gray (`text-slate-500`) and the highlight underline is a generic cyan (`#00c3ff56`) unrelated to the yellow sede color.
4. **BabysVideoPlayer** (Bug 5a): Visit `/sedes/babys`. Observe the custom video player with manual play/pause/seek/volume controls instead of native browser controls.
5. **Non-square carousel on desktop** (Bug 5b): Visit `/sedes/jardin` on a wide viewport. Observe the carousel stretches to fill the column height (`lg:aspect-auto`), losing the square 1:1 ratio.
6. **No lightbox on click** (Bug 5c): Click any image in the carousel on any sede page. Observe nothing happens.
7. **Video autoplay** (Bug 5d): Visit a sede with a video in the carousel. Observe the video autoplays silently in a loop with no user controls.
8. **Image border gap** (Bug 6): Inspect a Servicios card. Observe the colored border surrounds empty space around the `object-contain` icon image.
9. **Thin NeonGradientCard border** (Bug 7): Compare a Servicios card border to a Nosotros card border. Observe the Servicios border is visibly thinner.
10. **Small stickers** (Bug 8): Inspect the Hero stats section. Observe the "30 años" and "3 sedes" sticker images are 90×90px instead of 100×100px.

**Expected Counterexamples:**
- Visual band artifact in the Nosotros→Sedes transition strip.
- Undifferentiated white card backgrounds in Contacto.
- Gray, non-bold description text and generic cyan highlight on sede pages.
- Custom video player UI on `/sedes/babys`.
- Non-square carousel on desktop viewports.
- No lightbox response on carousel item click.
- Colored border with visible gap around service icons.
- Thinner neon border on Servicios cards vs. Nosotros cards.
- Slightly smaller sticker images for the first two Hero stats.

### Fix Checking

**Goal**: Verify that for all inputs where `isBugCondition(X)` holds, the fixed code produces the correct output P(X).

**Pseudocode:**
```
FOR ALL element X WHERE isBugCondition(X) DO
  result := render_fixed(X)
  ASSERT expectedBehavior(result)
END FOR
```

**Specific assertions after fix:**
```
ASSERT Nosotros transition div maskImage = "linear-gradient(to top, black 0%, transparent 100%)"
ASSERT Contacto WhatsApp card background = "rgba(79,240,132,0.20)"
ASSERT Contacto Correo card background = "rgba(122,192,255,0.20)"
ASSERT Contacto Instagram card background = "rgba(255,120,147,0.20)"
ASSERT Contacto Google card background = "rgba(255,252,1,0.20)"
ASSERT SedePage description <p> has color "#1e293b" AND fontWeight 700
ASSERT SedePage HighLight color = "${sede.color}CC"
ASSERT BabysVideoPlayer component does NOT exist in app/sedes/[slug]/page.tsx
ASSERT slug === "babys" conditional branch does NOT exist
ASSERT carousel container className does NOT contain "lg:aspect-auto"
ASSERT carousel video element has "controls" attribute AND no "autoPlay"
ASSERT clicking carousel item opens Lightbox with correct index
ASSERT Servicios image container div has NO border style
ASSERT NeonGradientCard in servicios.map() has borderSize={4}
ASSERT Hero sticker index 0 width = "100px" AND height = "100px"
ASSERT Hero sticker index 1 width = "100px" AND height = "100px"
```

### Preservation Checking

**Goal**: Verify that for all inputs where `isBugCondition(X)` returns `false`, the fixed code produces the same result as the original code.

**Pseudocode:**
```
FOR ALL element X WHERE NOT isBugCondition(X) DO
  ASSERT render_original(X) = render_fixed(X)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because it generates many test cases automatically across the input domain, catches edge cases that manual unit tests might miss, and provides strong guarantees that behavior is unchanged for all non-buggy inputs.

**Test Plan**: Observe behavior on UNFIXED code for all non-bug elements, then write tests capturing that behavior to verify it continues after the fix.

**Test Cases:**

1. **Nosotros section content preservation**: Verify the NeonGradientCard layout, accordion items, and section padding in Nosotros are unchanged after the transition mask fix.
2. **Contacto right column preservation**: Verify the locations panel, hours table, BorderBeam, and layout in the Contacto right column are unchanged after the tint fix.
3. **Contacto hover effects preservation**: Verify the `onMouseEnter`/`onMouseLeave` border color and transform effects on contact cards are unchanged.
4. **Sedes slug info card preservation**: Verify the edades, servicios, dirección, and WhatsApp button in the sede info card are unchanged after the description and carousel fixes.
5. **Sedes slug map preservation**: Verify the NeonGradientCard map iframe is unchanged.
6. **Carousel navigation preservation**: Verify the prev/next arrow buttons and dot indicators continue to work correctly after the carousel unification.
7. **Servicios Lens effect preservation**: Verify the Lens hover/zoom effect on service card images is fully functional after the border removal.
8. **Servicios text preservation**: Verify AuroraText titles, description text, and colored highlights in Servicios cards are unchanged.
9. **Hero stat card container preservation**: Verify the 220×200px stat card containers, number tickers, labels, and borders are unchanged after the sticker size fix.
10. **Hero sticker index 2 preservation**: Verify the "7 idiomas" sticker remains exactly 70×70px.
11. **Galería page preservation**: Verify the Galería page is completely unmodified.

### Unit Tests

- Test that `Nosotros.tsx` transition div renders with `maskImage: "linear-gradient(to top, black 0%, transparent 100%)"`.
- Test that each entry in the `contactos` array in `Contacto.tsx` has a `tint` value with opacity `0.20`.
- Test that `app/sedes/[slug]/page.tsx` does not contain `BabysVideoPlayer`, `PlayIcon`, `PauseIcon`, or `VolumeIcon` exports/definitions.
- Test that the carousel container in `app/sedes/[slug]/page.tsx` does not have `lg:aspect-auto` in its className.
- Test that the carousel video element renders with `controls` and without `autoPlay`.
- Test that clicking a carousel item calls `setLightboxOpen(true)`.
- Test that `Servicios.tsx` image container div has no `border` in its inline style.
- Test that each `NeonGradientCard` in `Servicios.tsx` receives `borderSize={4}`.
- Test that Hero sticker `motion.div` for index 0 and 1 has `width: "100px"` and `height: "100px"`.
- Test that Hero sticker `motion.div` for index 2 has `width: "70px"` and `height: "70px"`.

### Property-Based Tests

- Generate all 3 sede slugs (`babys`, `jardin`, `after-class`) and verify the carousel container always has `aspect-square` and never `lg:aspect-auto`.
- Generate all 3 sede slugs and verify the lightbox `slides` array is built correctly from `sede.fotos` (video files produce `{ type: "video", sources: [...] }`, image files produce `{ src }`).
- Generate all 4 contact entries and verify each `tint` value has opacity in the range `[0.18, 0.25]`.
- Generate all 12 servicios entries and verify each `NeonGradientCard` has `borderSize={4}` and the image container has no `border` style property.
- Generate all 3 stat indices and verify: index 0 → 100px, index 1 → 100px, index 2 → 70px.

### Integration Tests

- Load `/sedes/babys` and verify: no custom video player UI, native `<video controls>` is present, carousel is square, clicking the video opens the lightbox.
- Load `/sedes/jardin` on a 1440px viewport and verify the carousel maintains a 1:1 aspect ratio.
- Load `/sedes/after-class` and click the second carousel item; verify the lightbox opens at index 1.
- Load the homepage and scroll to Nosotros→Sedes boundary; verify a clean upward dissolve with no visible band artifact.
- Load the Contacto section and verify all four contact cards have clearly visible pastel backgrounds.
- Load the Servicios section and verify NeonGradientCard borders are visually consistent with Nosotros cards.
- Load the Hero section and verify the "30 años" and "3 sedes" sticker images are visibly larger than the "7 idiomas" sticker.
