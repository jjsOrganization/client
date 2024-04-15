import Cookies from "js-cookie";
import axios from "axios";

/**
 * @description Axios 인스턴스를 생성
 * 목적 : axios 요청 시 header에 token을 보내기 위함
 */

const instance = axios.create({
  baseURL: "http://3.38.128.50:8080/",
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken"); // Cookies를 이용해 accessToken을 가져옵니다.

    try {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    } catch (err) {
      console.error("[_axios.interceptors.request] config : " + err.message);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

export default instance;