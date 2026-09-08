# EbookCraft Abstraction Audit

**Date:** 2026-09-08
**Auditor:** OpenCode (MAT Codex)
**Source:** `C:\Users\jpowe\Downloads\ebookcraft\`

## Executive Summary

EbookCraft is a **minimal Google AI Studio/Vite/React starter scaffold** — not a functioning ebook application. The archive contains ~4.5 KB of meaningful code. Most core files (`App.tsx`, `index.css`, `index.html`, `package.json`, `bun.lock`) are **completely empty**. Only the React bootstrap (`main.tsx`), Vite config, TypeScript config, and AI Studio README contain real content.

**Verdict:** Do NOT merge into MAT. Extract architectural concepts only.

## File-by-File Analysis

| EbookCraft File | Contents | Useful to MAT? | Adopt / Adapt / Reject | MAT Destination | Reason |
|---|---|---|---|---|---|
| `src/main.tsx` | React 18 StrictMode bootstrap (10 lines) | Partially | Adapt | `studio/src/main.tsx` | Standard React entry — useful for Studio only, not reader |
| `src/App.tsx` | **EMPTY** (0 bytes) | No | Reject | — | No implementation |
| `src/index.css` | **EMPTY** (0 bytes) | No | Reject | — | No implementation |
| `index.html` | **EMPTY** (0 bytes) | No | Reject | — | No implementation |
| `package.json` | **EMPTY** (0 bytes) | No | Reject | — | Must create from scratch |
| `bun.lock` | **EMPTY** (0 bytes) | No | Reject | — | No dependency data |
| `vite.config.ts` | Vite + React + Tailwind + path alias (22 lines) | Yes | Adopt | `studio/vite.config.ts` | Clean Vite config with Tailwind integration |
| `tsconfig.json` | Standard TypeScript config | Partially | Adapt | `studio/tsconfig.json` | May need path adjustments |
| `.env.example` | GEMINI_API_KEY placeholder | Partially | Adapt | `studio/.env.example` | Keep as optional, rename key |
| `metadata.json` | EbookCraft metadata (name, description, capabilities) | No | Reject | — | MAT-specific metadata replaces this |
| `README.md` | AI Studio boilerplate README | No | Reject | — | MAT documentation replaces this |
| `.gitignore` | Standard Node gitignore | Partially | Adapt | `studio/.gitignore` | Useful template |
| `public/` | Static assets directory | No | Reject | — | MAT has its own asset structure |

## Architectural Concepts Extracted

### 1. React/Vite/TypeScript Stack
**Value:** Component-based authoring UI with fast HMR and type safety.
**Application:** MAT Studio only — NOT the public reader (`book/`).
**Decision:** Adopt for `studio/` directory.

### 2. Tailwind CSS Integration
**Value:** Rapid UI prototyping for authoring tools.
**Application:** Studio styling (inspector panels, toolbars, modals).
**Decision:** Adopt for `studio/` only.

### 3. Path Aliases (`@/`)
**Value:** Clean imports in complex component trees.
**Application:** Studio source organization.
**Decision:** Adopt.

### 4. AI Studio Environment
**Value:** Concept of optional AI assistance.
**Application:** MAT Studio's optional AI provider system.
**Decision:** Adapt — create provider abstraction, never core dependency.

### 5. HMR Control (`DISABLE_HMR`)
**Value:** Stability during agent-assisted editing.
**Application:** Useful for MAT development workflow.
**Decision:** Adopt.

## What MAT Already Has (Do NOT Duplicate)

| Feature | MAT Implementation | EbookCraft Status |
|---|---|---|
| Reader/PWA | `book/` — complete static PWA | Empty |
| Periodic table | 118-element interactive grid | None |
| Search | Full-text with filters | None |
| Bookmarks/notes | IndexedDB-based | None |
| TTS | Web Speech API | None |
| Translation | MyMemory API | None |
| Charts | Chart.js wrappers | None |
| 3D models | Three.js viewer | None |
| Offline | Service worker v3 | None |
| Validation | 7-suite toolchain | None |
| Publication metadata | `data/publication/metadata.json` | None |

## MAT Architecture After Integration

```
MAT CANONICAL KNOWLEDGE
records/ data/ registries/
            │
            ├── book/           (UNCHANGED — public reader PWA)
            │   ├── index.html
            │   ├── book.js
            │   ├── styles/
            │   ├── modules/
            │   └── build/
            │
            ├── studio/         (NEW — authoring environment)
            │   ├── package.json
            │   ├── vite.config.ts
            │   ├── src/
            │   │   ├── main.tsx
            │   │   ├── App.tsx
            │   │   ├── components/
            │   │   ├── features/
            │   │   ├── adapters/
            │   │   └── styles/
            │   └── ...
            │
            ├── dist/           (OUTPUT — exports)
            │   ├── MAT-ebook.html
            │   ├── MAT-Codex.epub
            │   └── MAT-Codex.pdf
            │
            └── scripts/        (BUILD — generators, validators)
```

## Rejected Items

1. **Empty `App.tsx`** — No code to extract.
2. **Empty `index.css`** — No styling to extract.
3. **Empty `package.json`** — Must create from scratch.
4. **AI Studio README** — Not applicable to MAT.
5. **`metadata.json`** — MAT has its own metadata system.
6. **Gemini-only AI** — MAT needs provider-agnostic abstraction.

## Recommendations

1. Create `studio/` as a separate package with its own `package.json`.
2. Keep `book/` completely independent (no React dependency).
3. Use Vite + React + TypeScript + Tailwind for Studio only.
4. Create AI provider abstraction (Gemini, local, future providers).
5. Generated publication model (`data/publication/generated/`) bridges canonical data to Studio and exports.
6. EPUB pipeline uses canonical data directly, not through React.

## Sign-off

This audit confirms that EbookCraft's value is **architectural inspiration only**. The actual MAT implementation must be built from scratch using MAT's canonical data architecture, with React/Vite/TypeScript adopted solely for the Studio authoring environment.
