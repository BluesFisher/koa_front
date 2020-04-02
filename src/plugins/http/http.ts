import axios from "axios";
import Vue from "vue";
import store from "@/store";
import router from "@/router";

const instance = axios.create({
  headers: {
    "content-type": "application/json;charset=UTF-8",
    authorization: "",
    "csrf-token": ""
  },
  baseURL:
    process.env.NODE_ENV === "production" ? "" : "http://cas.test.com:3000",
  timeout: 5000,
  withCredentials: true
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做某事，比如说 设置token
    if (config.url && config.url.startsWith("/static")) {
      config.baseURL = "/";
    } else {
      //   config.baseURL = `http://${location.host.split(":")[0]}:3000`;
    }

    config.headers = {
      ...config.headers,
      authorization: `Bearer ${Vue.prototype.$cookies.get("token")}`,
      "csrf-token": store.state.auth.csrfToken || ""
    };

    return config;
  },
  error => {
    // 请求错误时做些事
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做些事
    const status = response.status;
    if (status === 200) {
      const result = response.data;
      if (result.code === 304 && result.url) {
        router.replace({ path: result.url });
      }
    }
    return response;
  },
  error => {
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);

export default instance;
