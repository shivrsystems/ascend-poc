import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

const angularDedupe = [
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
] as const;

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        test: {
          name: 'services',
          globals: true,
          environment: 'jsdom',
          include: ['src/app/core/**/*.spec.ts'],
          setupFiles: ['src/test-setup.services.ts'],
          sequence: { groupOrder: 0 },
        },
      },
      {
        plugins: [angular({ tsconfig: 'tsconfig.spec.json' })],
        resolve: {
          dedupe: [...angularDedupe],
        },
        test: {
          name: 'components',
          globals: true,
          environment: 'jsdom',
          include: [
            'src/app/features/**/*.spec.ts',
            'src/app/layout/**/*.spec.ts',
          ],
          setupFiles: ['src/test-setup.components.ts'],
          sequence: { groupOrder: 1 },
          server: {
            deps: {
              inline: true,
            },
          },
        },
      },
    ],
  },
});
