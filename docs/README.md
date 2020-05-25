# mulo-admin

> 开发中

## 核心概念

- 可视化在线编辑模板 ,  本地编辑逻辑代码

## 开发技术

vue + php-thinkphp6 + socket.io / swoole


## 文档

https://loqhcn.github.io/mulo-admin/#/

## 简介

这个项目最初是为了封装几个常用的组件和做一套后台模板,如基础列表模板附加筛选, 为了开发后台管理系统方便.
但是,为了更方便, 有了通过可视化生成后台的想法~ , 参考了很多类似的可视化编辑的项目
但是,可视化生成的东西, 很难真正用到项目中去, 也就生成一下静态的, 要么就是生成后复制到项目中, 复制过去后以后还是只能手动编辑去维护了
所以就想, 采用 半可视化半编程 , 类似Dreamweaver 的方式, 既保留vue开发灵活性, 又保留可视化编辑的遍历, 又保证可更新迭代

## 其他组件
目前在这个项目内开发,较完善后, 所有的其它组件和相关的东西都抽离到其它项目中;


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 计划

- 开发一套 急速开发 + 可视化生成 的后台管理系统

- 可以作为独立组件使用

