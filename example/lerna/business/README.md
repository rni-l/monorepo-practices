# 业务项目

> 使用 Lerna 搭建一个业务项目，尽可能按照一个真实项目去搭建。

## 搭建需求

1. 有两个端 PC 和 H5，其中有些配置代码和工具是相同的
2. 要有 CHANGELOG
3. 提交代码前要检查代码样式

## 简单的项目架构

开发使用的第三方工具和框架：

1. ViteJS2
2. Vue3
3. TypeScript
4. Scss
5. Jest
6. Lerna
7. Pinia

工具链：

1. husky
2. Eslint
3. Lint-Stage
4. CHANGELOG

项目包：

1. Common
2. H5
3. PC

## 搭建

### 生成基本的文件

创建项目：

```shell
mkdir business && cd business && lerna init
```

添加 H5 包：

```shell
cd packages
npm create vite@latest # 选择 vue-ts
```

添加 Common 包：

```shell
lerna create common -y
```

PC 包等 H5 包配置完成后直接复制即可

### 配置 Eslint

在根目录安装依赖，并初始化：

```shell
npm i eslint -D
./node_modules/.bin/eslint --init
```

安装 prettier

```shell
npm i prettier eslint-config-prettier eslint-plugin-prettier -D

```

`.eslintrc.js` 配置如下：

```javascript
// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  parser: 'vue-eslint-parser',
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    semi: ['error', 'never'],
  },
}
```

H5 也要添加 `.eslintrc.js` 文件：

```javascript
// eslint-disable-next-line no-undef
module.exports = {
  extends: ['../../.eslintrc.js'],
}
```

配置 `scripts`: 

```json
{
  "scripts": {
    "format": "prettier .  --write",
    "prepare": "husky install",
  }
}
```

### 配置 Stylelint

安装依赖：

```shell
npm install --save-dev stylelint stylelint-config-standard stylelint-config-prettier stylelint-config-recommended-scss postcss-html stylelint-config-recommended-vue
```

配置 package.json：
```json
{
  "scripts": {
    "style-lint": "stylelint \"**/*.{css,scss,sass,vue}\" --cache --fix",
  }
}
```



添加 .stylelintrc.json：

```json
{
  "extends": ["stylelint-config-recommended-vue/scss", "stylelint-config-prettier"]
}
```



### 配置 Common 包

Common 包的职责，是存储通用配置和公共文件，我们不需要它编译，只要输出原文件即可。

文件结构如下：

```shell
.
├── common
│   ├── README.md
│   ├── lib
│   │   ├── config
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── utils
│   │       └── index.ts
│   ├── node_modules
│   ├── package-lock.json
│   └── package.json
```

### 配置 H5

生成完项目后，我们将 `common` 包添加到 H5 中：

```shell
lerna add --scope=h5 common
```

然后使用：

```vue
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { apiPrefix } from 'common'
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <P>ApiPrefix: {{ apiPrefix }}</P>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>

```

这样就可以了，每当我们修改 `common` 包的内容，都会自动更新依赖。

### 配置工具链

当我们要提交代码的时候，需要自动检验代码的样式和提交的 git 内容，这里用到 `husky` 和 `lint-staged` 做拦截和触发工具。

添加 `husky`，在根目录执行：

```shell
git init # 先要添加 .git 文件
npx husky-init && npm install
```

添加 `lint-staged`

```shell
npm i lint-staged -D
```

配置 `package.json`

```json
{
  "scripts": {
    "lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore --fix packages",
    "format": "prettier .  --write",
    "prepare": "husky install",
    "lint-staged": "lint-staged -v",
    "style-lint": "stylelint \"**/*.{css,scss,sass,vue}\" --cache --fix",
  },
  "lint-staged": {
    "packages/**/.{vue,js,ts}": [
      "npm run lint"
    ],
    "packages/**/*.{scss,css,vue}": [
      "npm run style-lint"
    ]
  },
}
```

配置 git commit lint：

```shell
npm i @commitlint/cli @commitlint/config-angular -D
```

添加 `husky` 配置：`npx husky add commit-msg`

修改 `package.json`:

```json
{
  "scripts": {
    "commit-lint": "commitlint  --edit $1 -o -c"
  }
}
```

修改 `.husky/commit-msg`:

```json
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run commit-lint

```

添加规则文件：commitlint.config.js：

```javascript
// eslint-disable-next-line no-undef
module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'revert',
        'chore',
        'perf',
      ],
    ],
  },
}

```

这样当我们提交代码的时候，就会检查你的 `git commit` 内容，是否符合规范。

### 搭建 PC 项目

复制 H5 项目，然后修改 `package.json` 的 `name` 属性即可。



这样我们已经完成了所有的配置， H5 包和 PC 包可以各自运行，通用代码都在 `common` 里。



## 参考资料

1. [Eslint - 快速开始](http://eslint.cn/docs/user-guide/getting-started)
2. [配置 eslint and prettier 教程](https://vueschool.io/articles/vuejs-tutorials/eslint-and-prettier-with-vite-and-vue-js-3/)
2. [husky](https://typicode.github.io/husky/#/?id=automatic-recommended)
2. [lint-staged](https://www.npmjs.com/package/lint-staged)
2. [commit-msg](https://www.npmjs.com/package/commit-msg)
2. [配置 husky + commitlint](https://remarkablemark.org/blog/2019/05/29/git-husky-commitlint/)
2. [stylelint](https://stylelint.io/)
2. [vue3 stylelint 配置](https://www.npmjs.com/package/stylelint-config-recommended-vue)
