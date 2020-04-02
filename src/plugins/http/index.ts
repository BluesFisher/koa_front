import axios from "./http";
import router from "@/router";

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
      const res = await axios.post(url, data);
      if (res.status === 200) {
        const result = res.data;
        // tslint:disable-next-line:no-unused-expression
        callback && callback(result);
        return result;
      }

      return null;
    } catch (error) {
      console.log("post catch error: ", error);
      if (error.code === 401) {
        router.push({ path: "/login" });
      } else {
        location.href = "/";
      }
    }
  }
};

export default Axios;
