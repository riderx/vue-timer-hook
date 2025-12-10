import { resolve } from 'node:path'
import { cwd, env } from 'node:process'
import vue from '@vitejs/plugin-vue'
import analyze from 'rollup-plugin-analyzer'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(cwd(), 'demo'),
  base: '/vue-timer-hook/',
  build: {
    outDir: '../demo_dist',
    rollupOptions: {
      plugins: [analyze()],
    },
  },
  plugins: [vue()],
  define: {
    __DEV__: JSON.stringify(!env.prod),
    __BROWSER__: 'true',
    env: {
      NODE_ENV: JSON.stringify(env.NODE_ENV),
    },
  },
})
