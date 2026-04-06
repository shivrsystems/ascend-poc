# /mobile-check — Audit mobile responsiveness

Audit all screens for mobile responsiveness against Figma mobile designs.

## Steps

1. Review each screen's SCSS for mobile media queries:
   - `src/app/features/auth/sign-in/sign-in.scss`
   - `src/app/features/dashboard/dashboard.scss`
   - `src/app/features/clinical-sites/clinical-sites.scss`
   - `src/app/features/curriculum/curriculum.scss`
   - `src/app/layout/sidebar/sidebar.scss`
   - `src/app/layout/header/header.scss`

2. For each screen, verify these mobile behaviors (breakpoint: 768px):
   - **Sign In**: Left panel stacks above card, stats/features hidden, reduced padding
   - **Dashboard**: 2x2 stat grid, table hides status/category columns, side panels stack below
   - **Clinical Sites**: Filter chips collapse, search goes full-width, 1-column card grid
   - **Curriculum**: Filter chips collapse, search goes full-width, 1-column card grid
   - **Sidebar**: Hidden on mobile
   - **Header**: Shows hamburger menu + ATI logo + bell + avatar; hides title, org dropdown

3. Compare with Figma mobile screenshots:
   - iPhone Sign In: node `65:3188`
   - iPhone Dashboard: node `65:3267`
   - iPhone Clinical Sites: node `69:1620`
   - iPhone Curriculum: node `69:2126`

4. Fix any missing or incorrect responsive styles

5. Run `npm run build` to verify

6. Report findings and fixes
