import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const distDir = resolve(import.meta.dirname, '../../dist')

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
      resolve(distDir, 'vue-timer-hook.cjs'),
      'utf8',
    )
    expect(content).toMatch(/require\(['"]vue['"]\)/)
  })

  it('cjs entry loads under Node createRequire', () => {
    const require = createRequire(import.meta.url)
    const mod = require(resolve(distDir, 'vue-timer-hook.cjs'))
    expect(mod.useTimer).toBeTypeOf('function')
    expect(mod.useStopwatch).toBeTypeOf('function')
    expect(mod.useTime).toBeTypeOf('function')
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
