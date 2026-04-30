# Design Document — UI Redesign Round 3

## Overview

This document describes the technical design for five targeted UI changes to the Guardería Winnie Pooh Next.js website. The changes are independent of each other and touch four components plus one file-system operation:

1. **Servicios card redesign** — `components/Servicios.tsx`
2. **Footer typography and color refresh** — `components/Footer.tsx`
3. **Jardín Infantil image rename** — `public/sedes/jardininfantil/` + `sedesData["jardin"].fotos`
4. **Baby's vertical video player** — `app/sedes/[slug]/page.tsx`
5. **Contacto pastel tints** — `components/Contacto.tsx`

All changes are additive or cosmetic. No routes, APIs, or data-fetching logic are modified. The existing component tree, navigation, and Supabase integration remain untouched.

---

## Architecture

The project is a Next.js App Router application. All five changes operate at the component/data layer only:

```
app/
  sedes/[slug]/page.tsx   ← Feature 3 (sedesData) + Feature 4 (video player)
components/
  Servicios.tsx           ← Feature 1
  Footer.tsx              ← Feature 2
  Contacto.tsx            ← Feature 5
public/sedes/jardininfantil/  ← Feature 3 (file rename)
```

No new routes, no new API endpoints, no new dependencies. All UI primitives (`NeonGradientCard`, `Lens`, `AuroraText`) are already installed and imported in the relevant files.

---

## Components and Interfaces

### Feature 1 — Servicios Card Redesign

**Current state:** Each card uses `NeonGradientCard` with per-card `color1`/`color2` pastel values. The description text is `color: #475569`, `fontWeight: 600`. There is no highlighted phrase. The `Lens` component already wraps the image.

**Target state:**

- `neonColors` on each `NeonGradientCard` cycles through `Site_Palette` by `index % 6`, replacing the current per-card pastel pairs.
- Description text changes to `color: #1e293b`, `fontWeight: 700`.
- Each `servicios` entry gains a `highlight` field — a substring of `desc` that will be rendered in a `<span>` with `color: Site_Palette[i % 6]`.
- The `Lens` wrapper already exists; no structural change needed there.
- `AURORA_PALETTES` and `AuroraText` title rendering remain exactly as-is.
- Corner decorations remain exactly as-is.

**Data shape change to `servicios` array:**

```ts
// Before
{ img, titulo, desc, color1, color2 }

// After
{ img, titulo, desc, highlight, accentIndex? }
// accentIndex is implicit: i % 6 from the map index
```

The `color1`/`color2` fields are removed since the neon color is now derived from `Site_Palette[i % 6]`. The card background tint (`s.color2 + "99"`) is replaced with a neutral white/light background since the neon border provides the color identity.

**Highlighted phrase rendering:**

```tsx
// Description paragraph splits on the highlight substring:
const parts = s.desc.split(s.highlight);
<p style={{ fontWeight: 700, color: "#1e293b", ... }}>
  {parts[0]}
  <span style={{ color: Site_Palette[i % 6], fontWeight: 700 }}>{s.highlight}</span>
  {parts[1]}
</p>
```

This approach is safe because `highlight` is a known substring of `desc` (defined in the same data object).

**`NeonGradientCard` props:**

```tsx
<NeonGradientCard
  className="h-full w-full"
  borderSize={2}
  borderRadius={22}
  neonColors={{
    firstColor: Site_Palette[i % 6],
    secondColor: Site_Palette[(i + 1) % 6],
  }}
>
```

Using two adjacent palette colors as `firstColor`/`secondColor` gives a vivid gradient border that still cycles through the palette.

---

### Feature 2 — Footer Typography and Color Redesign

**Current state:**
- Brand description paragraph: `color: "#64748b"`
- Sede address text: `color: "#94a3b8"`
- Nav link default color: `color: "#64748b"` (hover changes to `link.color`)
- Section headings "Explorar" and "Ubicaciones": plain `color: "#1e293b"` `<h4>` elements
- Brand name "Winnie Pooh": plain `<span>` with `color: "#1e293b"`
- Copyright text: `color: "#94a3b8"`

**Target state:**

