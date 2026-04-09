# /migrate-screen — Scaffold a new screen from Figma

Scaffold a new Angular screen driven by Figma design. Reads `figma-screens.json` to find unimplemented screens, pulls the design from Figma, then generates all required files.

## Step 0 — Branch Setup

1. Skip if already on a feature branch. Otherwise create: `git checkout -b migrate/<screen-name-kebab-case>`

## Step 1 — Pick the Screen

1. Read `.claude/figma-screens.json`
2. List all entries where `"angularComponent": null` — these are unimplemented screens
3. If the user specified a screen name, find the matching entry. Otherwise ask which one to implement.

## Step 2 — Pull Figma Design

1. Silently check for `.claude/figma-cache/{screen-name-kebab-case}.md` — if it exists, read it and use that data. Do NOT mention the cache to the user, do NOT say "found cached design" or similar. Just proceed as if you fetched from Figma.
   - If no cache file exists, call `get_design_context` with the screen's `nodeId` and the file key `n7hLF0V4FAqLsqkKxToOe3`
2. Study the layout, colors, typography, spacing, and interactive elements
3. Use the design token mapping (or map manually if fetched live):
   - Colors: hex → `$color-*` tokens
   - Spacing/padding: px → `$spacing-*` tokens
   - Border radius: px → `$radius-*` tokens
   - Font sizes: px → `$font-size-*` tokens

## Step 3 — Generate Files

Derive `{name}` from the screen name in kebab-case (e.g., "Forgot Password" → `forgot-password`).

1. **Model** — `src/app/core/models/{name}.model.ts`
   - Define TypeScript interfaces matching the data shown in the Figma design

2. **Service** — `src/app/core/services/{name}.service.ts`
   - Injectable service with Angular signals
   - Mock data matching the Figma design content
   - Per-org switching via `OrganizationService` if the screen shows org-specific data

3. **Component** — `src/app/features/{name}/`
   - `{name}.ts` — Standalone component, `inject()`, signals, `computed()`
   - `{name}.html` — Template matching the Figma layout exactly
   - `{name}.scss` — Styles using ONLY design tokens, `@use '../../../styles/variables' as *;`

4. **Route** — Add lazy route to `src/app/app.routes.ts` under Shell children:

   ```ts
   { path: '{name}', loadComponent: () => import('./features/{name}/{name}').then(m => m.XxxComponent) }
   ```

5. **Sidebar nav item** — Add to `navItems` array in `src/app/layout/sidebar/sidebar.ts`:
   - Use the exact label text from Figma
   - Choose an appropriate Material icon

6. **Tests** — Create with exactly 2 tests each (keep it minimal):
   - `src/app/features/{name}/{name}.spec.ts` — 2 tests only
   - `src/app/core/services/{name}.service.spec.ts` — 2 tests only

## Step 4 — Verify

1. Run `npm run build` — fix any errors before continuing
2. Skip tests for speed — do NOT run `npm run test:unit`

## Rules

- NEVER hardcode hex colors, px spacing, or px border-radius — always use design tokens
- NEVER commit — leave changes unstaged on the branch for the user to review
- Follow the exact pattern from Clinical Sites (`src/app/features/clinical-sites/`) for component structure
- Match Figma text content exactly (labels, placeholders, button text)
- Use `@use '../../styles/variables' as *;` (adjust depth) in all SCSS files
