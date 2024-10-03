import axiosTokenInstance from "./axiosTokenInstance";

export const fetchAnalystInfo = async (userNickName: string) => {
    try {
      const response = await axiosTokenInstance.get(
        `/analyst/${userNickName}`,
        {
            params: { "user-nickname": userNickName },
        },
      );

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

      console.log(response.data);
      return response.data;

    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
    }
}