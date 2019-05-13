const packageJson = require('./package.json')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const terser = require('rollup-plugin-terser').terser
// const commonjs = require('rollup-plugin-commonjs')

const deps = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
]

const inputOutputConfig = (outputFile, outputFormat, commonOutput = {}) => ({
  input: 'src/index.js',
  output: {
    file: `${outputFile}`,
    format: outputFormat,
    ...commonOutput,
  },
})

const productionBuildPlugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  terser({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false,
    },
  }),
]

module.exports = [
  // Common JS builds
  {
    ...inputOutputConfig('lib/react-stonex.js', 'cjs'),
    external: deps,
    plugins: [babel()],
  },
  {
    ...inputOutputConfig('lib/react-stonex.min.js', 'cjs'),
    external: deps,
    plugins: [babel(), ...productionBuildPlugins],
  },

  // EcmaScript builds
  {
    ...inputOutputConfig('es/react-stonex.js', 'es'),
    external: deps,
    plugins: [babel()],
  },
  {
    ...inputOutputConfig('es/react-stonex.mjs', 'es'),
    external: deps,
    plugins: [
      resolve({
        jsnext: true,
      }),
      babel({
        presets: ['@babel/preset-react'],
      }),
      ...productionBuildPlugins,
    ],
  },

  // UMD builds
  {
    ...inputOutputConfig('dist/react-stonex.js', 'umd', {
      name: 'ReactStonex',
    }),
    external: deps,
    plugins: [
      resolve({
        jsnext: true,
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  },
  {
    ...inputOutputConfig('dist/react-stonex.min.js', 'umd', {
      name: 'ReactStonex',
    }),
    external: deps,
    plugins: [
      resolve({
        jsnext: true,
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
      }),
      ...productionBuildPlugins,
    ],
  },
]
