import axiosTokenInstance from "./axiosTokenInstance";

export const fetchAnalystInfo = async (userNickName: string) => {
    try {
      const response = await axiosTokenInstance.get(
        `/analyst/${userNickName}`,
        {
            params: { "user-nickname": userNickName },
        },
      );
      console.log(response);
      return response.data;

    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;

    }
}

export const postAnalystFollow = async (nickname: string) => {
    try {
      const response = await axiosTokenInstance .post(
        '/user/follow',
        {
          userNickname: nickname, 
        }
      );

      return response.data;

    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
    }
}

export const patchRepresentWrite = async (analystBoardId: number) => {
    try {
      const response = await axiosTokenInstance.patch(
        `/analyst-board/main-content/${analystBoardId}`,
        {
            analystBoardId, 
        }
      );
      console.log(response)
      return response.data;

    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
    }
}

export const fetchAnalystBoard = async (page?: number, size?: number, userNickName?: string) => {
  try {
    const response = await axiosTokenInstance.get(
      'analyst-board',
      {
        params: { "page": page, "size": size, "searchAnalyst": userNickName },
      },
    );

    console.log(response);
    return response.data;

  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}

export const fetchAnalystKeywordBoard = async (page?: number, size?: number, keyword?: string, userNickName?: string) => {
  try {
    console.log(keyword)
    const response = await axiosTokenInstance.get(
      'analyst-board',
      {
        params: { "page": page, "size": size, "stockName": keyword, "searchAnalyst": userNickName },
      },
    );

    console.log(response);
    return response.data;

  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}

export const fetchAnalystNameBoard = async (userNickName: string) => {
  try {
    const response = await axiosTokenInstance.get(
      'analyst-board',
      {
        params: {"searchAnalyst": userNickName },
      },
    );

    console.log(response);
    return response.data;

  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}