const babel = require('rollup-plugin-babel')
// const resolve = require('rollup-plugin-node-resolve')
// const commonjs = require('rollup-plugin-commonjs')

module.exports = [
  // CJS
  {
    input: 'lib/index.js',
    output: { file: 'dist/react-stonex.js', format: 'cjs', indent: false },
    plugins: [babel()],
    external: ['react'],
  },
]
