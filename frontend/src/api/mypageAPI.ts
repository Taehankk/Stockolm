import axios from "axios";
import axiosTokenInstance from "./axiosTokenInstance";

const appkey = import.meta.env.VITE_STOCK_APP_KEY;
const appsecret = import.meta.env.VITE_STOCK_APP_SECRET;
const accessToken = import.meta.env.VITE_STOCK_ACCESS_TOKEN;

interface Stock {
  stockCode: string, 
  stockName: string,
}

interface Analyst {
    userName: string;
    userNickName: string;
    userImagePath: string;
    accuracy: number;
    reliability: number;
    totalAnalystRanking: number;
}

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

export const fetchUser = async () => {
    try {
      const response = await axiosTokenInstance.get(
        '/user/info'
      );

      console.log(response.data);
      return response.data;

    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;

    }
}

export const fetchFavoriteAnalysts = async (): Promise<Analyst[]> => {
    try {
      const response = await axiosTokenInstance.get(
        '/follow/analysts'
      );

      console.log(response);
      return response.data;

    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;

    }
}

export const fetchFavoriteStock = async (): Promise<Stock[]> => {
    try {
      const response = await axiosTokenInstance.get(
        '/stock/follow-stocks'
      );

      console.log(response.data);
      return response.data;

    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;

    }
}

export const fetchAnalyzeStock = async () => {
    try {
      const response = await axiosTokenInstance.get(
        '/stock/analyzed-stock'
      );

      console.log(response.data); 
      return response.data;

    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;

    }
}

export const fetchFavoriteBoard = async (stockName:string) => {
    try {
      const response = await axiosTokenInstance.get(
        '/analyst-board/like',
        {
          params: { "stockName": stockName},
        },
      );

      console.log(response.data);
      return response.data;

    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;

    }
}

export const patchPassword = async (newPassword: string) => {
    try {
      const response = await axiosTokenInstance.patch(
        '/user/update-password',
        {
          newPassword,
        }
      );

      return response;

    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;

    }
}

export const patchNickname = async (newNickname: string) => {
    try {
        console.log(newNickname)
      const response = await axiosTokenInstance.patch(
        '/user/nickname',
        {
          userNickname: newNickname,
        }
      );

      console.log(response);
      return response;

    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;

    }
}

export const postProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosTokenInstance.post(
      '/upload/user-image',
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response;

  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};