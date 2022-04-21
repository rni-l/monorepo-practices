# Turborepo

和 lerna 一样，是一个 Monorepo 的管理工具，相对 lerna 来说，它多了任务执行调度管理和远程缓存等强大功能，但它少了类似 lerna 的版本管理功能，所以在官方文档建议使用 changesets

接下来会使用 Turborepo + changesets 的组合，搭建一个业务项目的框架和工具库的框架，而框架的功能就像该仓库上的 lerna demo 一样，vite + jest + lint 等常用工具

## 参考资料

1. [turborepo 官方文档](https://turborepo.org/docs/getting-started)
2. [changesets](https://github.com/changesets/changesets)