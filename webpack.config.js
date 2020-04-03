const path = require('path')
module.exports = {
  mode: 'development',
  //mode: 'production',
  entry: {
    index: './src/init.js',
  },
  target: 'web',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
}