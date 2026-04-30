# Bugfix Requirements Document

## Introduction

This document captures the second round of UI corrections for the "Guardería Winnie Pooh" Next.js website. Thirteen visual and functional defects have been identified across the Navbar, Nosotros, Sedes, Servicios, Contacto, and Sedes slug page sections. Each correction targets a specific rendering or behavioral issue without altering unrelated content, layout, or functionality.

---

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the Navbar renders THEN the system displays the "JARDÍN INFANTIL" subtitle in a small grey style (`color: var(--muted-foreground)`, `font-size: 0.65rem`) that does not stand out visually next to the logo.

1.2 WHEN the Nosotros Calendario card renders THEN the system displays schedule text that is not fully centered and runs sentences together on the same line without a visible line break between the first phrase and its continuation.

1.3 WHEN the Nosotros Propósito card renders THEN the system displays the description text "Atención y cuidado integral a niños y niñas en Medellín." which does not reflect the brand's 30-year legacy messaging.

1.4 WHEN the page scrolls from the Nosotros section to the Sedes section THEN the system shows an abrupt visual transition with only a plain `linear-gradient(to bottom, #ffffff, #f8fafc)` divider, lacking the background-image-based gradient/fade used between Hero and Nosotros.

1.5 WHEN the Sedes section renders THEN the system displays the background image at `opacity: 0.35` with a strong white radial overlay, making the image appear mostly white and barely visible.

1.6 WHEN the Sedes section renders THEN the system displays each sede card with only a faint color border (`border: 3px solid ${sede.color}20`) and no glowing effect on the card frame.

1.7 WHEN the Sedes section renders THEN the system displays each sede card with a near-transparent white background (`background: rgba(255, 255, 255, 0.9)`) and no colored tint matching the sede's theme color.

1.8 WHEN the Servicios section renders THEN the system displays the four corner character images (winnie-globo, elefante-globo, tigger-globo, piggy-globo) at approximately 100–110px wide, which is too small relative to the section size.

1.9 WHEN the Servicios section renders THEN the system displays service card titles using the `ColoredTitle` helper (per-letter span color cycling) instead of the `AuroraText` component, resulting in static colored letters with no animation.

1.10 WHEN the Servicios section renders THEN the system displays each service card image without a visible border or frame around the image container, leaving awkward empty space around the icon.

1.11 WHEN the Contacto section renders THEN the system displays the four info boxes (WhatsApp, email, Instagram, Google Reseñas) at full column width with excess horizontal padding, making them appear too wide relative to their content.

1.12 WHEN a sede slug page (`/sedes/jardin`, `/sedes/babys`, `/sedes/after-class`) renders THEN the system displays a background using `/images/white.jpg` at `opacity: 0.4`, which provides no meaningful visual background image for the page.

1.13 WHEN the sede slug page carousel encounters a video file (mp4, webm, or similar) in the `fotos` array THEN the system attempts to render it as a `next/image` `<Image>` element, which does not support video media and fails to play the video.

---

### Expected Behavior (Correct)

