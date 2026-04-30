# Bugfix Requirements Document

## Introduction

The "Guardería Winnie Pooh" Next.js website has 14 UI defects across multiple components (Navbar, Hero, Nosotros, Sedes, Servicios, and the slug routing). These range from incorrect font weights and highlight styles, to missing background images, wrong emoji presence, incorrect slug values, and missing decorative elements. Each correction is scoped to a specific component and must not affect unrelated sections.

---

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the desktop navbar renders THEN the system displays navigation links with font-weight 600 and font-size 0.9rem instead of bold (700) and a larger size.

1.2 WHEN the Hero renders the phrase about "7 idiomas" THEN the system applies a background-fill highlight box (`type="box"`) instead of an underline-only style.

1.3 WHEN the Stats section renders the first two sticker images ("30 años de experiencia" and "3 sedes Medellín") THEN the system displays them at 70×70px and 70×70px respectively, visually smaller than the third sticker ("Winnie-guiño") at 70×70px — all three are the same size but the third appears larger due to its image content, and the intent is for the first two to be explicitly enlarged.

1.4 WHEN any Magic UI HighLight component renders with `type="box"` (the default) THEN the system fills the entire text background with a color overlay instead of showing only an underline beneath the text.

1.5 WHEN the Nosotros component renders THEN the system displays 🎯 and 📅 emojis inside the card headers, and all titles and body text are left-aligned rather than centered.

1.6 WHEN the Nosotros component renders the "Horarios disponibles" label THEN the system displays it at font-size 1.2rem with color `#EB8100` (orange).

1.7 WHEN the Nosotros component renders the Propósito card and the Calendario card THEN the system applies no explicit border or a thin border to the inner schedule box, and the NeonGradientCard borders are at their default thin width.

1.8 WHEN the Sedes component renders each sede card's address THEN the system displays the address text at font-size 0.95rem.

1.9 WHEN the Sedes section renders THEN the system shows a plain white background with no background image behind the cards.

1.10 WHEN the Sedes section renders each sede card THEN the system applies no inner glow effect inside the card boundaries.

1.11 WHEN the slug routing resolves sede pages THEN the system includes "jardín infantil" as a valid slug value or label alongside "jardín" and "prejardín", when only "jardín" and "after-class" (and "babys") should exist — specifically the slug `jardin-infantil` or any label "jardín infantil" must not appear.

1.12 WHEN the Servicios component renders each service card title THEN the system displays the title text in a single uniform color (`#1e293b`) instead of cycling individual letter colors through the site palette.

1.13 WHEN the Servicios component renders each service card THEN the system displays a white/transparent card background (`bg-white/95`) with no distinct background color per card.

1.14 WHEN the Servicios section renders THEN the system displays small animated sticker images (winnie-piggy, winnie-feliz, winnie-estrellas) as decorative corner elements instead of the four designated character PNG images (winnie-globo.png, elefante-globo.png, tigger-globo.png, piggy-globo.png) at the four corners.

---

### Expected Behavior (Correct)

2.1 WHEN the desktop navbar renders THEN the system SHALL display each navigation link with font-weight 700 (bold) and a noticeably larger font-size, while keeping navbar height and hover color-change behavior unchanged.

2.2 WHEN the Hero renders the phrase about "7 idiomas" THEN the system SHALL apply an underline-only style (type="underline") using the same HighLight component as the other underlined words, with blue underline color and no background fill.

2.3 WHEN the Stats section renders the first two sticker images THEN the system SHALL display them at a larger explicit size (e.g., 90×90px or similar) so they visually match the apparent size of the third sticker, without changing the card container dimensions.

2.4 WHEN any Magic UI HighLight component renders THEN the system SHALL display only an underline beneath the text for all instances, with no background highlight, text fill, or color overlay, preserving the underline color per instance.

2.5 WHEN the Nosotros component renders THEN the system SHALL display no 🎯 or 📅 emojis, and all titles and body text within the component SHALL be centered.

