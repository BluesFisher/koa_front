import axios from "./http";
import router from "@/router";
import * as utils from "@/utils";

interface ICommonParams {
  url?: string;
  callback?: (result: any) => {};
}

interface IGetParams extends ICommonParams {
  config?: object;
}

interface IPostParams extends ICommonParams {
  data?: object | string;
}

const Axios = {
  get: async ({ url = "", config = {}, callback }: IGetParams) => {
    try {
      const res = await axios.get(url, config);

      if (res.status === 200) {
        const result = res.data;
        // tslint:disable-next-line:no-unused-expression
        callback && callback(result);
        return result;
      }

      return null;
    } catch (error) {
      console.log("get catch error: " + error);
    }
  },
  post: async ({ url = "", data, callback }: IPostParams) => {
    if (typeof data === "string") {
      data = JSON.stringify(data);
    }
    try {
      const res = (await axios.post(url, data)) || {};
      if (res && res.status === 200) {
        const result = res.data;
        // tslint:disable-next-line:no-unused-expression
        callback && callback(result);
        return result;
      }

      return null;
    } catch (error) {
      console.log("post catch error: ", error);

      if (error.status === 401) {
        if (!location.href.includes("cas")) {
          let redirectUrl = location.href;
          const token = utils.commonFunc.getUrlKey("token");
          if (token) {
            redirectUrl = redirectUrl
              .replace(`token=${token}`, "")
              .replace(/(\?|&)$/, "");
          }
          location.href = `http://cas.test.com:8080/login?redirect=${encodeURIComponent(
            redirectUrl
          )}`;
        } else {
          const redirect = utils.commonFunc.getUrlKey("redirect");
          router.push({ path: `/login?redirect=${redirect}` });
        }
      } else {
        location.href = "/";
      }
    }
  }
};

export default Axios;
