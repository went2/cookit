# 说明

一个从零开始搭建的未使用框架的查菜谱应用。

## 演示地址

- https://cookit-simon.netlify.app/

## 实现功能

- 搜索菜谱，呈现相关菜谱列表
- 查看菜谱详情
- 动态计算配料数量

## 做了这些事

### 1. webpack 基本配置

webpack 是个源代码打包工具，所谓打包，可理解为—— 根据 module 的导入导出找到源代码文件 => 对源代码做编译（去除空格、压缩等工作） => 生成编译后的代码——的过程。开发者写源代码，然后把源代码交给 webpack，经过 webpack 打包，得到可部署的代码。前端常用框架的脚手架工具，如 `create-react-app`, `vue-cli` 都采用 webpack 打包，并做好了基本配置。

webpack 是个通用的打包工具，任何一个从空白文件夹开始的项目都可以引入它，所有会有一些通用配置，本项目探索引入 webpack 需要做哪些基本配置，这些配置可以保留成所谓的样板代码(boilerplate)供后续新项目参考使用，脚手架工具的好处在于给开发者省下写样板代码的时间。

详见文档 [webpack 基本配置](https://github.com/went2/webpack5.x-config#readme)

### 2. 采用 MVC 组织代码

本项目实现了 “查询-> 可分页的列表 -> 详情” 基本功能，数据来自于网络api。MVC 三层都用 js 实现，写的时候大致把握一个原则是每一层不需要知道其他两层的具体细节，只调用对外暴露的方法。本项目是个demo，文件目录不具有参考价值，主要是关注各层代码中的内容。

详见文档 [一个网页项目的mvc实践](./docs/%E4%B8%80%E4%B8%AA%E7%BD%91%E9%A1%B5%E9%A1%B9%E7%9B%AE%E7%9A%84mvc%E5%AE%9E%E8%B7%B5.md)