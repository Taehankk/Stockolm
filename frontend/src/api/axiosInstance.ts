import axios from "axios";

const baseURL = "https://j11b201.p.ssafy.io/api/v1";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
