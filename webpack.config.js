const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'imgs/[name].[hash:6][ext]',
          publicPath: './'
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: 'index.ejs',
      title: 'Cook it!',
      favicon: 'favicon.png',
      hash: true
    }),
    new MiniCssExtractPlugin(),
  ]
}