| Element | Before | After |
|---|---|---|
| Brand description `<p>` | `color: #64748b` | `color: #1e293b`, `fontWeight: 700` |
| Sede address `<div>` | `color: #94a3b8` | `color: #1e293b`, `fontWeight: 700` |
| Nav link default | `color: #64748b` | `color: link.color` (vivid accent) |
| Nav link hover | `link.color` | unchanged (already vivid) |
| "Explorar" `<h4>` | plain text | `<AuroraText colors={Site_Palette}>` |
| "Ubicaciones" `<h4>` | plain text | `<AuroraText colors={Site_Palette}>` |
| "Winnie Pooh" `<span>` | plain text | `<AuroraText colors={Site_Palette}>` |
| Copyright `<p>` | `color: #94a3b8` | unchanged (footer fine print, not body text) |

The `onMouseLeave` handler for nav links changes from resetting to `#64748b` to resetting to `link.color` (since the default is now vivid).

`AuroraText` import is already present in `Footer.tsx`.

---

### Feature 3 — Jardín Infantil Image Rename

**File mapping (alphabetical sort → sequential name):**

The 34 files sorted alphabetically map to `fotojardininfantil1.jpeg` through `fotojardininfantil34.jpeg`:

| # | Original filename | New filename |
|---|---|---|
| 1 | `WhatsApp Image 2026-04-30 at 10.26.40 (1).jpeg` | `fotojardininfantil1.jpeg` |
| 2 | `WhatsApp Image 2026-04-30 at 10.26.40.jpeg` | `fotojardininfantil2.jpeg` |
| 3 | `WhatsApp Image 2026-04-30 at 10.26.41 (1).jpeg` | `fotojardininfantil3.jpeg` |
| 4 | `WhatsApp Image 2026-04-30 at 10.26.41 (2).jpeg` | `fotojardininfantil4.jpeg` |
| 5 | `WhatsApp Image 2026-04-30 at 10.26.41.jpeg` | `fotojardininfantil5.jpeg` |
| 6 | `WhatsApp Image 2026-04-30 at 10.26.42 (1).jpeg` | `fotojardininfantil6.jpeg` |
| 7 | `WhatsApp Image 2026-04-30 at 10.26.42.jpeg` | `fotojardininfantil7.jpeg` |
| 8 | `WhatsApp Image 2026-04-30 at 10.26.43.jpeg` | `fotojardininfantil8.jpeg` |
| 9 | `WhatsApp Image 2026-04-30 at 10.26.44.jpeg` | `fotojardininfantil9.jpeg` |
| 10 | `WhatsApp Image 2026-04-30 at 10.26.45 (1).jpeg` | `fotojardininfantil10.jpeg` |
| 11 | `WhatsApp Image 2026-04-30 at 10.26.45.jpeg` | `fotojardininfantil11.jpeg` |
| 12 | `WhatsApp Image 2026-04-30 at 10.26.54 (1).jpeg` | `fotojardininfantil12.jpeg` |
| 13 | `WhatsApp Image 2026-04-30 at 10.26.54.jpeg` | `fotojardininfantil13.jpeg` |
| 14 | `WhatsApp Image 2026-04-30 at 10.26.55 (1).jpeg` | `fotojardininfantil14.jpeg` |
| 15 | `WhatsApp Image 2026-04-30 at 10.26.55.jpeg` | `fotojardininfantil15.jpeg` |
| 16 | `WhatsApp Image 2026-04-30 at 10.27.02 (1).jpeg` | `fotojardininfantil16.jpeg` |
| 17 | `WhatsApp Image 2026-04-30 at 10.27.02.jpeg` | `fotojardininfantil17.jpeg` |
| 18 | `WhatsApp Image 2026-04-30 at 10.27.03 (1).jpeg` | `fotojardininfantil18.jpeg` |
| 19 | `WhatsApp Image 2026-04-30 at 10.27.03.jpeg` | `fotojardininfantil19.jpeg` |
| 20 | `WhatsApp Image 2026-04-30 at 10.27.04 (1).jpeg` | `fotojardininfantil20.jpeg` |
| 21 | `WhatsApp Image 2026-04-30 at 10.27.04 (2).jpeg` | `fotojardininfantil21.jpeg` |
| 22 | `WhatsApp Image 2026-04-30 at 10.27.04.jpeg` | `fotojardininfantil22.jpeg` |
| 23 | `WhatsApp Image 2026-04-30 at 10.27.05.jpeg` | `fotojardininfantil23.jpeg` |
| 24 | `WhatsApp Image 2026-04-30 at 10.27.06 (1).jpeg` | `fotojardininfantil24.jpeg` |
| 25 | `WhatsApp Image 2026-04-30 at 10.27.06.jpeg` | `fotojardininfantil25.jpeg` |
| 26 | `WhatsApp Image 2026-04-30 at 10.27.07 (1).jpeg` | `fotojardininfantil26.jpeg` |
| 27 | `WhatsApp Image 2026-04-30 at 10.27.07.jpeg` | `fotojardininfantil27.jpeg` |
| 28 | `WhatsApp Image 2026-04-30 at 10.27.08 (1).jpeg` | `fotojardininfantil28.jpeg` |
| 29 | `WhatsApp Image 2026-04-30 at 10.27.08.jpeg` | `fotojardininfantil29.jpeg` |
| 30 | `WhatsApp Image 2026-04-30 at 10.27.09.jpeg` | `fotojardininfantil30.jpeg` |
| 31 | `WhatsApp Image 2026-04-30 at 10.27.10 (1).jpeg` | `fotojardininfantil31.jpeg` |
| 32 | `WhatsApp Image 2026-04-30 at 10.27.10.jpeg` | `fotojardininfantil32.jpeg` |
| 33 | `WhatsApp Image 2026-04-30 at 10.27.11.jpeg` | `fotojardininfantil33.jpeg` |
| 34 | `WhatsApp Image 2026-04-30 at 10.27.12.jpeg` | `fotojardininfantil34.jpeg` |

