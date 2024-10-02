import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

// 1. InternalAxiosRequestConfig 타입을 확장하여 authRequired 속성을 추가
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retry?: boolean;
}

const baseURL = "https://j11b201.p.ssafy.io/api/v1";

const axiosTokenInstance = axios.create({
  baseURL: baseURL,
});

axiosTokenInstance.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    const token = sessionStorage.getItem("access_token");
    config.headers["Authorization"] = "Bearer " + token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosTokenInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest.authRequired &&
      !originalRequest.retry
    ) {
      const cookies = new Cookies();

      originalRequest.retry = true;

      try {
        const { data } = await axios.post(`${baseURL}/user/refresh-token`, {
          refreshToken: cookies.get("refresh_token"),
        });

        const newAccessToken = data.headers.authorization;
        sessionStorage.setItem("access_token", newAccessToken);

        // 새로 발급된 토큰으로 다시 요청
        originalRequest.headers["Authorization"] = `${newAccessToken}`;
        return axiosTokenInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosTokenInstance;
