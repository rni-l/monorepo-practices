# 业务项目

> 使用  Lerna 搭建一个业务项目，尽可能按照一个真实项目去搭建。

## 搭建需求

1. 有两个端 PC 和 H5，其中有些配置代码和工具是相同的
2. 要有 CHANGELOG
3. 提交代码前要检查代码样式
4. 



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
  extends: ['../../.eslintrc.js']
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

生成完项目后，



## 参考资料

1. [Eslint - 快速开始](http://eslint.cn/docs/user-guide/getting-started)
2. [配置 eslint and prettier 教程](https://vueschool.io/articles/vuejs-tutorials/eslint-and-prettier-with-vite-and-vue-js-3/)