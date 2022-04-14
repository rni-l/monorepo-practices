# 搭建基于 Monorepo 的库脚手架

> 很多著名的库都是使用 Monorepo 架构，比如 Vue-cli, Babel。一个大型的库，通常会有很多子库，这时候 Monorepo 可以解决依赖的问题，并且可以很方便地对每个子库进行管理。

## 需求

搭建的包有：

1. Common，存放基础配置
2. A 包
3. B 包，需要依赖 A 包

A 包和 B 包使用 Vite 进程开发和打包

需要有单元测试

需要有发布流程和管理

需要有 Changelog 的自动生成

## 搭建

有一部分的配置和 [搭建业务项目脚手架](/example/lerna/plugins) 一样，我们这部分的配置就不再详细说明，直接上命令。

```shell
mkdir plugins && cd plugins && lerna init

npm i eslint prettier eslint-config-prettier eslint-plugin-prettier stylelint stylelint-config-standard stylelint-config-prettier stylelint-config-recommended-scss postcss-html stylelint-config-recommended-vue lint-staged @commitlint/cli @commitlint/config-angular -D && ./node_modules/.bin/eslint --init
```

配置 lerna.json

```json
{
  "packages": ["packages/*"],
  "version": "0.0.0",
  "command": {
    "bootstrap": {
      "hoist": true
    }
  }
}
```

添加并配置 .eslintrc.js

```javascript
// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  parser: "vue-eslint-parser",
  plugins: ["vue", "@typescript-eslint", "prettier"],
  rules: {
    semi: ["error", "never"],
  },
};
```

添加并配置 .stylelintrc.json

```json
{
  "extends": [
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-prettier"
  ]
}
```

添加并配置 husky 和 commit lint

```shell
git init # 先要添加 .git 文件
npx husky-init && npm install

```

修改 .husky/commit-msg

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run commit-lint
```

修改 .husky/pre-commit

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged

```

添加 .gitignore 文件

```shell
touch .gitignore # 配置对应文件的忽略
```

添加并配置 commitlint.config.js

```javascript
// eslint-disable-next-line no-undef
module.exports = {
  extends: ["@commitlint/config-angular"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "revert",
        "chore",
        "perf",
      ],
    ],
  },
};
```

配置 package.json

```json
{
  "scripts": {
    "lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore --fix packages",
    "format": "prettier .  --write",
    "prepare": "husky install",
    "lint-staged": "lint-staged -v",
    "style-lint": "stylelint \"**/*.{css,scss,sass,vue}\" --cache --fix",
    "commit-lint": "commitlint  --edit $1 -o -c"
  },
  "lint-staged": {
    "packages/**/.{vue,js,ts}": ["npm run lint"],
    "packages/**/*.{scss,css,vue}": ["npm run style-lint"]
  }
}
```

添加 Common 包

```shell
cd ../../
lerna create common -y
```

目录结构如下：

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
│   ├── package-lock.json
│   └── package.json
```

添加 A 包：

```shell
cd packages
npm create vite@latest # 选择 vue-ts
```

A 包添加 .eslintrc.js

```javascript
// eslint-disable-next-line no-undef
module.exports = {
  extends: ["../../.eslintrc.js"],
};
```

然后将 Common 包添加到 A 包

```shell
lerna add --scope=a common
```

添加 B 包：

```shell
cd packages
npm create vite@latest # 选择 vue-ts
```

包添加 .eslintrc.js

```javascript
// eslint-disable-next-line no-undef
module.exports = {
  extends: ["../../.eslintrc.js"],
};
```

然后将 Common 包和 A 包添加到 B 包

```shell
lerna add --scope=b common
lerna add --scope=b a
```

现在分别运行 A 包和 B 包，都是正常运行的。

执行下命令，看下整个项目多大：

```shell
du -h -d=1
260M    .
# 如果不配置 hoist，我测试的文件体积如下：
502M    .
```

### 执行测试

测试的配置这里不再赘述，在要执行测试的包的 `script` 添加命令：

```json
{
  "scripts": {
    "test": "vitest --run"
  }
}
```

在根 package.json 配置命令：

```json
{
  "scripts": {
    "test": "lerna run --scope @ddd2/a --scope @ddd2/b test"
  }
}
```

使用 `--scope` 限制要执行哪个包的 `test` 命令，接着在 `husky` 的 `pre-commit` 钩子配置里添加命令，这样当我们 `git commit` 时，就会先校验 `lint`，再执行 `test`:

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
npm run test
```



#### 单独执行指定的包

## 生成 changelog

这里不使用 `lerna-changelog`，因为它只能用于 github 的仓库

我们使用 `commitizen` 来规范 commit 信息

```shell
npm i commitizen -D
```

然后在  `lerna.json`  配置：

```json
{
  "command": {
    "version": {
      "conventionalCommits": true
    }
  }
}
```

这样当我们要 `lerna publish` 的时候，`lerna` 会根据我们的 `commit` 信息转换为 `changelog`

## 完善配置

设置 git 仓库和 npm 源，方便测试（这里我设置私有的）

```shell
# 添加 git 仓库
git remote add origin ...
# 设置 npm 源
touch .npmrc
```

### 发布版本

```shell
lerna publish
```

根据提示信息输入内容即可。`lerna` 会对项目内的子包进行发布，生成 tag 并上传到 git 仓库，并且推送版本到对应的 npm 源
