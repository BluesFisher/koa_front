import axios from "@/plugins/http";
import store from "@/store";
import Vue from "vue";
import * as crypt from "./crypt";

export const getUrlKey = (name: string, url: string = location.href) => {
  if (!url) {
    return "";
  }

  return decodeURIComponent(
    (
      (new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(url) || [, ""])[1] ||
      ""
    ).replace(/\+/g, "%20")
  );
};

export const getCsrfToken = async () => {
  try {
    const { data = {} } = await axios.get({
      url: "/getBaseInfo"
    });

    store.dispatch("auth/setCsrfToken", {
      csrfToken: data.csrfToken || ""
    });
  } catch (error) {
    // TODO
  }
};

export const judgeRedirect = (code: number) => {
  let redirect = getUrlKey("redirect");

  if (code === 0 && redirect) {
    const char = redirect.includes("?") ? "&" : "?";
    const token = Vue.prototype.$cookies.get("token") || "";
    redirect = `${redirect}${char}token=${crypt.encrypt(token)}`;
    console.log("login", redirect);
  }

  if (redirect) {
    location.href = redirect;
  }

  return;
};
