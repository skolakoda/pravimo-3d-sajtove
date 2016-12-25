var config = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js'
  },
  watch: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  }
}

module.exports = config
