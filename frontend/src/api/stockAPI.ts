import axios from "axios";
// import axiosInstance from "./axiosInstance";

const appkey = import.meta.env.VITE_STOCK_APP_KEY;
const appsecret = import.meta.env.VITE_STOCK_APP_SECRET;
const accessToken = import.meta.env.VITE_STOCK_ACCESS_TOKEN;
const token = sessionStorage.getItem("access_token");
const baseURL = "https://j11b201.p.ssafy.io/api/v1";

export const getStockData = async (stockCode: string) => {
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${accessToken}`,
    appkey: appkey,
    appsecret: appsecret,
    tr_id: "FHKST01010100",
  };

  try {
    const response = await axios.get(
      `/api/uapi/domestic-stock/v1/quotations/inquire-price`,
      {
        headers: headers,
        params: {
          FID_COND_MRKT_DIV_CODE: "J",
          FID_INPUT_ISCD: `${stockCode}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

export const getChartData = async (stockName: string) => {
  try {
    const response = await axios.get(`/api/v1/stock/${stockName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("chart정보 요청 : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

// 검색 리스트(최근 검색어/인기 검색어) 가져오는 API
export const getSearchList = async () => {
  const response = await axios.get("/api/v1/stock/search-list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 검색어 입력 시 결과를 가져오는 API
export const getSearchResults = async (searchTerm: string) => {
  const response = await axios.get(
    `/api/v1/stock/search-result/${searchTerm}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const toggleFollowAPI = async (stockName: string): Promise<void> => {
  console.log(token);
  await axios.post(
    `${baseURL}/stock/follow/${stockName}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("좋아요 버튼 호출완료");
};

export const getStockInfo = async (stockCode: string) => {
  try {
    const response = await axios.get(`/api/v1/stock/stock-info/${stockCode}`);
    console.log("주식정보 getStockInfo", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock info:", error);
    throw error;
  }
};
