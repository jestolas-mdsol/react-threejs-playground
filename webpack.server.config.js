const path = require('path');
const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',
  entry: './src/server/index.js',
  output: {
    path: DIST_PATH,
    filename: 'server.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  target: 'node',
};
