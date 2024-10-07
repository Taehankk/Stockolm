import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

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
    config.withCredentials = true;
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
      !originalRequest.retry
    ) {
      const cookies = new Cookies();

      originalRequest.retry = true;

      try {
        const { data } = await axios.post(
          `${baseURL}/user/refresh-token`,
          {
            refreshToken: cookies.get("refreshToken"),
          },
          {
            withCredentials: true,
          }
        );

        const newAccessToken = data.headers.authorization.replace(
          "Bearer ",
          ""
        );
        sessionStorage.setItem("access_token", newAccessToken);

        // 새로 발급된 토큰으로 다시 요청
        originalRequest.headers["Authorization"] =
          "Bearer " + `${newAccessToken}`;
        return axiosTokenInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        sessionStorage.clear();
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosTokenInstance;
