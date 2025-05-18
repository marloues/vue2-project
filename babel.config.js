module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      require.resolve("babel-plugin-component"),
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
        style: true, // 自动引入样式文件
      },
    ],
  ],
};
