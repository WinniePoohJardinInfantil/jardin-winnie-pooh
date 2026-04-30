# Implementation Plan: UI Redesign Round 3

## Overview

Five independent UI changes across four components and one file-system operation. Each task targets a single file or concern and can be executed and verified in isolation. The implementation language is TypeScript/TSX (Next.js App Router project).

## Tasks

- [x] 1. Redesign Servicios cards — `components/Servicios.tsx`
  - Remove `color1` and `color2` fields from every entry in the `servicios` array
  - Add a `highlight` field to each entry — a key word or phrase that is a substring of `desc`
  - Add `const Site_Palette = ["#FF7893","#7AC0FF","#7E3AF2","#FFFC01","#4FF084","#EB8100"]` at module level (or import if already defined)
  - Update each `NeonGradientCard` to use `neonColors={{ firstColor: Site_Palette[i % 6], secondColor: Site_Palette[(i + 1) % 6] }}` and `borderSize={2}`
  - Replace the card inner `background` from `s.color2 + "99"` to a neutral `"rgba(255,255,255,0.85)"`
  - Update the description `<p>` to `fontWeight: 700`, `color: "#1e293b"`, and split on `s.highlight` to render the matched substring in a `<span style={{ color: Site_Palette[i % 6], fontWeight: 700 }}>`
  - Leave `AURORA_PALETTES`, `AuroraText` title rendering, `Lens` wrapper, corner decorations, and section header completely unchanged
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10_

  - [ ]* 1.1 Write property test — Property 1: Neon color cycles through Site_Palette by index
    - Generate `i` in [0, 11] with fast-check; assert the color-selection expression `Site_Palette[i % 6]` equals the expected palette entry
    - **Property 1: Neon color cycles through Site_Palette by index**
    - **Validates: Requirements 1.2**

  - [ ]* 1.2 Write property test — Property 2: Description text is bold black with exactly one accent highlight
    - Generate `i` in [0, 11] with fast-check; render card `i` and assert `fontWeight: 700`, `color: #1e293b`, and exactly one child `<span>` whose color equals `Site_Palette[i % 6]`
    - **Property 2: Description text is bold black with exactly one accent highlight**
    - **Validates: Requirements 1.5, 1.6**

- [x] 2. Checkpoint — Servicios
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Refresh Footer typography and colors — `components/Footer.tsx`
  - Import `AuroraText` (already imported — verify it is present; add if missing)
  - Wrap the `"Winnie Pooh"` `<span>` text with `<AuroraText colors={["#FF7893","#7AC0FF","#7E3AF2","#FFFC01","#4FF084","#EB8100"]}>`
  - Wrap the `"Explorar"` `<h4>` text content with `<AuroraText colors={Site_Palette}>`
  - Wrap the `"Ubicaciones"` `<h4>` text content with `<AuroraText colors={Site_Palette}>`
  - Change the brand description `<p>` from `color: "#64748b"` to `color: "#1e293b"`, `fontWeight: 700`
  - Change each sede address `<div>` from `color: "#94a3b8"` to `color: "#1e293b"`, `fontWeight: 700`
  - Change each nav link `<a>` default color from `"#64748b"` to `link.color`; update the `onMouseLeave` handler to reset to `link.color` instead of `"#64748b"`
  - Leave copyright text, layout, spacing, icons, Dock, Marquee, and all other elements unchanged
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ]* 3.1 Write property test — Property 3: Nav link default colors are vivid Site_Palette members
    - For each nav link rendered in Footer, assert its default color is a member of `Site_Palette` and is not `"#64748b"` or `"#94a3b8"`
    - **Property 3: Nav link default colors are vivid Site_Palette members**
    - **Validates: Requirements 2.5**

  - [ ]* 3.2 Write unit tests for Footer AuroraText wrapping
    - Render `Footer` and assert "Winnie Pooh", "Explorar", "Ubicaciones" are each wrapped in an `AuroraText` component
    - Assert all original nav links, sede names, and text content are still present
    - _Requirements: 2.2, 2.3, 2.4, 2.6_

- [x] 4. Checkpoint — Footer
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Rename Jardín Infantil images and update fotos array — `public/sedes/jardininfantil/` + `app/sedes/[slug]/page.tsx`
  - Run a shell rename script that iterates the 34 files in alphabetical order and renames each to `fotojardininfantil{n}.jpeg` (n = 1..34) using the exact mapping from the design document
  - In `sedesData["jardin"].fotos`, replace the existing array with `Array.from({ length: 34 }, (_, i) => \`/sedes/jardininfantil/fotojardininfantil${i + 1}.jpeg\`)`
  - Leave all other fields of `sedesData["jardin"]` (nombre, subtitulo, color, descripcion, resaltado, direccion, mapaUrl, edades, servicios) byte-for-byte identical
  - Do not touch any other folder, file, or `sedesData` entry
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 5.1 Write unit tests for jardin fotos array
    - Assert `sedesData["jardin"].fotos` has exactly 34 entries
    - Assert entry at index 0 equals `"/sedes/jardininfantil/fotojardininfantil1.jpeg"` and entry at index 33 equals `"/sedes/jardininfantil/fotojardininfantil34.jpeg"`
    - Assert no other `sedesData` entry was modified
    - _Requirements: 3.2, 3.3, 3.5_

