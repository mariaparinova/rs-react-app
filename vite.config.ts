import { defineConfig, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test-utils/setup.ts',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/index.{ts,tsx}',
        'src/setupTests.{ts}',
        'src/**/*.d.ts',
        '**/*.config.ts',
        'src/types/**',
        'src/api-repositories/pets/pets.types.ts',
        'src/types/pet.ts',
        ...coverageConfigDefaults.exclude,
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});
