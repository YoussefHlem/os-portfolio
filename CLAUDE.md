# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the built app
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + typescript, with `react/no-unescaped-entities` disabled)

There is no test runner configured in this repo.

## Stack notes

- **Next.js 16** with the App Router (`src/app`) and `reactCompiler: true` enabled in `next.config.ts` (uses `babel-plugin-react-compiler`). Do not hand-write memoization that the compiler is expected to handle. See `AGENTS.md` — this is not the Next.js you know; consult `node_modules/next/dist/docs/` before using APIs you're uncertain about.
- **React 19**, **Tailwind CSS v4** (via `@tailwindcss/postcss`), TypeScript strict mode.
- **Path alias:** `@/*` → `src/*`.
- **Animation:** GSAP with `@gsap/react` (`useGSAP`) and `gsap/all` `Draggable`. Plugins are registered at the top of `src/app/page.tsx`; any new file that uses them must re-register or rely on that module being loaded.
- **State:** Zustand with `immer` middleware.
- **Icons/UI:** `lucide-react`, `react-tooltip`.

## Architecture

The app is a macOS-style desktop shell. Three pieces make the "windowing system" work together and need to be understood as a unit:

### 1. Window registry — `src/constants/index.ts`

`WINDOW_CONFIG` is the single source of truth for which windows exist (`finder`, `contact`, `resume`, `safari`, `photos`, `terminal`, `txtfile`, `imgfile`). Each entry has `{ isOpen, zIndex, data }`. `INITIAL_Z_INDEX = 1000`. Adding a new window type means adding a key here first — everything downstream is keyed off this object.

### 2. Zustand store — `src/store/window.ts`

`useWindowStore` owns the `windows` record and a monotonically increasing `nextZIndex`. Three actions:
- `openWindow(key, data?)` — sets `isOpen`, assigns current `nextZIndex`, stores `data`.
- `closeWindow(key)` — resets `isOpen`, `zIndex`, `data`.
- `focusWindow(key)` — bumps `zIndex` to `nextZIndex++` (post-increment inside an immer `set`, so the store value is also incremented).

Window keys are plain strings typed against `keyof typeof WINDOW_CONFIG` at the call sites.

### 3. `WindowWrapper` HOC — `src/hoc/WindowWrapper.tsx`

Every window component is wrapped with `WindowWrapper(Component, windowKey)` (see `src/windows/Terminal.tsx` for the canonical pattern). The HOC:
- Reads `isOpen`/`zIndex` for the given key from the store.
- Renders an absolutely-positioned `<section id={windowKey}>` with inline `zIndex` and a `mousedown`/Draggable-press handler that calls `focusWindow`.
- Runs a GSAP intro animation (`scale 0.8 → 1`, `opacity 0 → 1`, `y 40 → 0`) whenever `isOpen` flips true.
- Creates a GSAP `Draggable` instance on mount and kills it on unmount.
- Toggles `el.style.display` in a `useLayoutEffect` and returns `null` when closed.

Consequence: window components should render their own chrome (header + `WindowControls`) but should **not** manage their own `position: absolute`, z-index, drag handling, or open/close state — the wrapper owns all of that.

`WindowControls` (`src/components/WindowControls.tsx`) receives a `target` prop (the window key) and calls `closeWindow(target)`. Minimize/maximize are currently visual only.

### 4. Dock — `src/components/Dock.tsx`

`dockApps` in `constants/index.ts` drives the dock. Each entry has an `id` that **must match a `WINDOW_CONFIG` key** for `canOpen: true` apps — `toggleApp` guards with `app.id in windows` and then calls `openWindow` / `closeWindow`. The magnifier-style hover animation is implemented directly in a `useGSAP` effect using `getBoundingClientRect` math; there is no external dock library.

### Entry point

`src/app/page.tsx` is marked `"use client"`, registers GSAP plugins, and renders `<Navbar />`, `<Welcome />`, `<Dock />`, and the window components (e.g. `<TerminalWindow />`). To add a new window: create `src/windows/Foo.tsx`, wrap it with `WindowWrapper(Foo, "foo")`, add `foo` to `WINDOW_CONFIG`, add a matching `dockApps` entry, and mount `<FooWindow />` in `page.tsx`.

## Content data

`src/constants/index.ts` also holds static content: `navLinks`, `navIcons`, `blogPosts`, `techStack`, `socials`, `photosLinks`, `gallery`, and a nested `locations` tree (`work`, `about`, `resume`, `trash`) describing Finder-style folders/files with Tailwind position classes baked into the data. Treat this file as content config — most copy/data changes land here rather than in components.