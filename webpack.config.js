const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const json5 = require('json5');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    static: './dist',
    port: 5500,
  },
};
