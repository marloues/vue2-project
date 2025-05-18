import Vue from "vue";
import VueRouter from "vue-router";
// 修改前
// import HomeView from '../views/HomeView.vue'

// 修改后
const HomeView = () =>
  import(/* webpackChunkName: "home" */ "../views/HomeView.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 添加路由性能追踪
// 在路由配置中添加性能标记
router.beforeEach((to, from, next) => {
  if (window.performance) {
    window.performance.mark("routeChangeStart");
  }
  next();
});

router.afterEach(() => {
  if (window.performance) {
    window.performance.mark("routeChangeEnd");
    window.performance.measure(
      "routeChange",
      "routeChangeStart",
      "routeChangeEnd"
    );
    const measure = window.performance.getEntriesByName("routeChange")[0];
    console.log(`Route change duration: ${measure.duration.toFixed(2)}ms`);
  }
});

export default router;
