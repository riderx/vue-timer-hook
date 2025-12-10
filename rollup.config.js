import { createRequire } from 'node:module'
import path from 'node:path'
import { env, exit } from 'node:process'
import { fileURLToPath } from 'node:url'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import ts from 'rollup-plugin-typescript2'

const require = createRequire(import.meta.url)
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const pkg = require('./package.json')

const name = pkg.name

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} Eduardo San Martin Morote
  * @license MIT
  */`

// ensure TS checks only once for each build
let hasTSChecked = false

const outputConfigs = {
  // each file name has the format: `dist/${name}.${format}.js`
  // format being a key of this object
  'esm-bundler': {
    file: pkg.module,
    format: `es`,
  },
  'cjs': {
    file: pkg.main,
    format: `cjs`,
  },
  'global': {
    file: pkg.unpkg,
    format: `iife`,
  },
  'esm': {
    file: pkg.browser || pkg.module.replace('bundler', 'browser'),
    format: `es`,
  },
}

const allFormats = Object.keys(outputConfigs)
// in vue-router there are not that many
const packageFormats = allFormats
const packageConfigs = packageFormats.map(format =>
  createConfig(format, outputConfigs[format]),
)

// only add the production ready if we are bundling the options
packageFormats.forEach((format) => {
  if (format === 'cjs') {
    packageConfigs.push(createProductionConfig(format))
  }
  else if (format === 'global') {
    packageConfigs.push(createMinifiedConfig(format))
  }
})

export default packageConfigs

function createConfig(format, output, plugins = []) {
  if (!output) {
    console.log(require('chalk').yellow(`invalid format: "${format}"`))
    exit(1)
  }

  output.sourcemap = !!env.SOURCE_MAP
  output.banner = banner
  output.externalLiveBindings = false
  output.globals = {
    vue: 'Vue',
    // devtools are not global in iife
    // '@vue/devtools-api': 'VueDevtoolsApi',
  }

  const isProductionBuild = /\.prod\.js$/.test(output.file)
  const isGlobalBuild = format === 'global'
  const isRawESMBuild = format === 'esm'
  const isNodeBuild = format === 'cjs'
  const isBundlerESMBuild = /esm-bundler/.test(format)

  if (isGlobalBuild)
    output.name = 'VueTimerHook'

  const shouldEmitDeclarations = !hasTSChecked

  const tsPlugin = ts({
    check: !hasTSChecked,
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations,
      },
      exclude: ['__tests__', 'test-dts'],
    },
  })
  // we only need to check TS and generate declarations once for each build.
  // it also seems to run into weird issues when checking multiple times
  // during a single build.
  hasTSChecked = true

  const external = ['vue']
  if (!isGlobalBuild) {
    external.push('@vue/devtools-api')
  }

  const nodePlugins = [resolve(), commonjs()]

  return {
    input: `src/index.ts`,
    // Global and Browser ESM builds inlines everything so that they can be
    // used alone.
    external,
    plugins: [
      tsPlugin,
      createReplacePlugin(
        isProductionBuild,
        isBundlerESMBuild,
        // isBrowserBuild?
        isGlobalBuild || isRawESMBuild || isBundlerESMBuild,
        isGlobalBuild,
        isNodeBuild,
      ),
      ...nodePlugins,
      ...plugins,
    ],
    output,
    // onwarn: (msg, warn) => {
    //   if (!/Circular/.test(msg)) {
    //     warn(msg)
    //   }
    // },
  }
}

function createReplacePlugin(
  isProduction,
  isBundlerESMBuild,
  isBrowserBuild,
  isGlobalBuild,
  isNodeBuild,
) {
  const replacements = {
    __COMMIT__: `"${env.COMMIT}"`,
    __VERSION__: `"${pkg.version}"`,
    __DEV__: isBundlerESMBuild
      ? `(env.NODE_ENV !== 'production')` // preserve to be handled by bundlers
      : JSON.stringify(!isProduction), // hard coded dev/prod builds
    // this is only used during tests
    __TEST__: 'false',
    // If the build is expected to run directly in the browser (global / esm builds)
    __BROWSER__: isBrowserBuild,
    __FEATURE_PROD_DEVTOOLS__: isBundlerESMBuild
      ? `__VUE_PROD_DEVTOOLS__`
      : 'false',
    // is targeting bundlers?
    __BUNDLER__: JSON.stringify(isBundlerESMBuild),
    __GLOBAL__: JSON.stringify(isGlobalBuild),
    // is targeting Node (SSR)?
    __NODE_JS__: JSON.stringify(isNodeBuild),
  }
  // allow inline overrides like
  // __RUNTIME_COMPILE__=true yarn build
  Object.keys(replacements).forEach((key) => {
    if (key in env) {
      replacements[key] = env[key]
    }
  })
  return replace({
    preventAssignment: true,
    values: replacements,
  })
}

function createProductionConfig(format) {
  return createConfig(format, {
    file: `dist/${name}.${format}.prod.js`,
    format: outputConfigs[format].format,
  })
}

function createMinifiedConfig(format) {
  const { terser } = require('rollup-plugin-terser')
  return createConfig(
    format,
    {
      file: `dist/${name}.${format}.prod.js`,
      format: outputConfigs[format].format,
    },
    [
      terser({
        module: format.startsWith('esm'),
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
      }),
    ],
  )
}
