import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MyPlugin from "./plugins";
import "lib-flexible/flexible.js";
import "./registerServiceWorker.ts";
import "./assets/css/reset.less";

Vue.config.productionTip = false;
Vue.use(MyPlugin);

new Vue({
  router,
  store,
  render: (h: any) => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    // if (store.state && store.state.token) {
    if (store.state) {
      // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: "/",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});
