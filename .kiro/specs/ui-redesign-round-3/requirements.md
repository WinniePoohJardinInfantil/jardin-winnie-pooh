# Requirements Document

## Introduction

This document specifies the requirements for UI Redesign Round 3 of the Guardería Winnie Pooh Next.js website. The redesign covers five targeted areas: a full visual overhaul of the Servicios section cards, a typography and color refresh of the Footer, sequential renaming of Jardín Infantil slug images, a vertical video player for the Baby's sede slug, and pastel background tints on the Contacto info boxes. All changes must preserve existing functionality, layout structure, and navigation.

## Glossary

- **Servicios_Section**: The `components/Servicios.tsx` React component that renders the 12 service cards on the main page.
- **NeonGradientCard**: The MagicUI wrapper component at `components/ui/neon-gradient-card.tsx` that renders an animated neon border around its children.
- **Lens**: The MagicUI component at `components/ui/lens.tsx` that applies a zoom-on-hover magnification effect to its children.
- **AuroraText**: The MagicUI component at `components/ui/aurora-text.tsx` that renders animated gradient text.
- **Site_Palette**: The six accent colors cycling in order: pink `#FF7893`, blue `#7AC0FF`, purple `#7E3AF2`, yellow `#FFFC01`, green `#4FF084`, orange `#EB8100`.
- **Footer_Component**: The `components/Footer.tsx` React component rendered at the bottom of every page.
- **Slug_Page**: The `app/sedes/[slug]/page.tsx` dynamic route component that renders individual sede detail pages.
- **SedesData**: The `sedesData` record object defined inside `app/sedes/[slug]/page.tsx` that holds per-sede configuration including the `fotos` array.
- **JardinInfantil_Folder**: The directory `public/sedes/jardininfantil/` containing 34 WhatsApp-imported JPEG images.
- **Babys_Folder**: The directory `public/sedes/babys/` containing the single vertical video file `sede_babys.mp4`.
- **Contacto_Component**: The `components/Contacto.tsx` React component that renders the contact section with four info boxes.
- **Info_Box**: Each of the four `motion.a` anchor elements in Contacto representing WhatsApp, Correo, Instagram, and Google Reseñas.
- **Carousel**: The AnimatePresence-based image slider with prev/next arrows and dot indicators used in the Slug_Page media section.

---

## Requirements

### Requirement 1: SERVICIOS – Full Card Redesign

**User Story:** As a site visitor, I want the service cards to have a vibrant, visually distinct design with neon borders, zoom-on-hover images, and bold readable text, so that each service feels engaging and easy to scan.

#### Acceptance Criteria

1. THE `Servicios_Section` SHALL wrap each service card with `NeonGradientCard` as the outermost card container.
2. WHEN rendering the 12 service cards, THE `Servicios_Section` SHALL assign `neonColors` to each `NeonGradientCard` by cycling through the `Site_Palette` in order (card index modulo 6), so that the neon border color alternates across cards.
3. THE `Servicios_Section` SHALL display the service image prominently inside a `Lens` component so that hovering over the image triggers the zoom effect.
4. THE `Servicios_Section` SHALL render each card title using `AuroraText` with a rotated palette per card index (already implemented pattern must be preserved).
5. THE `Servicios_Section` SHALL render all description text with `font-weight: 700` and `color: #1e293b` (bold black).
6. THE `Servicios_Section` SHALL highlight exactly one key word or phrase per description in an accent color that matches the card's neon border color from the `Site_Palette`.
7. THE `Servicios_Section` SHALL maintain a visually balanced image layout within each card (image area proportional and not distorted).
8. THE `Servicios_Section` SHALL keep the four corner character PNG decorations (winnie-globo, elefante-globo, tigger-globo, piggy-globo) in their existing absolute positions.
9. THE `Servicios_Section` SHALL continue to display all 12 service entries without omission.
10. THE `Servicios_Section` SHALL leave the section header (title and subtitle text) unchanged.

---

### Requirement 2: FOOTER – Typography and Color Redesign

**User Story:** As a site visitor, I want the footer text to be bold and vivid so that it is easy to read and visually consistent with the rest of the site's colorful identity.

#### Acceptance Criteria

1. THE `Footer_Component` SHALL render all body text that was previously grey (`color: #64748b` or `#94a3b8`) as bold black (`font-weight: 700`, `color: #1e293b`).
2. THE `Footer_Component` SHALL render the word "Winnie Pooh" in the brand name area using `AuroraText` with the `Site_Palette` colors.
3. THE `Footer_Component` SHALL render the section heading "Explorar" using `AuroraText` with the `Site_Palette` colors.
4. THE `Footer_Component` SHALL render the section heading "Ubicaciones" using `AuroraText` with the `Site_Palette` colors.
5. THE `Footer_Component` SHALL render each navigation link text in a vivid accent color from the `Site_Palette` (not grey, not black) as its default (non-hover) color.
6. THE `Footer_Component` SHALL preserve all existing text content, links, icons, and navigation functionality without removal or breakage.
7. THE `Footer_Component` SHALL preserve the existing footer layout, spacing, and structural grid unchanged.

