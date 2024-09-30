// redux/searchSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSearchList,
  getSearchResults,
  StockItem,
  SearchResultItem,
} from "../api/searchAPI";

interface SearchState {
  recentStockList: StockItem[];
  hotStockList: StockItem[];
  searchResults: SearchResultItem[];
  loading: boolean;
  error: string | null;
}
const initialState: SearchState = {
  recentStockList: [],
  hotStockList: [],
  searchResults: [],
  loading: false,
  error: null,
};
export const fetchSearchList = createAsyncThunk(
  "search/fetchSearchList",
  async () => {
    const response = await getSearchList();
    return response;
  }
);

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (keyword: string) => {
    const response = await getSearchResults(keyword);
    return response;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 인기/최근 검색어
      .addCase(fetchSearchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchList.fulfilled, (state, action) => {
        state.loading = false;
        state.recentStockList = action.payload.recentStockList;
        state.hotStockList = action.payload.hotStockList;
        console.log(state.hotStockList);
      })
      .addCase(fetchSearchList.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch popular/recent searches";
      })
      // 검색 결과
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.searchResults = []; // 이전 검색 결과 초기화
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch search results";
      });
  },
});

export default searchSlice.reducer;
