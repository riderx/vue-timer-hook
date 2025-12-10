import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  ignores: [
    'dist',
    'node_modules',
    'size-checks',
    'coverage',
    '*.min.js',
    '*.d.ts',
  ],
})
