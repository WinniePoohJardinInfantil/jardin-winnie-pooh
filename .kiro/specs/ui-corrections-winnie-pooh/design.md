# UI Corrections Winnie Pooh - Bugfix Design

## Overview

This document formalizes the fix approach for 14 UI defects across the Guardería Winnie Pooh Next.js website.
The bugs span six components (Navbar, Hero, Nosotros, Sedes, Servicios) and the slug routing layer.
Defects range from incorrect font weights and highlight styles, to missing background images, wrong emoji
presence, incorrect slug values, and missing decorative character images.

The fix strategy is minimal and targeted: each correction touches only the specific property or element
described in the requirements, leaving all surrounding layout, animation, and content behavior intact.
Preservation is verified by confirming that all inputs outside each bug condition produce identical output
before and after the fix.

## Glossary

- **Bug_Condition (C)**: The set of render inputs or component states that trigger one of the 14 defects.
- **Property (P)**: The desired visual or behavioral output when the bug condition holds.
- **Preservation**: All existing behavior that must remain identical after the fix.
- **isBugCondition(input)**: Pseudocode predicate returning true when a render input triggers a defect.
- **expectedBehavior(result)**: Pseudocode predicate returning true when rendered output is correct.
- **Navbar**: `components/Navbar.tsx` - fixed top navigation bar with desktop links and mobile hamburger.
- **Hero**: `components/Hero.tsx` - landing hero with title, HighLight description, and stats stickers.
- **HighLight (local)**: Inline span component defined inside Hero.tsx and Nosotros.tsx for text decoration.
- **Highlighter (Magic UI)**: `components/ui/highlighter.tsx` - rough-notation annotation component.
- **NeonGradientCard**: `components/ui/neon-gradient-card.tsx` - card with animated neon border, accepts `borderSize` prop (default: 2).
- **Nosotros**: `components/Nosotros.tsx` - mission section with two NeonGradientCards (Proposito and Calendario).
- **Sedes**: `components/Sedes.tsx` - three-column sede cards section.
- **Servicios**: `components/Servicios.tsx` - 12-card service grid with Lens hover effect.
- **Resenas palette**: Colors cycling through `["#FF7893", "#7AC0FF", "#7E3AF2", "#FFFC01", "#4FF084", "#EB8100"]`.
- **slug routing**: `app/sedes/[slug]/page.tsx` - dynamic route resolving sede detail pages.
- **sedes-bg**: `public/images/sedes-bg.jpg` (or `.png`) - background image for the Sedes section.
- **character PNGs**: `winnie-globo.png` (213x916), `elefante-globo.png` (434x575), `tigger-globo.png` (414x603), `piggy-globo.png` (415x601).

## Bug Details

### Bug Condition

The 14 defects each have a distinct trigger condition, all evaluated at component render time.

**Formal Specification:**
```
FUNCTION isBugCondition(component, prop, context)
  INPUT: component name, prop/state value, render context
  OUTPUT: boolean

  // C1 - Navbar font weight
  IF component = "Navbar" AND desktop link fontWeight = 600 THEN RETURN true

  // C2 - Hero 7-idiomas highlight type
  IF component = "Hero" AND highlight("7 idiomas").type = "box" THEN RETURN true

  // C3 - Stats sticker size
  IF component = "Hero" AND sticker.index IN [0, 1] AND sticker.containerSize = 70px THEN RETURN true

  // C4 - Highlighter default action
  IF component = "Highlighter" AND action = "highlight" (default) THEN RETURN true

  // C5 - Nosotros emojis present
  IF component = "Nosotros" AND emojiDiv(target OR calendar) is rendered THEN RETURN true

  // C6 - Nosotros text alignment
  IF component = "Nosotros" AND cardTitle.textAlign != "center" THEN RETURN true

  // C7 - Horarios label size/color
  IF component = "Nosotros" AND horariosLabel.fontSize < 1.5rem THEN RETURN true
  IF component = "Nosotros" AND horariosLabel.color = "#EB8100" THEN RETURN true

  // C8 - NeonGradientCard border thickness
  IF component = "Nosotros" AND NeonGradientCard.borderSize = 2 THEN RETURN true

  // C9 - Sedes address font size
  IF component = "Sedes" AND addressText.fontSize = "0.95rem" THEN RETURN true

  // C10 - Sedes background image absent
  IF component = "Sedes" AND backgroundImage is absent THEN RETURN true

  // C11 - Sedes card inner glow absent
  IF component = "Sedes" AND card.boxShadow has no inset THEN RETURN true

  // C12 - Slug routing invalid label
  IF component = "SedePage" AND sedesData["jardin"].subtitulo contains "infantil" as slug THEN RETURN true

  // C13 - Servicios title uniform color
  IF component = "Servicios" AND cardTitle.color = "#1e293b" (single uniform) THEN RETURN true

  // C14a - Servicios card background
  IF component = "Servicios" AND cardInner.className = "bg-white/95" THEN RETURN true

  // C14b - Servicios corner decorations
  IF component = "Servicios" AND cornerDecorations use .webp stickers THEN RETURN true

  RETURN false
END FUNCTION
```

