import Axios from "./http";
import MtaH5 from "./mta";
import TimeReport from "./timeReport";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";
import VueCookies from "vue-cookies";
import * as utils from "@/utils";

declare module "vue/types/vue" {
  interface Vue {
    $axios: any;
    $mtaH5: any;
    $timeReport: any;
    $utils: any;
  }
}

const MyPlugin = {
  install: async (Vue: any, options: any) => {
    // 1. 添加全局方法或属性
    // Vue.myGlobalMethod = function () {
    //   // 逻辑...
    // }

    // 2. 添加全局资源
    // Vue.directive('my-directive', {
    //   bind (el, binding, vnode, oldVnode) {
    //     // 逻辑...
    //   }
    //   ...
    // })

    // 3. 注入组件选项
    // Vue.mixin({
    //   created: function () {
    //     // 逻辑...
    //   }
    //   ...
    // })

    // 4. 添加实例方法
    Vue.prototype.$axios = Axios;
    Vue.prototype.$cookies = VueCookies;

    const res = await Axios.get({ url: "/static/config.json" });

    Vue.prototype.$mtaH5 = MtaH5(res);
    Vue.prototype.$timeReport = TimeReport(res);
    Vue.prototype.$utils = utils;

    // 5. 错误处理
    // sentry
    Raven.config("https://ee6cb8d5cbe14d399a59168a00bfe778@sentry.io/1499372", {
      release: "h5@0.1.0" // 版本号与vue.config.js的一致
    })
      .addPlugin(RavenVue, Vue)
      .install();
    Raven.setTagsContext({
      appId: "123456789"
    });
    Vue.config.errorHandler = (err: any /*, vm, info*/) => {
      Raven.captureException(err);
    };
  }
};

export default MyPlugin;
