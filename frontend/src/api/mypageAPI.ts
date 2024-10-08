import axiosTokenInstance from "./axiosTokenInstance";

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
    const response = await axiosTokenInstance.post(
      '/upload/user-image',
      {
        file: file, // multipart/form-data 형식으로 전송
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;

  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};