### Examples

- **C1 Navbar**: Desktop `<a>` links render with `fontWeight: 600, fontSize: "0.9rem"`. Expected: `fontWeight: 700` and `fontSize >= "1rem"`.
- **C2 Hero highlight**: `<HighLight color="#00c3ff56">7 idiomas</HighLight>` defaults to `type="box"` (full background fill). Expected: `type="underline"` with blue underline only.
- **C3 Stats stickers**: Stat cards at index 0 and 1 use `width: "70px", height: "70px"` image containers. Expected: `90px x 90px`.
- **C4 Highlighter**: `<Highlighter>` with no `action` prop uses `action="highlight"` (rough-notation full background). Expected: `action="underline"`.
- **C5 Nosotros emojis**: Card headers render a `div` with emoji characters (target emoji, calendar emoji). Expected: no emoji div rendered.
- **C6 Nosotros alignment**: Card titles and body text use default left alignment. Expected: `textAlign: "center"`.
- **C7 Horarios label**: Renders at `fontSize: "1.2rem"` with `color: "#EB8100"`. Expected: `>= 1.5rem` and a blue color (e.g. `#00C2FF` or `#2563EB`).
- **C8 NeonGradientCard**: Both Nosotros cards use `borderSize` default of `2`. Expected: visibly thicker (e.g. `borderSize={4}` or `borderSize={5}`).
- **C9 Sedes address**: Address `<p>` renders at `fontSize: "0.95rem"`. Expected: `>= 1.1rem`.
- **C10 Sedes background**: Section has `bg-white` with no background image element. Expected: `sedes-bg.jpg` with mask + radial overlay matching Hero/Contacto pattern.
- **C11 Sedes card glow**: Card inner `div` has `boxShadow` with only outer shadow. Expected: additional `inset 0 0 40px {color}30` style glow contained within card.
- **C12 Slug routing**: The `sedesData` object keys are `"babys"`, `"jardin"`, `"after-class"`. The `"jardin"` entry subtitulo is `"Jardin Infantil"` which is correct display text, but no slug `"jardin-infantil"` must exist anywhere in routing or `sedesData` keys.
- **C13 Servicios title**: `<h3>` renders all letters with `color: "#1e293b"`. Expected: each letter wrapped in a `<span>` with a color from the Resenas palette cycling by index.
- **C14a Servicios card bg**: Inner card `div` has `className="... bg-white/95 ..."`. Expected: a visible palette background color per card (e.g. using `color2` from the servicios data).
- **C14b Servicios decorations**: Three `<motion.div>` elements use `.webp` images at left/right sides. Expected: four `<Image>` elements with character `.png` files absolutely positioned at the four corners of the section.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Navbar mobile hamburger menu, dropdown, and all responsive breakpoints must continue to work exactly as before.
- Navbar brand logo and "Winnie Pooh / JARDIN INFANTIL" text must remain unchanged in size and layout.
- Hero highlighted words "aprendizaje" and "felicidad de tu hijo" must keep their existing underline style and colors.
- Hero third stats sticker (index 2, "Winnie-guino") must remain at its current 70px size.
- Nosotros accordion items (misionPuntos) must continue to expand/collapse with all existing animation behavior.
- Nosotros calendar items and schedule rows must display all content and colors correctly (except the specific Horarios label and border changes).
- Sedes card content (logo, title, description, niveles list, button) must display correctly with no layout changes beyond address font-size.
- Slug pages `/sedes/jardin`, `/sedes/babys`, `/sedes/after-class` must continue to resolve and display all existing content.
- Servicios section header (AuroraText titles and subtitle) must remain unchanged.
- Servicios Lens hover/zoom effect must remain fully functional on all service card icon images.
- Contacto section background image and overlay treatment must remain unchanged.
- Resenas component marquee cards, colors, and animations must remain unchanged.