---

### Requirement 3: SLUG JARDÍN INFANTIL – Rename Images

**User Story:** As a developer, I want the Jardín Infantil images to have clean sequential filenames, so that the codebase is maintainable and the `fotos` array is easy to read and update.

#### Acceptance Criteria

1. THE `JardinInfantil_Folder` SHALL contain each image file renamed sequentially to `fotojardininfantil1.jpeg`, `fotojardininfantil2.jpeg`, … `fotojardininfantil34.jpeg`, preserving the `.jpeg` extension, in the same alphabetical order as the original WhatsApp filenames.
2. THE `SedesData` entry for key `"jardin"` SHALL have its `fotos` array updated to reference the new sequential filenames (e.g. `"/sedes/jardininfantil/fotojardininfantil1.jpeg"`) in the same order as the renamed files.
3. THE `SedesData` entry for key `"jardin"` SHALL have no other field changed (nombre, subtitulo, color, descripcion, resaltado, direccion, mapaUrl, edades, servicios remain identical).
4. IF a file in `JardinInfantil_Folder` does not have a `.jpeg` extension, THEN THE renaming process SHALL preserve the original extension of that file.
5. THE renaming SHALL NOT affect any other folder, file, or `SedesData` entry outside of `JardinInfantil_Folder` and the `"jardin"` entry.

---

### Requirement 4: SLUG BABYS – Vertical Video Redesign

**User Story:** As a site visitor browsing the Baby's sede page, I want to watch the vertical promotional video in its natural format with proper playback controls, so that I can view it without distortion and control playback myself.

#### Acceptance Criteria

1. THE `Slug_Page` for slug `"babys"` SHALL display the single video file `sede_babys.mp4` from `Babys_Folder` in its natural vertical (portrait) aspect ratio without cropping or distortion.
2. THE `Slug_Page` for slug `"babys"` SHALL render a video player that includes a play/pause button, a progress bar showing elapsed and total time, and a volume control.
3. WHEN the `Slug_Page` for slug `"babys"` first loads, THE video player SHALL start in a paused state and SHALL NOT autoplay.
4. THE `SedesData` entry for key `"babys"` SHALL have its `fotos` array updated to contain only the single value `"/sedes/babys/sede_babys.mp4"`.
5. THE `Slug_Page` for slug `"babys"` SHALL accommodate the vertical video layout without breaking the surrounding info card, map, Navbar, Footer, or WhatsApp button.
6. WHILE the slug is `"babys"`, THE `Slug_Page` MAY remove or hide the `Carousel` arrows, dot indicators, and `AnimatePresence` slide transitions since there is only one media item.
7. WHILE the slug is NOT `"babys"` (i.e. `"jardin"` or `"after-class"`), THE `Slug_Page` SHALL preserve the existing `Carousel` behavior (arrows, dots, `AnimatePresence`) completely unchanged.

---

### Requirement 5: CONTACTO – Pastel Background Tints on Info Boxes

**User Story:** As a site visitor, I want each contact info box to have a subtle pastel background tint, so that the four options are visually distinct and easy to differentiate at a glance.

#### Acceptance Criteria

1. THE `Contacto_Component` SHALL apply a distinct soft pastel background color to each `Info_Box`, using colors from the `Site_Palette` at very low opacity (4–8% alpha channel).
2. THE `Contacto_Component` SHALL assign pastel tints per box in this order: WhatsApp box uses green (`#4FF084` at ~6% opacity), Correo box uses blue (`#7AC0FF` at ~6% opacity), Instagram box uses pink (`#FF7893` at ~6% opacity), Google Reseñas box uses yellow (`#FFFC01` at ~6% opacity).
3. THE `Contacto_Component` SHALL render all text inside each `Info_Box` in black (`color: #1e293b`) and fully readable against the pastel background.
4. THE `Contacto_Component` SHALL preserve the `maxWidth: 480px` and horizontal centering (`alignItems: center`) on the info boxes column from the previous fix.
5. THE `Contacto_Component` SHALL preserve all existing text content, icons, links, and functionality inside every `Info_Box` without change.
6. THE `Contacto_Component` SHALL preserve all other layout properties (padding, border-radius, border, box-shadow, hover effects) of each `Info_Box` unchanged.
