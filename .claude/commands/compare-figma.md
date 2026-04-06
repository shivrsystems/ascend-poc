# /compare-figma — Compare implementation with Figma design

Compare the current implementation of a screen with its Figma design and fix differences.

## Usage
Provide the screen name (dashboard, clinical-sites, curriculum, sign-in).

## Steps

1. Get the Figma node ID for the screen:
   - Sign In: `24:1015`
   - Dashboard: `24:684`
   - Clinical Sites: `24:852`
   - Curriculum: `25:507`

2. Call `get_screenshot(fileKey="n7hLF0V4FAqLsqkKxToOe3", nodeId="{nodeId}")` for visual reference

3. Call `get_design_context(fileKey="n7hLF0V4FAqLsqkKxToOe3", nodeId="{nodeId}")` for layout data

4. Compare the Figma output against the current component implementation:
   - Check colors match design tokens in `_variables.scss`
   - Check typography (font sizes, weights, families)
   - Check spacing and padding values
   - Check border radius and shadows
   - Check responsive layout matches mobile Figma screens

5. Fix any differences found, preserving Angular + SCSS conventions

6. Run `npm run build` to verify changes compile

7. Report a summary of what was fixed