**Scope:**
All component props, state, animations, and content that are NOT listed in the 14 bug conditions above
must be completely unaffected by the fixes. This includes:
- All framer-motion animations (BlurFade, motion.div, whileHover, animate)
- All AuroraText, SparklesText, NumberTicker, MagicCard, BorderBeam components
- All Supabase/data fetching logic
- All CSS custom properties and global styles in `app/globals.css`
- All other sections: Galeria, Footer, WhatsAppButton, Admin pages

## Hypothesized Root Cause

Based on code analysis of the source files, the root causes for each defect are:

1. **Navbar font weight/size (C1)**: The desktop link `<a>` style object explicitly sets `fontWeight: 600` and `fontSize: "0.9rem"`. These values were set conservatively and need to be bumped to `700` and `"1.05rem"` respectively.

2. **Hero 7-idiomas highlight type (C2)**: The `<HighLight>` component for "7 idiomas" does not pass a `type` prop, so it defaults to `"box"` (full background fill). The other two highlights in the same paragraph already pass `type="underline"`. The fix is adding `type="underline"` and keeping the existing `color="#00c3ff56"`.

3. **Stats sticker size (C3)**: The `motion.div` wrapper for each stat sticker uses `style={{ width: "70px", height: "70px" }}` hardcoded for all three. The first two stickers (winnie-estrellas, tigger-cafe) have image content that appears visually smaller than the third (winnie-guino). The fix is increasing the container to `90px × 90px` for indices 0 and 1 only, leaving index 2 at 70px.

4. **Highlighter default action (C4)**: `components/ui/highlighter.tsx` declares `action = "highlight"` as the default parameter. The rough-notation `"highlight"` type fills the entire text background with color. Changing the default to `"underline"` fixes all call sites that rely on the default without requiring changes at each usage.

5. **Nosotros emojis (C5)**: Each NeonGradientCard header contains a `<div>` with `fontSize: "2rem"` rendering the 🎯 and 📅 emoji characters directly. Removing these `<div>` elements eliminates the emojis. The card title `<h3>` is unaffected.

6. **Nosotros text alignment (C6)**: The card header `<div>` uses `display: "flex", alignItems: "center"` without `justifyContent: "center"`, so titles are left-aligned. Body `<p>` elements have no explicit `textAlign`. Adding `textAlign: "center"` and `justifyContent: "center"` to the relevant containers fixes alignment for both cards.

7. **Horarios label size/color (C7)**: The "Horarios disponibles" `<p>` element has `fontSize: "1.2rem"` and `color: "#EB8100"` (orange). These are hardcoded values that need to be changed to `fontSize: "1.5rem"` and a blue color from the site palette (e.g. `#00C2FF` or `#7AC0FF`).

8. **NeonGradientCard border thickness (C8)**: Both Nosotros `<NeonGradientCard>` components omit the `borderSize` prop, so they use the default `borderSize={2}`. Passing an explicit `borderSize={4}` prop to both the Propósito and Calendario cards makes the neon border visibly thicker.

9. **Sedes address font size (C9)**: The address `<p>` in the Sedes card footer uses `fontSize: "0.95rem"` (the `text-[0.95rem]` Tailwind class). Increasing this to `text-[1.1rem]` satisfies the requirement.

10. **Sedes background image absent (C10)**: The `<section>` element uses `className="relative bg-white pb-16 overflow-visible"` with no background image child. The Hero and slug page sections both use an absolutely-positioned `<div>` containing a masked `<Image>` plus a radial gradient overlay. The same pattern needs to be added to the Sedes section using `public/images/sedes-bg.jpg`.

11. **Sedes card inner glow absent (C11)**: The card inner `div` has `boxShadow: "0 25px 45px -15px {color}20"` (outer shadow only). Adding an `inset 0 0 40px {color}18` component to the same `boxShadow` string creates a contained inner glow that does not bleed outside the card's `border-radius`.

12. **Slug routing (C12)**: The `sedesData` object in `app/sedes/[slug]/page.tsx` does not contain a `"jardin-infantil"` key — the existing key is `"jardin"`. The `Sedes.tsx` component also uses `slug: "jardin"` correctly. The defect is that the `sedesData["jardin"].subtitulo` value is `"Jardín Infantil"` which is acceptable as display text, but the `Navbar.tsx` logo `<img>` still references `/logos/jardin-infantil.png` (filename only, not a route). No routing change is needed; the fix is a verification pass confirming no `"jardin-infantil"` key or route exists anywhere, and removing any stray reference if found.