**Alphabetical sort note:** Shell `sort` and filesystem alphabetical ordering treat `(1)` < `(2)` < base name because `(` (ASCII 40) < `.` (ASCII 46). The table above reflects this ordering.

**`sedesData["jardin"].fotos` update:**

```ts
fotos: Array.from({ length: 34 }, (_, i) =>
  `/sedes/jardininfantil/fotojardininfantil${i + 1}.jpeg`
),
```

All other fields of `sedesData["jardin"]` remain byte-for-byte identical.

---

### Feature 4 — Baby's Vertical Video Player

**Current state:** The media section uses a shared `AnimatePresence`-based carousel with prev/next arrow buttons and dot indicators. The `isVideo` helper already exists and renders `<video autoPlay muted loop>` for `.mp4` files. `sedesData["babys"].fotos` currently holds three placeholder image paths.

**Target state:**

`sedesData["babys"].fotos` is updated to:
```ts
fotos: ["/sedes/babys/sede_babys.mp4"],
```

The media column renders differently based on slug:

```
slug === "babys"  →  <BabysVideoPlayer src="/sedes/babys/sede_babys.mp4" />
slug !== "babys"  →  existing carousel (unchanged)
```

**`BabysVideoPlayer` component** (defined inline in `page.tsx` or as a local component):

```tsx
"use client";
import { useRef, useState, useEffect } from "react";

function BabysVideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Toggle play/pause
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); } else { v.play(); }
    setPlaying(!playing);
  };

  // Sync time display
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current?.currentTime ?? 0);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current?.duration ?? 0);
  };

  // Progress bar seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = t;
    setCurrentTime(t);
  };

  // Volume control
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (videoRef.current) videoRef.current.volume = v;
    setVolume(v);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Video — natural portrait aspect ratio, no object-cover */}
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
        playsInline
        className="w-full rounded-[3rem] shadow-2xl border-[12px] border-white"
        style={{ maxHeight: "70vh" }}
        // No autoPlay, no muted, no loop
      />

      {/* Controls bar */}
      <div className="mt-4 w-full max-w-sm flex flex-col gap-3 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg">
        {/* Play/Pause + time */}
        <div className="flex items-center gap-3">
          <button onClick={togglePlay} className="bg-slate-100 hover:bg-slate-200 p-3 rounded-xl transition-all">
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <span className="text-sm font-bold text-slate-600 tabular-nums">
            {fmt(currentTime)} / {fmt(duration)}
          </span>
        </div>

        {/* Progress bar */}
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-pink-400"
        />

        {/* Volume */}
        <div className="flex items-center gap-2">
          <VolumeIcon />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleVolume}
            className="w-full accent-pink-400"
          />
        </div>
      </div>
    </div>
  );
}
```

Simple SVG icons (`PlayIcon`, `PauseIcon`, `VolumeIcon`) are defined as small inline components to avoid adding a new icon dependency.

**Carousel preservation:** The existing carousel JSX block is conditionally rendered:

```tsx
{slug === "babys" ? (
  <BabysVideoPlayer src={sede.fotos[0]} />
) : (
  /* existing carousel motion.div with AnimatePresence, arrows, dots */
)}
```

The `fotoActual`, `direccion`, `proximaFoto`, `fotoAnterior` state and handlers remain in the component — they are simply not rendered for the babys slug. This avoids any risk of breaking the jardin/after-class carousels.

---

