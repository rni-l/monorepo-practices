# 使用 Lerna 快速搭建项目

## 搭建

建文件夹并初始化

```shell
mkdir quickStart && cd quickStart
lerna init
```

添加模块

```shell
lerna create test1 -y # -y 是忽略所有的提示
lerna create test2 -y
```

将 test1 模块添加到 test2

```shell
// 使用 lerna add 的方式添加，会自动生成软链接，test1 模块修改后，test2 自动会更新
lerna add test1 --scope=test2

// 生成软链接
lerna bootstrap
```

我们将 `test1` 的依赖添加到 `test2` 中，接着在 `packages/test2/lib/test2.js`  使用 `test1` 模块，然后执行 `test2.js` 文件，就会发现执行了 `test1` 依赖的代码。

## 执行

```shell
# 执行代码
node packages/test2/lib/test2.js
```

这时候每当我们修改 `test1` 模块后再执行 `test2` 的代码，可以无需更新依赖包，直接执行最新的代码。