2.6 WHEN the Nosotros component renders the "Horarios disponibles" label THEN the system SHALL display it at a noticeably larger font-size (e.g., 1.5rem or greater) and in blue or another vibrant color fitting the site palette (not orange).

2.7 WHEN the Nosotros component renders the Propósito card and the Calendario card THEN the system SHALL apply visibly thicker borders to both cards, with only border-width changing and no other card styling (background, padding, border-radius) affected.

2.8 WHEN the Sedes component renders each sede card's address THEN the system SHALL display the address text at a noticeably larger font-size (e.g., 1.1rem or greater).

2.9 WHEN the Sedes section renders THEN the system SHALL display a background image from the public/ directory behind all card content, with the same image treatment (overlay, opacity, blur, or similar) as used in the Hero and Contact sections.

2.10 WHEN the Sedes section renders each sede card THEN the system SHALL apply an inner glow effect visible only inside card boundaries (inset/contained), similar to the glow used in the Nosotros component, without any glow bleeding outside the card or obscuring the background image.

2.11 WHEN the slug routing resolves sede pages THEN the system SHALL only accept "jardin", "babys", and "after-class" as valid slug values. No slug or label "jardín infantil" or "jardin-infantil" SHALL exist anywhere in routing or display logic.

2.12 WHEN the Servicios component renders each service card title THEN the system SHALL color each individual letter using the same color palette as the Reseñas/marquee section, cycling through the palette across letters.

2.13 WHEN the Servicios component renders each service card THEN the system SHALL display a visible background color per card consistent with the site's color palette, and SHALL slightly adjust image layout within each card for better composition, while keeping the lens/zoom hover effect fully functional.

2.14 WHEN the Servicios section renders THEN the system SHALL display four character PNG images (winnie-globo.png top-left, elefante-globo.png bottom-left, tigger-globo.png top-right, piggy-globo.png bottom-right) absolutely positioned at the four corners of the section container (position: relative), large enough to anchor each corner, without interfering with readability or interactivity of service cards.

---

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the navbar renders on mobile THEN the system SHALL CONTINUE TO display the hamburger menu, mobile dropdown, and all existing responsive breakpoint behavior.

3.2 WHEN the navbar brand ("Winnie Pooh" logo and text) renders THEN the system SHALL CONTINUE TO display correctly with no size or layout changes.

3.3 WHEN the Hero renders all other highlighted words ("aprendizaje", "felicidad de tu hijo") THEN the system SHALL CONTINUE TO display them with their existing underline style and colors.

3.4 WHEN the Stats section renders the third sticker ("Winnie-guiño") THEN the system SHALL CONTINUE TO display it at its current size without modification.

3.5 WHEN the Nosotros component renders the accordion items (misionPuntos) THEN the system SHALL CONTINUE TO expand and collapse correctly with all existing animation behavior.

3.6 WHEN the Nosotros component renders the calendar items and schedule rows THEN the system SHALL CONTINUE TO display all content, layout, and colors correctly except for the specific changes to "Horarios disponibles" label size/color and border thickness.

3.7 WHEN the Sedes component renders the card content (logo, title, description, niveles list, button) THEN the system SHALL CONTINUE TO display all content correctly with no layout or content changes beyond address font-size.

3.8 WHEN the Sedes slug pages (/sedes/jardin, /sedes/babys, /sedes/after-class) render THEN the system SHALL CONTINUE TO resolve correctly and display all existing content.

3.9 WHEN the Servicios component renders the section header and description THEN the system SHALL CONTINUE TO display the AuroraText titles and subtitle without modification.

3.10 WHEN the Servicios component renders each service card THEN the system SHALL CONTINUE TO display the Lens hover/zoom effect fully functional on the icon image.

3.11 WHEN the Contacto section renders THEN the system SHALL CONTINUE TO display its background image and overlay treatment without modification.

3.12 WHEN the Resenas component renders THEN the system SHALL CONTINUE TO display all marquee cards, colors, and animations without modification.
