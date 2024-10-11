import axios from "axios";

// const appkey = import.meta.env.VITE_STOCK_APP_KEY;
// const appsecret = import.meta.env.VITE_STOCK_APP_SECRET;
// const accessToken = import.meta.env.VITE_STOCK_ACCESS_TOKEN;
const baseURL = "https://j11b201.p.ssafy.io/api/v1";

const getToken = () => sessionStorage.getItem("access_token");

export const getStockData = async (stockCode: string) => {
  // const headers = {
  //   "Content-Type": "application/json",
  //   authorization: `Bearer ${accessToken}`,
  //   appkey: appkey,
  //   appsecret: appsecret,
  //   tr_id: "FHKST01010100",
  // };

  try {
    const response = await axios.get(
      // `/api/uapi/domestic-stock/v1/quotations/inquire-price`,
      `${baseURL}/stock/inquire-price/${stockCode}`
      // {
      //   headers: headers,
      //   params: {
      //     FID_COND_MRKT_DIV_CODE: "J",
      //     FID_INPUT_ISCD: `${stockCode}`,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

export const getFollowStatus = async (stockName: string): Promise<boolean> => {
  const token = getToken();
  try {
    const response = await axios.get(`${baseURL}/stock/follow/${stockName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.isFollowed;
  } catch (error) {
    console.error("비로그인시 follow호출안함", error);
    throw error;
  }
};

export const getChartData = async (stockName: string) => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const response = await axios.get(`${baseURL}/stock/${stockName}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

// 검색 리스트(최근 검색어/인기 검색어) 가져오는 API
export const getSearchList = async () => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.get(`${baseURL}/stock/search-list`, {
    headers,
  });
  return response.data;
};

// 검색어 입력 시 결과를 가져오는 API
export const getSearchResults = async (searchTerm: string) => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.get(
    `${baseURL}/stock/search-result/${searchTerm}`,
    {
      headers,
    }
  );
  return response.data;
};

export const getBestAnalysts = async (stockId: string) => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const response = await axios.get(`${baseURL}/stock/rank/${stockId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching best analysts:", error);
    throw error;
  }
};

export const toggleFollowAPI = async (stockName: string): Promise<void> => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  await axios.post(
    `${baseURL}/stock/follow/${stockName}`,
    {},
    {
      headers,
    }
  );
};

export const getStockInfo = async (stockCode: string) => {
  try {
    const response = await axios.get(
      `${baseURL}/stock/stock-info/${stockCode}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock info:", error);
    throw error;
  }
};

export const getMinuteChartData = async (stockCode: string) => {
  const headers = {};
  const response = await axios.get(`${baseURL}/stock/time-chart/${stockCode}`, {
    headers,
  });
  return response.data;
};