- [x] 6. Add BabysVideoPlayer and update babys fotos — `app/sedes/[slug]/page.tsx`
  - Update `sedesData["babys"].fotos` to `["/sedes/babys/sede_babys.mp4"]`
  - Define a `BabysVideoPlayer` component (inline in `page.tsx`) with:
    - `useRef<HTMLVideoElement>`, `useState` for `playing`, `currentTime`, `duration`, `volume`
    - `<video>` rendered at natural portrait aspect ratio (`maxHeight: "70vh"`, no `autoPlay`, no `muted`, no `loop`, `playsInline`)
    - `rounded-[3rem] shadow-2xl border-[12px] border-white` styling on the `<video>` element
    - Controls bar below the video: play/pause button, elapsed/total time display, progress `<input type="range">`, volume `<input type="range">` — all using `accent-pink-400`
    - Inline SVG `PlayIcon`, `PauseIcon`, `VolumeIcon` helper components (no new icon dependency)
    - All event handlers guard against `videoRef.current === null`
    - `onEnded` resets `playing` to `false`; `duration` defaults to `0` before `loadedmetadata`
  - In the media column JSX, conditionally render:
    - `slug === "babys"` → `<BabysVideoPlayer src={sede.fotos[0]} />`
    - `slug !== "babys"` → existing carousel `motion.div` with `AnimatePresence`, arrows, and dots (unchanged)
  - Keep `fotoActual`, `direccion`, `proximaFoto`, `fotoAnterior` state and handlers in the component (they are still used by non-babys slugs)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ]* 6.1 Write unit tests for BabysVideoPlayer
    - Render the babys slug page and assert the `<video>` element does not have an `autoPlay` attribute
    - Assert `sedesData["babys"].fotos` equals `["/sedes/babys/sede_babys.mp4"]`
    - Assert the play/pause button, progress range input, and volume range input are present in the DOM
    - _Requirements: 4.2, 4.3, 4.4_

  - [ ]* 6.2 Write property test — Property 4: Non-babys slugs preserve carousel behavior
    - For each slug in `["jardin", "after-class"]`, render the Slug_Page and assert prev/next arrow buttons and dot indicators are present, and `BabysVideoPlayer` is absent
    - **Property 4: Non-babys slugs preserve carousel behavior**
    - **Validates: Requirements 4.7**

- [x] 7. Checkpoint — Slug page
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Apply pastel tints to Contacto info boxes — `components/Contacto.tsx`
  - Add a `tint` field to each entry in the `contactos` array:
    - WhatsApp: `"rgba(79,240,132,0.06)"`
    - Correo: `"rgba(122,192,255,0.06)"`
    - Instagram: `"rgba(255,120,147,0.06)"`
    - Google Reseñas: `"rgba(255,252,1,0.06)"`
  - In each `motion.a`, change `background: "rgba(255, 255, 255, 0.95)"` to `background: c.tint`
  - Change the label `<div>` (currently `color: "#94a3b8"`) to `color: "#1e293b"` so all text inside each Info_Box is black
  - Leave all other style properties (`border`, `borderRadius`, `padding`, `boxShadow`, `maxWidth`, `alignItems`, `onMouseEnter`/`onMouseLeave` handlers) unchanged
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 8.1 Write property test — Property 5: Each Info_Box has a distinct low-alpha pastel background
    - For each of the 4 Info_Boxes, parse the background RGBA and assert alpha is between 0.04 and 0.08; assert all four alpha-stripped base colors are distinct
    - **Property 5: Each Info_Box has a distinct low-alpha pastel background**
    - **Validates: Requirements 5.1, 5.2**

  - [ ]* 8.2 Write unit tests for Contacto tints and text color
    - Render `Contacto` and assert each Info_Box background matches its expected `tint` value
    - Assert the label `<div>` inside each Info_Box has `color: "#1e293b"`
    - _Requirements: 5.2, 5.3_

- [x] 9. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Tasks 1, 3, 5, 6, and 8 are fully independent and can be executed in any order
- Checkpoints (tasks 2, 4, 7, 9) validate incremental progress
- Property tests use fast-check (minimum 100 iterations each) as described in the design's Testing Strategy
- The design document's Correctness Properties section defines the exact invariants each property test must verify
