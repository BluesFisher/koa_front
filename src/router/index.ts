import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import * as utils from "@/utils";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  await utils.commonFunc.getCsrfToken();
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
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

export default router;