13. **Servicios title uniform color (C13)**: The `<h3>` renders the full title string as a single text node with `color: "#1e293b"`. To achieve per-letter coloring, the title string must be split into individual characters, each wrapped in a `<span>` with a color from the Resenas palette cycling by character index (skipping spaces).

14. **Servicios card background (C14a)**: The inner card `div` has `className="... bg-white/95 ..."`. Replacing this with an inline `background` style using the card's `color2` value (the lighter palette color already defined in the `servicios` data array) gives each card a distinct visible tinted background while keeping the card readable.

15. **Servicios corner decorations (C14b)**: Three `<motion.div>` elements with `.webp` images are positioned at left/right sides of the section using `absolute` positioning. These need to be replaced with four absolutely-positioned `<Image>` elements using the four character `.png` files, placed at the four corners of the `<section>` container (which already has `position: relative` via `className="relative"`).

---

## Correctness Properties

Property 1: Bug Condition - All 14 UI Defects Are Corrected

_For any_ render of the affected components where the bug condition holds (isBugCondition returns true for any of C1–C14b), the fixed components SHALL produce the correct visual output as specified: correct font weights, underline-only highlights, enlarged stickers, no emojis, centered text, larger Horarios label in blue, thicker card borders, larger address text, Sedes background image with overlay, card inner glow, valid slug routing only, per-letter multicolor titles, tinted card backgrounds, and four character PNG corner decorations.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13, 2.14**

Property 2: Preservation - All Non-Buggy Inputs Produce Identical Output

_For any_ render input where the bug condition does NOT hold (isBugCondition returns false — i.e., all component props, state, animations, and content not listed in the 14 bug conditions), the fixed components SHALL produce exactly the same output as the original components, preserving all existing layout, animation, content, responsive behavior, and interactivity.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12**

---

## Fix Implementation

### Changes Required

Assuming the root cause analysis above is correct, the following targeted changes are needed:

---

**File**: `components/Navbar.tsx`

**Fix C1 — Navbar font weight and size**

**Specific Changes**:
1. In the desktop `<a>` style object, change `fontWeight: 600` → `fontWeight: 700`.
2. In the desktop `<a>` style object, change `fontSize: "0.9rem"` → `fontSize: "1.05rem"`.
3. No changes to `padding`, `borderRadius`, `transition`, hover handlers, or any other property.

---

**File**: `components/Hero.tsx`

**Fix C2 — Hero "7 idiomas" highlight type**

**Specific Changes**:
1. On the `<HighLight color="#00c3ff56">7 idiomas</HighLight>` instance, add `type="underline"`.
2. No changes to the other two `<HighLight>` instances or any other element.

**Fix C3 — Stats sticker size**

**Specific Changes**:
1. In the `stats.map` render, conditionally set the `motion.div` container size:
   - If `index < 2`: `width: "90px", height: "90px"`
   - If `index === 2`: keep `width: "70px", height: "70px"`
2. No changes to the stat card container dimensions, number ticker, or label.

---

**File**: `components/ui/highlighter.tsx`

**Fix C4 — Highlighter default action**

**Specific Changes**:
1. Change the default parameter from `action = "highlight"` → `action = "underline"`.
2. No other changes to the component.

---

**File**: `components/Nosotros.tsx`

**Fix C5 — Remove emojis**

**Specific Changes**:
1. In the Propósito card header, remove the entire `<div>` containing the 🎯 emoji (the 60×60px icon div).
2. In the Calendario card header, remove the entire `<div>` containing the 📅 emoji (the 60×60px icon div).
3. Keep the `<h3>` title elements and their styles intact.

**Fix C6 — Center titles and body text**

**Specific Changes**:
1. On the Propósito card header `<div>` (the flex row containing the title), add `justifyContent: "center"`.
2. On the Propósito card body `<p>`, add `textAlign: "center"`.
3. On the Calendario card header `<div>`, add `justifyContent: "center"`.
4. On each calendar item `<span>` text, add `textAlign: "center"` (or center the parent flex row).
5. On the Horarios schedule rows, add `justifyContent: "center"` to the outer container if needed.

**Fix C7 — Horarios label size and color**

