import axios from "@/plugins/http";
import store from "@/store";
import Vue from "vue";
import * as crypt from "./crypt";

export const getUrlKey = (name: string) => {
  if (!location.href) {
    return "";
  }

  return decodeURIComponent(
    (
      (new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(location.href) || [
        ,
        ""
      ])[1] || ""
    ).replace(/\+/g, "%20")
  );
};

export const getCsrfToken = async () => {
  const { data = {} } = await axios.get({
    url: "/getBaseInfo"
  });

  store.dispatch("auth/setCsrfToken", {
    csrfToken: data.csrfToken || ""
  });
};

export const judgeRedirect = (code: number) => {
  let redirect = "";

  if (code === 0 && localStorage.cas_redirect) {
    const char = localStorage.cas_redirect.includes("?") ? "&" : "?";
    const token = Vue.prototype.$cookies.get("token") || "";
    redirect = `${localStorage.cas_redirect}${char}token=${crypt.encrypt(
      token
    )}`;
    console.log("login", redirect);
  }

  if (redirect) {
    location.href = redirect;
  }

  return;
};
