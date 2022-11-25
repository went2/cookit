# webpack 基本配置

以下介绍一个新项目如何配置 webpack，主要内容和 [webpack 官方文档的 Guides](https://webpack.js.org/guides/getting-started/) 大同小异。

## 1. 安装

1.1  webpakc 本体和开发服务器 'webpack-dev-server'

> npm install --save-dev webpack webpack-cli webpack-dev-server

1.2 基本 loader 和 plugins

webpack 本身能处理 js 和 json 文件，不用借助 loader 和插件，对于其他类型的文件如 `.css`、`.vue`、`.jsx`文件等都要相应的 loader 来处理。

1.2.1 css loader

在实际开发中，出于撰写习惯，一般会用 less 或 sass 的语法来写样式文件，以 sass 为例，需要安装 `sass`，`sass-loader` 处理 `.sass`文件，安装 `css-loader` 处理 `.css`文件。

此外，处理完 `.css` 文件后要告诉 webpack 怎么将它引入最终的 `index.html` 文件，是全部写到 `<style>`内插入 html 的头部，还是外部文件通过 `<link>` 引入。前者用 `style-loader`处理，后者可由 `mini-css-extract-plugin` 这个插件（或 `postcss`）处理，两者采用其一，这里采用后者。

> npm install --save-dev css-loader

> npm install --save-dev sass sass-loader

> npm install --save-dev mini-css-extract-plugin


1.2.3 html template

我需要让 webpack 将打包后的 js代码、css文件、图片文件插入自定义的 `.html` 模板文件中，这要借助`html-webpack-plugin` 实现。

自定义的模板使用 ejs 文件，[避免与 html-loader 的冲突](https://github.com/kaivin/webpack4.x/blob/master/README/18%EF%BC%9Ahtml-loader%E4%B8%8EHtmlWebpackPlugin%E7%9A%84%E5%86%B2%E7%AA%81.md)，其中引入图片的方式也都使用 ejs 语法。

> npm install --save-dev html-webpack-plugin

##  2. 配置

安装了 loader 和 plugins 还要做配置才会生效，webpack 配置在项目根目录的 `webpack.config.js`文件中进行。

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js', // 打包的入口文件，可多个
  output: { // 打包后的输出配置
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true
  },
  devServer: {
    static: './dist', // 告诉 webpack-dev-server 观察哪个文件夹
  },
  module: { // loader 配置写到 rules 字段内
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: { // 配置输出文件
          filename: 'imgs/[name].[hash:6][ext]'
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: 'index.ejs', // 自定义html模板文件，使用ejs文件，避免与html-loader冲突
      title: 'Cook it!',
      favicon: 'favicon.png',
      hash: true
    }),
    new MiniCssExtractPlugin(),
  ]
}

// package.json 的 script 字段
{
  "script": {
    "dev": "webpack serve --open --mode development",
    "build": "webpack --mode production"
  }
}
```

上述配置能让 webpack 打包 js、图片，插入到我给的 html 模板中，并且配置了开发服务器可实时预览修改源代码后的结果。

// 成文。2022.11.25