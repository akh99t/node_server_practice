const path = require('path');

module.exports = {
  mode: 'development',
  entry: './bin/www.js',
  output: {
    filename: "dist.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [{
      // test
    }]
  }
}