**Specific Changes**:
1. On the "🕐 Horarios disponibles" `<p>` element, change `fontSize: "1.2rem"` → `fontSize: "1.5rem"`.
2. Change `color: "#EB8100"` → `color: "#00C2FF"` (site blue palette).
3. No other changes to the schedule box background, border, or child rows.

**Fix C8 — Thicker NeonGradientCard borders**

**Specific Changes**:
1. On the Propósito `<NeonGradientCard>`, add `borderSize={4}`.
2. On the Calendario `<NeonGradientCard>`, add `borderSize={4}`.
3. No changes to `neonColors`, `className`, or any other prop.

---

**File**: `components/Sedes.tsx`

**Fix C9 — Address font size**

**Specific Changes**:
1. On the address `<p>` element, change `text-[0.95rem]` → `text-[1.1rem]` (or equivalent inline style).
2. No other changes to the address element's color, font-weight, icon, or layout.

**Fix C10 — Sedes background image**

**Specific Changes**:
1. Add `import Image from "next/image"` if not already present (it is already imported).
2. Inside the `<section>` element, add an absolutely-positioned background `<div>` as the first child:
   ```tsx
   <div className="absolute inset-0 z-0 pointer-events-none">
     <div className="relative w-full h-full"
       style={{
         maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
         WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
         opacity: 0.35,
       }}
     >
       <Image src="/images/sedes-bg.jpg" alt="Sedes background" fill className="object-cover" />
     </div>
     <div className="absolute inset-0"
       style={{ background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.0) 100%)" }}
     />
   </div>
   ```
3. Ensure the existing content `<div className="container mx-auto ...">` has `relative z-20` (already has `relative z-20`).

**Fix C11 — Sedes card inner glow**

**Specific Changes**:
1. On each card inner `div`'s `boxShadow` style, append the inset glow:
   - Before: `boxShadow: "0 25px 45px -15px {color}20"`
   - After: `boxShadow: "0 25px 45px -15px {color}20, inset 0 0 40px {color}18"`
2. No changes to `background`, `backdropFilter`, `borderRadius`, `border`, or `padding`.

---

**File**: `app/sedes/[slug]/page.tsx`

**Fix C12 — Slug routing cleanup**

**Specific Changes**:
1. Verify that `sedesData` contains exactly three keys: `"babys"`, `"jardin"`, `"after-class"`.
2. Confirm no key `"jardin-infantil"` exists in `sedesData`.
3. The `subtitulo` display values (`"Baby's"`, `"Jardín Infantil"`, `"After Class"`) are display text only and are acceptable.
4. If any stray `"jardin-infantil"` key or route reference is found, remove it.
5. No other changes to the file.

---

**File**: `components/Servicios.tsx`

**Fix C13 — Per-letter multicolor titles**

**Specific Changes**:
1. Create a helper function `ColoredTitle` that accepts a string and renders each character in a `<span>` with a color from the Resenas palette cycling by index (spaces rendered without a span or with `color: "inherit"`):
   ```tsx
   const PALETTE = ["#FF7893", "#7AC0FF", "#7E3AF2", "#FFFC01", "#4FF084", "#EB8100"];
   function ColoredTitle({ text }: { text: string }) {
     let colorIdx = 0;
     return (
       <>
         {text.split("").map((char, i) =>
           char === " " ? (
             <span key={i}>&nbsp;</span>
           ) : (
             <span key={i} style={{ color: PALETTE[colorIdx++ % PALETTE.length] }}>
               {char}
             </span>
           )
         )}
       </>
     );
   }
   ```
2. Replace the `<h3>` content `{s.titulo}` with `<ColoredTitle text={s.titulo} />`.
3. Remove the `color: "#1e293b"` from the `<h3>` style (or set it to `"inherit"`).

**Fix C14a — Servicios card background color**

**Specific Changes**:
1. On the inner card `div`, replace `className="... bg-white/95 ..."` with an inline `background` style using `s.color2` at ~60% opacity:
   - Remove `bg-white/95` from className.
   - Add `style={{ background: s.color2 + "99" }}` (or a similar alpha value for visibility).
2. No changes to `padding`, `borderRadius`, `text-center`, or any other class.

**Fix C14b — Servicios corner character PNGs**

