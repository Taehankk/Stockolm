import axios from "axios";

const baseURL = "https://j11b201.p.ssafy.io/api/v1";

const axiosTokenInstance = axios.create({
  baseURL: baseURL,
});

axiosTokenInstance.interceptors.request.use(
  async (config) => {
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
    if (error.response && !originalRequest._retry) {
      originalRequest._retry = true;

      // 새로운 access_token을 세션에서 가져옴
      const newToken = sessionStorage.getItem("access_token");

      if (newToken) {
        originalRequest.headers["Authorization"] = "Bearer " + newToken;

        return axiosTokenInstance(originalRequest); // 원래의 요청 재시도
      } else {
        return Promise.reject(error); // 새로운 토큰이 없으면 에러 반환
      }
    }

    return Promise.reject(error);
  }
);

export default axiosTokenInstance;
