import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['html', 'lcov', 'text'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/index.ts',
        'src/utils/index.ts',
        'src/hooks/index.ts',
        'src/global.d.ts',
        'src/devtools.ts',
      ],
    },
  },
  define: {
    __DEV__: true,
    __TEST__: true,
    __BROWSER__: true,
  },
})
