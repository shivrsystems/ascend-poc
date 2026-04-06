# /migrate-screen — Scaffold a new screen

Scaffold a new screen with model, service, component, route, sidebar entry, and tests.

## Usage
Provide the screen name (e.g., "student-profiles") and this command will:

1. Create model file at `src/app/core/models/{name}.model.ts`
2. Create service with mock data at `src/app/core/services/{name}.service.ts`
3. Create component files at `src/app/features/{name}/`:
   - `{name}.ts` — Standalone component with signals, inject(), HeaderComponent
   - `{name}.html` — Template with header, toolbar (filter chips + search), content grid
   - `{name}.scss` — Styles using design tokens from `_variables.scss`
4. Add lazy route to `src/app/app.routes.ts` under the Shell children
5. Add nav item to `src/app/layout/sidebar/sidebar.ts` navItems array
6. Create test file at `src/app/features/{name}/{name}.spec.ts` with 10+ tests
7. Create service test at `src/app/core/services/{name}.service.spec.ts` with 10+ tests
8. Run `npm run test:unit` to verify all tests pass
9. Run `npm run build` to verify build succeeds

## Template
Follow the pattern established by Clinical Sites or Curriculum Management screens. Use:
- `@use '../../styles/variables' as *;` in SCSS
- Angular Material icons and components
- Responsive grid layout with mobile breakpoints
- Filter chips + search + action button toolbar pattern
- Per-org mock data switching via OrganizationService
