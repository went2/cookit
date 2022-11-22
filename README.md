# 说明

一个从零搭建的未使用框架的查菜谱应用。

## webpack 配置

### 安装

1. 安装 `webpack`, `webpack-cli`, 'webpack-dev-server'

  > npm install --save-dev webpack webpack-cli webpack-dev-server

2. 基本 loader: 处理css

  > npm install --save-dev style-loader css-loader

3. html 模板：`html-webpack-plugin`
  > npm install --save-dev style-loader css-loader

### 配置

以下选项是配置的起手式：

`entry`, `output`, `devServer`, 处理css的loader, 处理图片的loader,  html 模板

```js
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: './dist',
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
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: 'index.html',
      title: 'Cook it!'
    }),
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
