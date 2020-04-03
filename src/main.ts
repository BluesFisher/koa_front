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