### Feature 5 — Contacto Pastel Tints

**Current state:** Each `motion.a` Info_Box has `background: "rgba(255, 255, 255, 0.95)"`. The `contactos` array already has `bg` fields (`#4FF08422`, `#7AC0FF22`, etc.) used only for the icon container background.

**Target state:** The `background` style on each `motion.a` changes from the shared white to the box's pastel tint:

| Box | Color | Alpha | CSS value |
|---|---|---|---|
| WhatsApp | `#4FF084` | ~6% | `rgba(79, 240, 132, 0.06)` |
| Correo | `#7AC0FF` | ~6% | `rgba(122, 192, 255, 0.06)` |
| Instagram | `#FF7893` | ~6% | `rgba(255, 120, 147, 0.06)` |
| Google | `#FFFC01` | ~6% | `rgba(255, 252, 1, 0.06)` |

The `contactos` array already has a `bg` field (`#4FF08422` = 13% alpha hex). We add a new `pastelbg` field at 6% alpha, or simply compute it inline. The cleanest approach is to add a `tint` field to each `contactos` entry:

```ts
const contactos = [
  { ..., tint: "rgba(79,240,132,0.06)" },
  { ..., tint: "rgba(122,192,255,0.06)" },
  { ..., tint: "rgba(255,120,147,0.06)" },
  { ..., tint: "rgba(255,252,1,0.06)" },
];
```

Then in the `motion.a` style: `background: c.tint`.

All other style properties (`border`, `borderRadius`, `padding`, `boxShadow`, `maxWidth`, `alignItems`) remain unchanged. The `onMouseEnter`/`onMouseLeave` handlers remain unchanged. Text color `#1e293b` is already applied to the value `<div>` — the label `<div>` currently uses `#94a3b8`; per requirement 5.3 it must also be `#1e293b`.

---

## Data Models

### `servicios` array (Servicios.tsx)

```ts
interface Servicio {
  img: string;       // path to icon PNG
  titulo: string;    // card title (rendered via AuroraText)
  desc: string;      // full description text
  highlight: string; // substring of desc to render in accent color
  // color1, color2 removed — neon color derived from Site_Palette[i % 6]
}
```

### `sedesData` (app/sedes/[slug]/page.tsx)

```ts
// "babys" entry — fotos updated
fotos: ["/sedes/babys/sede_babys.mp4"]

// "jardin" entry — fotos updated to 34 sequential paths
fotos: [
  "/sedes/jardininfantil/fotojardininfantil1.jpeg",
  // ... through
  "/sedes/jardininfantil/fotojardininfantil34.jpeg",
]
```

### `contactos` array (Contacto.tsx)

```ts
interface Contacto {
  icon: React.ComponentType;
  label: string;
  valor: string;
  href: string;
  color: string;  // vivid accent (icon + border)
  bg: string;     // icon container background (existing)
  tint: string;   // NEW: pastel box background at ~6% alpha
}
```

### `navLinks` array (Footer.tsx)

No structural change — the `color` field already exists per link. The rendering logic changes to use `link.color` as the default text color instead of `#64748b`.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Neon color cycles through Site_Palette by index

*For any* card index `i` in the range [0, 11], the `neonColors.firstColor` assigned to the `NeonGradientCard` at position `i` SHALL equal `Site_Palette[i % 6]`.

**Validates: Requirements 1.2**

---

### Property 2: Description text is bold black with exactly one accent highlight

*For any* service card at index `i`, the description paragraph SHALL have `fontWeight: 700` and `color: #1e293b`, and SHALL contain exactly one child `<span>` whose color equals `Site_Palette[i % 6]`.

**Validates: Requirements 1.5, 1.6**

---

### Property 3: Nav link default colors are vivid Site_Palette members

*For any* navigation link rendered in the Footer, its default (non-hover) text color SHALL be a member of `Site_Palette` and SHALL NOT be `#64748b` or `#94a3b8`.

**Validates: Requirements 2.5**

---

### Property 4: Non-babys slugs preserve carousel behavior

*For any* slug value in `["jardin", "after-class"]`, the rendered Slug_Page SHALL include the prev/next arrow buttons, dot indicators, and `AnimatePresence` slide transitions, and SHALL NOT render the `BabysVideoPlayer` component.

**Validates: Requirements 4.7**

---

### Property 5: Each Info_Box has a distinct low-alpha pastel background

*For any* of the four Info_Boxes in Contacto, the box background color SHALL be derived from its assigned `Site_Palette` color at an alpha value between 4% and 8%, and no two boxes SHALL share the same background color.

