var path = require('path');
var DIST_PATH = path.join(__dirname, 'client/dist');
var SRC_PATH = path.join(__dirname, 'client/src');

module.exports = {
  entry: SRC_PATH + '/App.jsx',
  output: {
    filename: 'bundle.js',
    path: DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_PATH,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}