**Specific Changes**:
1. Remove the three existing `<motion.div>` decorative elements (winnie-piggy, winnie-feliz, winnie-estrellas).
2. Replace with four absolutely-positioned `<Image>` elements inside the `pointer-events-none` overlay `<div>`, using `position: absolute` at each corner of the section:
   - Top-left: `winnie-globo.png` (213×916 natural — render at ~100px wide, `top-[5%] left-[1%]`)
   - Bottom-left: `elefante-globo.png` (434×575 natural — render at ~110px wide, `bottom-[5%] left-[1%]`)
   - Top-right: `tigger-globo.png` (414×603 natural — render at ~110px wide, `top-[5%] right-[1%]`)
   - Bottom-right: `piggy-globo.png` (415×601 natural — render at ~110px wide, `bottom-[5%] right-[1%]`)
3. Each image uses `hidden xl:block` to only appear on large screens (matching the existing behavior).
4. No animation is required (static positioning), though a gentle float animation may be added optionally.

---

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate each
defect on the unfixed code, then verify the fix works correctly and preserves all existing behavior.
Given that all 14 defects are pure UI rendering issues (no async logic, no data fetching, no state
machines), the primary testing approach is visual/snapshot unit testing plus property-based tests for
the palette cycling logic.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate each defect BEFORE implementing the fix.
Confirm or refute the root cause analysis. If refuted, re-hypothesize.

**Test Plan**: Render each affected component in isolation (or with a test renderer) and assert the
defective property. Run these tests on the UNFIXED code to observe failures.

**Test Cases**:
1. **Navbar font weight test**: Render `<Navbar />`, query the first desktop link `<a>`, assert `fontWeight === "600"` (will pass on unfixed code, confirming the defect).
2. **Hero highlight type test**: Render `<Hero />`, find the "7 idiomas" HighLight span, assert the inner pseudo-element has `height: "100%"` (box mode) rather than `height: "8px"` (underline mode).
3. **Stats sticker size test**: Render `<Hero />`, find the first two stat `motion.div` containers, assert `width === "70px"`.
4. **Highlighter default action test**: Render `<Highlighter>text</Highlighter>` with no `action` prop, assert the rough-notation annotation type is `"highlight"`.
5. **Nosotros emoji test**: Render `<Nosotros />`, assert that elements with emoji characters 🎯 and 📅 are present in the DOM.
6. **Nosotros alignment test**: Render `<Nosotros />`, assert card header `div` does not have `justifyContent: "center"`.
7. **Horarios label test**: Render `<Nosotros />`, find the "Horarios disponibles" element, assert `fontSize === "1.2rem"` and `color === "#EB8100"`.
8. **NeonGradientCard border test**: Render `<Nosotros />`, assert both NeonGradientCard instances use `borderSize === 2` (default).
9. **Sedes address size test**: Render `<Sedes />`, find address `<p>` elements, assert `fontSize === "0.95rem"`.
10. **Sedes background test**: Render `<Sedes />`, assert no `<img>` or `<Image>` with `src` containing `"sedes-bg"` is present.
11. **Sedes card glow test**: Render `<Sedes />`, find card inner `div`, assert `boxShadow` does not contain `"inset"`.
12. **Slug routing test**: Import `sedesData` from the slug page, assert `Object.keys(sedesData)` does not include `"jardin-infantil"`.
13. **Servicios title color test**: Render `<Servicios />`, find the first card `<h3>`, assert it contains a single text node (not multiple `<span>` children).
14. **Servicios card bg test**: Render `<Servicios />`, find the first card inner `div`, assert `className` contains `"bg-white/95"`.
15. **Servicios decorations test**: Render `<Servicios />`, assert that images with `.webp` extension are present as decorative elements.

**Expected Counterexamples**:
- All 15 assertions above pass on unfixed code, confirming each defect.
- Root cause analysis is confirmed if the defective values match exactly what was found in the source files.

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed components produce the expected behavior.

**Pseudocode:**
```
FOR ALL component WHERE isBugCondition(component, prop, context) DO
  result := render_fixed(component, prop, context)
  ASSERT expectedBehavior(result)
END FOR
```