**Validates: Requirements 5.1, 5.2**

---

**Property Reflection:**

- Property 1 (neon color cycling) and Property 2 (description styling) are independent — one tests the border color, the other tests text content. No redundancy.
- Property 2 combines requirements 1.5 and 1.6 because both concern the description paragraph and the accent color is the same value being tested. Combining avoids a redundant separate property for "description is bold black."
- Property 3 is the only nav-link color property; no redundancy.
- Property 4 is the only carousel-preservation property; no redundancy.
- Property 5 combines requirements 5.1 and 5.2 because both concern the box background color at low alpha. The "distinct" clause covers 5.2 implicitly.

---

## Error Handling

### Feature 1 — Servicios
- The `highlight` substring split assumes `s.desc.includes(s.highlight)`. Since both are defined in the same static data object, this is guaranteed at author time. No runtime guard needed, but a TypeScript type check ensures the field is always provided.
- If `Site_Palette` is accidentally shortened below 6 entries, `i % 6` would still be in-bounds as long as the array has at least one entry. The palette is a module-level constant and will not change at runtime.

### Feature 3 — Image Rename
- The rename is a one-time file-system operation performed via shell commands. If a file is missing, the rename script will error on that specific file without affecting others.
- The `sedesData["jardin"].fotos` array is updated in source code simultaneously with the rename, so they stay in sync.
- Next.js serves static files from `public/` directly; no cache invalidation is needed beyond a build restart.

### Feature 4 — Video Player
- If `videoRef.current` is null (component not yet mounted), all event handlers guard with early returns.
- `onEnded` resets `playing` to `false` so the play button returns to its initial state.
- `duration` defaults to `0` before `loadedmetadata` fires; the progress bar `max={duration || 0}` prevents a NaN range.
- The video has no `autoPlay` attribute, satisfying the paused-on-load requirement even if the browser ignores the React prop.

### Feature 5 — Contacto
- The `tint` values are hardcoded RGBA strings, not computed at runtime, so there is no risk of alpha calculation errors.
- The existing `onMouseEnter`/`onMouseLeave` handlers override `background` on hover; the pastel tint is only the default (non-hover) state.

---

## Testing Strategy

This feature set is primarily UI/styling work. The appropriate testing approach is:

**Unit / example-based tests** (using Jest + React Testing Library):
- Render `Servicios` and assert 12 cards are present, each wrapped in `NeonGradientCard`.
- Render `Servicios` and assert each card's description has `fontWeight: 700` and `color: #1e293b`.
- Render `Footer` and assert "Winnie Pooh", "Explorar", "Ubicaciones" are wrapped in `AuroraText`.
- Render `Footer` and assert all original nav links and text content are present.
- Render `Contacto` and assert each Info_Box has the correct `tint` background.
- Render the babys slug page and assert the video element has no `autoPlay` attribute.
- Render the jardin slug page and assert carousel arrows and dots are present.
- Assert `sedesData["babys"].fotos` equals `["/sedes/babys/sede_babys.mp4"]`.
- Assert `sedesData["jardin"].fotos` has 34 entries with the correct sequential paths.

**Property-based tests** (using fast-check, minimum 100 iterations each):

Each property test is tagged with: `Feature: ui-redesign-round-3, Property {N}: {property_text}`

- **Property 1** — Generate `i` in [0, 11]; assert `Site_Palette[i % 6]` equals the `firstColor` returned by the color-selection function.
- **Property 2** — Generate `i` in [0, 11]; render card `i` and assert description has bold black style and exactly one accent span with `Site_Palette[i % 6]`.
- **Property 3** — For each nav link in the rendered Footer, assert its default color is in `Site_Palette`.
- **Property 4** — For each slug in `["jardin", "after-class"]`, render the page and assert carousel controls are present and `BabysVideoPlayer` is absent.
- **Property 5** — For each of the 4 Info_Boxes, parse the background RGBA and assert alpha is between 0.04 and 0.08, and all four alpha-stripped colors are distinct.

**Snapshot tests:**
- Footer layout snapshot to catch unintended structural regressions.
- Contacto layout snapshot to verify box structure is preserved.

**Visual review (manual):**
- Confirm Lens zoom effect works on hover over service card images.
- Confirm AuroraText animation renders on "Winnie Pooh", "Explorar", "Ubicaciones" in Footer.
- Confirm video player controls are usable on mobile (touch targets ≥ 44px).
- Confirm portrait video is not cropped on narrow viewports.
