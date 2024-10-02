import axiosInstance from "./axiosTokenInstance";

export interface StockItem {
  recentStockName?: string;
  recentStockCode?: string;
  hotStockName?: string;
  hotStockCode?: string;
  stockName?: string;
  stockCode?: string;
}

export interface SearchListResponse {
  recentStockList: StockItem[];
  hotStockList: StockItem[];
}

export interface SearchResultItem {
  stockName: string;
  stockCode: string;
}

// 검색시 검색어 관련 호출
export const getSearchResults = async (
  keyword: string
): Promise<SearchResultItem[]> => {
  try {
    const response = await axiosInstance.get<SearchResultItem[]>(
      // `/api/v1/stock/search-result/${keyword}`
      `/stock/search-result/${keyword}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

export const getSearchList = async (): Promise<SearchListResponse> => {
  try {
    const response = await axiosInstance.get<SearchListResponse>(
      "/stock/search-list"
      // "/api/v1/stock/search-list"
      //   {
      //     headers: {
      //       Authorization: `Bearer ${}`, // 실제 JWT 토큰으로 대체하세요.
      //     },
      //   }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search list:", error);
    throw error;
  }
};
