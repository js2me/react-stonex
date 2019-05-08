const resolve = require('path').resolve
const path = dir => resolve(__dirname, dir)

const createConfig = mode => {
  const isProd = mode === 'production'
  let filename = 'react-stonex'
  return {
    entry: path('lib/index.js'),
    mode: mode,
    output: {
      path: path('dist'),
      filename: (isProd ? `${filename}.min` : filename) + '.js',
      library: filename,
      libraryTarget: 'umd',
    },
    resolveLoader: {
      modules: ['node_modules', path('loaders')],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/,
        },
      ],
    },
  }
}

module.exports = [createConfig('development'), createConfig('production')]