**Specific assertions after fix**:
- Navbar desktop link: `fontWeight === "700"` AND `fontSize >= "1rem"`
- Hero "7 idiomas" HighLight: inner pseudo-element `height === "8px"` (underline mode)
- Stats stickers index 0 and 1: container `width === "90px"` AND `height === "90px"`
- Highlighter default: annotation type is `"underline"`
- Nosotros: no element with text content `"🎯"` or `"📅"` in DOM
- Nosotros card headers: `justifyContent === "center"`
- Horarios label: `fontSize >= "1.5rem"` AND color is a blue value (not `"#EB8100"`)
- NeonGradientCard: both Nosotros instances have `borderSize >= 4`
- Sedes address: `fontSize >= "1.1rem"`
- Sedes section: contains an `<Image>` with `src="/images/sedes-bg.jpg"`
- Sedes card: `boxShadow` contains `"inset"`
- Slug routing: `Object.keys(sedesData)` equals `["babys", "jardin", "after-class"]` (any order)
- Servicios `<h3>`: contains multiple `<span>` children, each with a distinct `color` from the palette
- Servicios card inner `div`: `background` style uses `color2` value (not `bg-white/95`)
- Servicios section: contains four `<Image>` elements with `.png` character filenames at corners

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed components produce the same result as the original components.

**Pseudocode:**
```
FOR ALL component WHERE NOT isBugCondition(component, prop, context) DO
  ASSERT render_original(component) = render_fixed(component)
END FOR
```

**Testing Approach**: Property-based testing is recommended for the palette cycling logic (C13) because:
- It generates many title strings automatically and verifies the color cycling is consistent
- It catches off-by-one errors in the modulo index calculation
- It provides strong guarantees that no title string produces an out-of-range color

**Test Plan**: Observe behavior on UNFIXED code first for all non-buggy inputs, then write tests capturing that behavior.

**Test Cases**:
1. **Navbar mobile menu preservation**: Verify hamburger button, mobile dropdown, and responsive breakpoints render identically before and after fix.
2. **Navbar brand preservation**: Verify logo image and "Winnie Pooh / JARDIN INFANTIL" text are unchanged.
3. **Hero other highlights preservation**: Verify "aprendizaje" and "felicidad de tu hijo" HighLight instances keep `type="underline"` and their existing colors.
4. **Stats third sticker preservation**: Verify index-2 sticker container remains at `70px × 70px`.
5. **Nosotros accordion preservation**: Verify misionPuntos expand/collapse animation works identically.
6. **Nosotros calendar content preservation**: Verify all calendar items, schedule rows, and colors are unchanged (except Horarios label).
7. **Sedes card content preservation**: Verify logo, title, description, niveles list, and button render identically.
8. **Slug page preservation**: Verify `/sedes/jardin`, `/sedes/babys`, `/sedes/after-class` all resolve and render correctly.
9. **Servicios header preservation**: Verify AuroraText titles and subtitle are unchanged.
10. **Servicios Lens effect preservation**: Verify Lens hover/zoom is functional on all 12 service card images.

### Unit Tests

- Test `ColoredTitle` helper: given a string, verify each non-space character gets a color from the palette cycling by index.
- Test `ColoredTitle` with spaces: verify spaces are rendered without consuming a palette index slot.
- Test Navbar link styles: verify `fontWeight` and `fontSize` values on desktop links.
- Test Sedes address font size: verify the address `<p>` renders at `>= 1.1rem`.
- Test slug routing: verify `sedesData` keys are exactly `["babys", "jardin", "after-class"]`.
- Test Nosotros emoji removal: verify no 🎯 or 📅 characters appear in rendered output.
- Test Horarios label: verify `fontSize >= 1.5rem` and color is blue.

### Property-Based Tests

- **Palette cycling correctness**: For any string of length N (generated randomly), `ColoredTitle` assigns colors such that `color[i] === PALETTE[nonSpaceIndex % PALETTE.length]` for every non-space character at position i.
- **Palette cycling preservation**: For any two strings with the same non-space character count, the color sequence is identical (cycling is deterministic and index-based).
- **Sedes card glow containment**: For any `color` value in the sedes data, the `boxShadow` string contains both an outer shadow and an `inset` component.
- **Slug key exclusion**: For any slug string that is not `"babys"`, `"jardin"`, or `"after-class"`, `sedesData[slug]` returns `undefined`.

### Integration Tests

- Render the full homepage and verify all 14 corrected properties are present simultaneously.
- Navigate to `/sedes/jardin`, `/sedes/babys`, `/sedes/after-class` and verify pages load without errors.
- Verify that navigating to `/sedes/jardin-infantil` returns a 404 (notFound behavior).
- Verify the Servicios section renders all 12 cards with tinted backgrounds and four corner character images visible on xl screens.
- Verify the Sedes section renders the background image and card inner glows without obscuring card content.
