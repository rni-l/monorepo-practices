# 业务项目

> 使用 Turbo 搭建一个业务项目，尽可能按照一个真实项目去搭建。

直接复制 `lerna/business` 项目，移除 `lerna` 相关的内容

## 配置 Turborepo

直接根据 `turborepo` 的快速开始教程配置即可，`workspace` 使用 `npm` 进行管理：

```shell
npm install turbo -D
```

Add turbo.json:

```json
{
  "$schema": "https://turborepo.org/schema.json",
  "baseBranch": "origin/main",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      // note: output globs are relative to each package's `package.json`
      // (and not the monorepo root) 
      "outputs": [".next/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false
    }
  }
}
```

Add workspaces and scripts configuration to package.json:

```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build"
  },
  "workspaces": [
     "packages/*"
  ]
}
```

Install dependencies:

```shell
npm i -w
```

```shell
npm run dev # 会对 workspace 的包执行 dev 命令
npm run build # 同上
```

## 配置 Changesets

Changesets 可以帮助我们生成 Changelog，管理版本号和进行发布到 Npm。而配置很简单，同样跟着文档配置即可

Install:

```shell
npm install @changesets/cli && npx changeset init
```

Adding changesets:

```shell
npx changeset
```

Add a version:

```shell
npx changeset version
```

会将你添加的所有 changesets 转换成 changelog，并修改对应的依赖版本号和项目的版本号

Publish:

```shell
npx changeset publish
```







## 参考资料

1. [Turborepo 文档](https://github.com/lerna/lerna/tree/main/commands/run#readme)
1. [Changesets 文档](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)


