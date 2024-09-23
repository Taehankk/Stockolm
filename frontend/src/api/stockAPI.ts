import axios from "axios";

const appkey = "";
const appsecret = "";
const accessToken = "";

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