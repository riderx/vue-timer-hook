import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const distDir = resolve(import.meta.dirname, '../dist')

describe('published dist outputs', () => {
  it('esm-bundler build stays pure ESM (no CommonJS require)', () => {
    const content = readFileSync(
      resolve(distDir, 'vue-timer-hook.esm-bundler.js'),
      'utf8',
    )
    expect(content).not.toMatch(/require\(['"]vue['"]\)/)
    expect(content).toMatch(/from ['"]vue['"]/)
  })

  it('cjs build uses require for vue', () => {
    const content = readFileSync(
      resolve(distDir, 'vue-timer-hook.cjs.js'),
      'utf8',
    )
    expect(content).toMatch(/require\(['"]vue['"]\)/)
  })

  it('ships TypeScript declarations', () => {
    const content = readFileSync(
      resolve(distDir, 'vue-timer-hook.d.ts'),
      'utf8',
    )
    expect(content).toContain('useTimer')
    expect(content).toContain('useStopwatch')
    expect(content).toContain('useTime')
  })
})
