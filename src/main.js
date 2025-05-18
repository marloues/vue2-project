import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as Sentry from "@sentry/vue";

// 删除全局引入
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// 按需引入示例（根据实际使用组件添加）
import { Button, DatePicker } from "element-ui";

Vue.config.productionTip = false;

// 删除全局注册
// Vue.use(ElementUI)

// 按需注册组件
// 正确按需引入方式（以Button组件为例）
// 删除以下手动引入代码
// import { Button } from 'element-ui'
// import 'element-ui/lib/theme-chalk/button.css'
// Vue.component(Button.name, Button)

// 保持ElementUI全局样式引入（可选）
import "element-ui/lib/theme-chalk/index.css";

Vue.component(Button.name, Button);
Vue.component(DatePicker.name, DatePicker);

// Sentry监控初始化
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    Vue,
    dsn: process.env.VUE_APP_SENTRY_DSN, // 改用环境变量
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

// Web Vitals性能指标采集
// getCLS(console.log);
// getFID(console.log);
// getLCP(console.log);

// 新增性能指标收集函数
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// 控制台输出性能指标
reportWebVitals((metric) => {
  console.log(metric.name, metric.value);
});

// 页面加载时间测量
window.addEventListener("load", () => {
  const timing = window.performance.timing;
  const loadTime = timing.loadEventEnd - timing.navigationStart;
  console.log("Page load time:", loadTime + "ms");
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
