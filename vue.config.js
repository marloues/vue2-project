// 合并后的正确配置
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  transpileDependencies: true, // 是否使用babel编译依赖
  productionSourceMap: process.env.NODE_ENV !== "production", // 生产环境生成sourcemap

  configureWebpack: {
    optimization: {
      usedExports: true, // 只导出被使用的模块
      concatenateModules: true, // 合并模块
      splitChunks: {
        chunks: "all", // 分割所有模块
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/, // 匹配node_modules目录下的模块
            priority: -10, // 优先级
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // 删除console
              drop_debugger: true, // 删除debugger
            },
          },
        }),
      ],
    },
    externals:
      process.env.NODE_ENV === "production"
        ? {
            vue: "Vue",
            "vue-router": "VueRouter",
            vuex: "Vuex",
            "element-ui": "ELEMENT",
          }
        : {}, // 生产环境不打包这些模块
  },

  chainWebpack: (config) => {
    config.module.rules.delete("images"); // 删除默认的图片处理规则
    config.module
      .rule("images")
      .test(/\.(gif|png|jpe?g|webp|svg)$/i)
      .use("webp-loader")
      .loader("webp-loader")
      .options({
        quality: 75,
      })
      .end()
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 8192,
        name: "img/[name].[hash:8].[ext]", // 图片输出路径和命名
        esModule: false, // 解决 Vue2 中图片路径问题
      });
    // 合并到单个devServer配置
    config.devServer
      .headers({
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Content-Security-Policy": "default-src 'self'",
        "X-XSS-Protection": "1; mode=block",
      })
      .proxy({
        "/api": {
          target: "https://your-api-domain.com",
          changeOrigin: true,
          pathRewrite: { "^/api": "" },
          // 移除冗余的headers配置
        },
      });
  },
};
