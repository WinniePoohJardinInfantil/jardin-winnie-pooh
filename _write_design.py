doc = """
## Hypothesized Root Cause

Based on code analysis of the source files, the root causes for each defect are:

1. **Navbar font weight/size (C1)**: The desktop link `<a>` style object explicitly sets `fontWeight: 600` and `fontSize: "0.9rem"`. These values were set conservatively and need to be bumped to `700` and `"1rem"` (or larger) respectively.

2. **Hero 7-idiomas highlight type (C2)**: The `<HighLight>` component for "7 idiomas" does not pass a `type` prop, so it defaults to `"box"`. The other two highlights in the same paragraph already pass `type="underline"`. The fix is simply adding `type="underline"` to the "7 idiomas" instance.

3. **Stats sticker size (C3)**: The `motion.div` wrapper for each stat sticker uses `style={{ width: "70px", height: "70px" }}` hardcoded. The first two stickers (winnie-estrellas, tigger-cafe) have image content that appears smaller than the third (winnie-guino). The fix is increasing the container to `90px x 90px` for indices 0 and 1 only.

4. **Highlighter default action (C4)**: `components/ui/highlighter.tsx` declares `action = "highlight"` as the default parameter. The rough-notation `"highlight"` type fills the entire text background. Changing the default to `"underline"` fixes all usages that rely on the default.

5. **Nosotros emojis (C5)**: Each NeonGradientCard header contains a `<div>` with `fontSize: "2rem"` rendering the emoji character directly. Removing these `<div>` elements eliminates the emojis without affecting the card title `<h3>`.

6. **Nosotros text alignment (C6)**: The card header `<div>` uses `display: "flex", alignItems: "center"` (left-aligned by default). The body `<p>` has no explicit `textAlign`. Adding `textAlign: "center"` and `justifyContent: "center"` to the relevant containers fixes alignment.

7. **Horarios label size/color (C7)**: The "Horarios disponibles" `<p>` element has `fontSize: "1.2rem"` and `color: "#EB8100"`. These are hardcoded values that need to be changed to `fontSize: "1.5rem"` (or larger) and a blue color from the site palette (e.g. `#00C2FF`).

8. **NeonGradientCard border thickness (C8)**: Both Nosotros `<NeonGradientCard>` components use the default `borderSize={2}`. Passing an explicit `borderSize={4}` (or `5`) prop to both cards makes the neon border visibly thicker.

9. **Sedes address font size (C9)**: The address `<p>` in the Sedes card footer uses `fontSize: "0.95rem"`. Increasing this to `"1.1rem"` or larger satisfies the requirement.

10. **Sedes background image absent (C10)**: The `<section>` element uses `className="relative bg-white pb-16 overflow-visible"` with no background image child. The Hero and Contacto sections both use an absolutely-positioned `<div>` containing a masked `<Image>` plus a radial gradient overlay. The same pattern needs to be added to the Sedes section using `sedes-bg.jpg`.

11. **Sedes card inner glow absent (C11)**: The card inner `div` has `boxShadow: "0 25px 45px -15px {color}20"` (outer shadow only). Adding an `inset 0 0 40px {color}20` component to the same `boxShadow` value creates a contained inner glow.

12. **Slug routing (C12)**: The `sedesData` object in `app/sedes/[slug]/page.tsx` does not contain a `"jardin-infantil"` key  the existing key is `"jardin"`. However, the requirements specify that no label or slug "jardin infantil" / "jardin-infantil" should exist anywhere. A review confirms the `sedesData["jardin"].subtitulo` is `"Jardin Infantil"` (display text only, not a slug). The `Sedes.tsx` component uses `slug: "jardin"` correctly. No routing change is needed beyond confirming no `"jardin-infantil"` key exists  the fix is a verification/cleanup pass.

13. **Servicios title uniform color (C13)**: The `<h3>` renders the full title string as a single text node with `color: "#1e293b"`. To achieve per-letter coloring, the title string must be split into individual characters, each wrapped in a `<span>` with a color from the Resenas palette cycling by character index.

14. **Servicios card background (C14a)**: The inner card `div` has `className="... bg-white/95 ..."`. Replacing this with an inline `background` style using the card's `color2` value (the lighter palette color already defined in the servicios data array) gives each card a distinct visible background.

15. **Servicios corner decorations (C14b)**: Three `<motion.div>` elements with `.webp` images are positioned at left/right sides of the section. These need to be replaced with four absolutely-positioned `<Image>` elements using the character `.png` files, placed at the four corners of the `<section>` container (which already has `position: relative`).
"""

with open('.kiro/specs/ui-corrections-winnie-pooh/design.md', 'a', encoding='utf-8') as f:
    f.write(doc)
print("root cause written")
