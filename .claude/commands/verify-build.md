# /verify-build — Run tests and build

Run the full test suite and production build to verify everything works.

## Steps

1. Set Node version:
   ```
   export PATH="$HOME/.nvm/versions/node/v22.14.0/bin:$PATH"
   ```

2. Run Vitest tests:
   ```
   npm run test:unit
   ```
   - All tests must pass (0 failures)
   - Report total test count and any failures

3. Run production build:
   ```
   npm run build
   ```
   - Must complete with exit code 0
   - Report any warnings (especially CSS budget warnings)
   - Report bundle sizes

4. Summary:
   - Total tests: X passed, Y failed
   - Build: success/failure
   - Warnings: list any
   - Bundle size: initial + lazy chunks
