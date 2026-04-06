# Ascend POC — Project Conventions

## Overview
Ascend is a modernized Angular POC for ATI Testing (atitesting.com), a nursing education platform. It demonstrates dashboard, clinical site management, and curriculum management screens with per-organization data switching.

## Tech Stack
- **Framework**: Angular 21 (standalone components, signals, `inject()`)
- **UI Library**: Angular Material 21 (Material 3)
- **Styling**: SCSS (no Tailwind) with design tokens in `src/app/styles/_variables.scss`
- **Testing**: Vitest with `@analogjs/vite-plugin-angular` for component tests
- **Language**: TypeScript 5.9 strict mode
- **Runtime**: Node 22 (use `nvm use 22` or `export PATH="$HOME/.nvm/versions/node/v22.14.0/bin:$PATH"`)
- **Data**: Mock data only — no real API calls

## Project Structure
```
src/
├── app/
│   ├── core/
│   │   ├── models/          # TypeScript interfaces (*.model.ts)
│   │   └── services/        # Injectable services with signals
│   ├── features/
│   │   ├── auth/sign-in/    # Sign-in screen
│   │   ├── dashboard/       # Dashboard screen
│   │   ├── clinical-sites/  # Clinical Sites screen
│   │   └── curriculum/      # Curriculum Management screen
│   ├── layout/
│   │   ├── sidebar/         # Collapsible sidebar navigation
│   │   ├── header/          # Page header with org switcher
│   │   └── shell/           # App shell (sidebar + content)
│   └── styles/
│       ├── _variables.scss  # Design tokens (colors, typography, spacing)
│       └── _mixins.scss     # SCSS mixins
├── styles.scss              # Global styles
└── test-setup.*.ts          # Vitest setup files
```

## Design Tokens
All design values are centralized in `src/app/styles/_variables.scss`:
- Colors: `$color-primary-*`, `$color-gray-*`, `$color-success-*`, etc.
- Typography: `$font-family-primary` (Helvetica Neue), `$font-family-heading` (Raleway)
- Spacing: `$spacing-xs` through `$spacing-6xl`
- Breakpoints: `$breakpoint-mobile` (768px), `$breakpoint-tablet` (1024px)

## Conventions

### Component Pattern
- Use standalone components with `@Component({ standalone: true })`
- Use signals for state: `signal()`, `computed()`
- Use `inject()` for DI, not constructor injection
- Template files: `component.html`, Style files: `component.scss`, Logic: `component.ts`
- Use Angular Material components where appropriate

### File Naming
- Directories: lowercase with dashes (`clinical-sites/`)
- Components: `feature-name.ts`, `feature-name.html`, `feature-name.scss`
- Models: `entity.model.ts`
- Services: `entity.service.ts`
- Tests: `entity.spec.ts`

### SCSS
- Always `@use '../../styles/variables' as *;` (adjust depth)
- Use design tokens, never hardcode colors/spacing
- Use `@media (max-width: $breakpoint-mobile)` for responsive
- Keep styles scoped to components via `:host`

### Services
- Services manage state via Angular signals
- `OrganizationService` is the source of truth for current org
- Other services use `computed()` that depend on `orgService.currentOrgId()`
- All data is mock — defined as `const` objects in service files

### Routing
- Lazy-loaded routes via `loadComponent()`
- Shell wraps all authenticated routes
- Sign-in is outside the shell

## Commands
```bash
npm start          # Dev server on localhost:4200
npm run build      # Production build
npm run test:unit  # Run Vitest tests
```

## Figma Source
- File: `https://www.figma.com/design/n7hLF0V4FAqLsqkKxToOe3/Ascend`
- Key screens: Sign In (24:1015), Dashboard (24:684), Clinical Sites (24:852), Curriculum (25:507)
- Mobile: iPhone Sign In (65:3188), Dashboard (65:3267), Clinical Sites (69:1620), Curriculum (69:2126)

## Testing Guidelines
- Minimum 10 tests per component/service
- Service tests: use `TestBed.inject()` to get service instances
- Component tests: use `TestBed.createComponent()` to test class logic
- Test filtering, search, pagination, combined queries, edge cases
- Run `npm run test:unit` — all tests must pass
