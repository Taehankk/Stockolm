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
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosTokenInstance;
