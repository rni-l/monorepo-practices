# 搭建基于 Monorepo 的库脚手架

> 直接复制 turborepo/business 进行修改



## 基础

安装依赖：

```shell
npm i -ws
```

开发：

```shell
npm run dev
```

测试：

```shell
npm run test
```

打包：

```shell
npm run build
```



## 发布流程

这里重点说下发布流程：

1. 准备要提交版本时，使用 `npx changeset` 生成该版本的信息
2. `npx changeset version` 替换版本号和生成 changelog
3. `git commit `
4. `npx changeset publish` 发布版本
5. git push 提交代码
