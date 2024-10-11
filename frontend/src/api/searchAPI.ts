import axios from "axios";

const baseURL = "https://j11b201.p.ssafy.io/api/v1";
const getToken = () => sessionStorage.getItem("access_token");

export interface StockItem {
  recentStockName?: string;
  recentStockCode?: string;
  recentStockId?: string;
  hotStockName?: string;
  hotStockCode?: string;
  hotStockId?: string;
  stockName?: string;
  stockCode?: string;
  stockId?: string;
}

export interface SearchListResponse {
  recentStockList: StockItem[];
  hotStockList: StockItem[];
}

export interface SearchResultItem {
  stockName: string;
  stockCode: string;
  stockId: string;
}

// 검색시 검색어 관련 호출
export const getSearchResults = async (
  keyword: string
): Promise<SearchResultItem[]> => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const response = await axios.get<SearchResultItem[]>(
      `${baseURL}/stock/search-result/${keyword}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

export const getSearchList = async (): Promise<SearchListResponse> => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const response = await axios.get<SearchListResponse>(
      `${baseURL}/stock/search-list`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search list:", error);
    throw error;
  }
};

export const searchCountAPI = async (stockName: string): Promise<void> => {
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  await axios.post(
    `${baseURL}/stock/search/${stockName}`,
    {},
    {
      headers,
    }
  );
};
