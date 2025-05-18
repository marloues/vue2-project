# vue2-project

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

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 优化点

首先看 vue.config.js 里的配置，里面有 1.代码分割（splitChunks）、
2.Tree Shaking（usedExports）、
3.Scope Hoisting（concatenateModules）、 4.使用 TerserPlugin 进行代码压缩，
5.externals 配置 CDN 外链。
这些都是构建阶段的优化。

然后图片处理方面，用了
1.webp-loader 转换格式，
2.url-loader 处理小文件为 base64，并且设置了 limit 值，
这些都是为了减少图片体积，提升加载速度。

路由方面
1.router/index.js 里用了懒加载，通过 import()动态导入组件，这样能减少初始加载的代码量。

在监控方面，
1.main.js 里集成了 Sentry 做错误追踪和性能监控，
2.Web Vitals 来收集核心性能指标，比如 CLS、FID 这些。此外，路由切换时用 performance API 测量时间，这也是性能监控的一部分。

安全方面，
1.vue.config.js 里配置了安全头部，比如 X-Content-Type-Options、CSP 等，防止一些常见的攻击。 2.还有在 HelloWorld.vue 里用 DOMPurify 来过滤 HTML 内容，防止 XSS 攻击。

按需引入 ElementUI 组件，而不是全局引入，这样可以减少打包体积。main.js 里只引入了 Button 和 DatePicker，并且单独引入样式文件。

另外，生产环境不生成 sourcemap，避免源码泄露，这也是一个安全优化点。

总结下来，应该分几个大类：构建优化、图片优化、路由优化、监控优化、安全优化和第三方库优化。
