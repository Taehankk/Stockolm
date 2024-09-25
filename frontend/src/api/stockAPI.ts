import axios from "axios";

const appkey = import.meta.env.VITE_STOCK_APP_KEY;
const appsecret = import.meta.env.VITE_STOCK_APP_SECRET;
const accessToken = import.meta.env.VITE_STOCK_ACCESS_TOKEN;

export const getStockData = async (mockCode: string) => {
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
          FID_INPUT_ISCD: `${mockCode}`,
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
  // const token = "YOUR_JWT_ACCESS_TOKEN";

  try {
    const response = await axios.get(`/api/v1/stock/${stockName}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    console.log(stockName);
    console.log("chart정보 요청 : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};