2.1 WHEN the Navbar renders THEN the system SHALL display the "JARDÍN INFANTIL" subtitle with a visible contrasting color (e.g. the site's primary accent color) and/or `font-weight: bold` so it clearly stands out next to the logo, while all other navbar elements remain unchanged.

2.2 WHEN the Nosotros Calendario card renders THEN the system SHALL display all schedule text centered, and each calendar entry SHALL have a line break after the first sentence or phrase so the continuation appears on the next line below, with no other content, colors, or layout changed.

2.3 WHEN the Nosotros Propósito card renders THEN the system SHALL display the description text "Somos el comienzo de una vida plena para sus hijos. +30 años de amor y dedicación a nuestros pequeños" with the same font size, color, alignment, and styling as the previous text.

2.4 WHEN the page transitions from the Nosotros section to the Sedes section THEN the system SHALL apply a gradient or fade transition using the background image, visually matching the same style and technique used between Hero and Nosotros, without changing any content, layout, or z-index of either section.

2.5 WHEN the Sedes section renders THEN the system SHALL display the background image noticeably more visible with higher opacity or a reduced white overlay so the image clearly shows through, while all card content remains fully readable.

2.6 WHEN the Sedes section renders THEN the system SHALL display each sede card with a glowing border matching its theme color: Jardín = yellow glow, Baby's = pink/rose glow, After Class = blue glow, applied to the outer border/frame of the card container without excessive bleed outside the card area.

2.7 WHEN the Sedes section renders THEN the system SHALL display each sede card with a very light colored background tint: Jardín = very light yellow, Baby's = very light pink/rose, After Class = very light blue, subtle enough that all text remains fully readable, with no font colors, sizes, or other card content styles changed.

2.8 WHEN the Servicios section renders THEN the system SHALL display each of the four corner character images at approximately double or triple their current rendered size, all fully within the visible bounds of the section (no overflow clipping), none overlapping or interfering with the service cards, and with the existing `hidden xl:block` responsive behavior intact.

2.9 WHEN the Servicios section renders THEN the system SHALL display each service card title using the `AuroraText` component with the same color palette as currently defined but with the color order rotated or shifted differently per card so the aurora animation looks visually distinct across cards, with font size, font weight, and all other h3 styles unchanged, and no other text in the service cards using AuroraText.

2.10 WHEN the Servicios section renders THEN the system SHALL display a visible border or rounded frame around each card image container so the image area looks properly framed and intentional, with the existing Lens hover/zoom effect remaining fully functional and the border style consistent with the site's color palette.

2.11 WHEN the Contacto section renders THEN the system SHALL display each of the four info boxes narrowed so its width fits snugly around its content (approximately as wide as the longest content item, the email address), all four boxes centered horizontally, with no text, icons, links, or functionality inside any box changed, and all other Contacto section content unchanged.

2.12 WHEN a sede slug page renders THEN the system SHALL display an absolutely-positioned background image using an appropriate image from the `public/` directory, with image treatment (opacity, overlay, mask gradient) matching the same style used in the Hero and Contacto sections, sitting behind all page content without obscuring readability, and with all existing page content, layout, and functionality completely unchanged.

2.13 WHEN the sede slug page carousel encounters a media item in the `fotos` array THEN the system SHALL detect whether each item is a video or image based on its file extension or media type, render video items as a native HTML5 `<video>` element with controls (or autoplay muted loop), render image items exactly as before, and maintain identical carousel navigation (arrows, dots) for both media types with no changes to carousel layout, sizing, or any other carousel behavior beyond media type detection and video rendering.

---

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the Navbar renders THEN the system SHALL CONTINUE TO display the "Winnie Pooh" text, logo image, navbar height, link styles, WhatsApp button, and all other navbar elements exactly as before.

3.2 WHEN the Nosotros Calendario card renders THEN the system SHALL CONTINUE TO display all existing content, colors, emoji icons, and layout of the Calendario card unchanged except for text alignment and line breaks.

3.3 WHEN the Nosotros Propósito card renders THEN the system SHALL CONTINUE TO display the expandable mission points list, card styling, font size, color, and alignment of all other Propósito card content unchanged.

3.4 WHEN the Nosotros and Sedes sections render THEN the system SHALL CONTINUE TO display all content, layout, and z-index of both sections completely unchanged by the addition of the transition element.

3.5 WHEN the Sedes section renders THEN the system SHALL CONTINUE TO use the same background image file and display all card content fully readable after the opacity/overlay adjustment.

3.6 WHEN the Sedes section renders THEN the system SHALL CONTINUE TO display all card content, text, images, buttons, and layout inside each sede card unchanged after adding the glowing border.

3.7 WHEN the Sedes section renders THEN the system SHALL CONTINUE TO display all font colors, sizes, and other card content styles unchanged after adding the colored background tint.

3.8 WHEN the Servicios section renders on screens narrower than `xl` breakpoint THEN the system SHALL CONTINUE TO hide the four corner character images as before (`hidden xl:block`).

3.9 WHEN the Servicios section renders THEN the system SHALL CONTINUE TO display all other service card content (description text, card layout, NeonGradientCard styling, Lens effect) unchanged after replacing ColoredTitle with AuroraText.

3.10 WHEN the Servicios section renders THEN the system SHALL CONTINUE TO display the Lens hover/zoom effect fully functional on each service card image after adding the border/frame.

3.11 WHEN the Contacto section renders THEN the system SHALL CONTINUE TO display all text, icons, links, functionality, and all other Contacto section content (title, description, locations column, hours) unchanged after narrowing the info boxes.

3.12 WHEN a sede slug page renders THEN the system SHALL CONTINUE TO display all existing page content, layout, Navbar, Footer, carousel, map, info card, and WhatsApp button completely unchanged after adding the background image.

3.13 WHEN the sede slug page carousel renders image items THEN the system SHALL CONTINUE TO render them exactly as before using `next/image` `<Image>` elements with the same styling and behavior.
