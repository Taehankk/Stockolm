import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChartData } from "../api/stockAPI";

// 비동기 API 요청
export const fetchStockData = createAsyncThunk(
  "stock/fetchStockData",
  async (searchTerm: string) => {
    const response = await getChartData(searchTerm);
    console.log("fetchStockData 결과:", response);
    return response;
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    // 검색없이 일단 기본값 넣어둠 << 나중에 "" 으로 변경
    searchTerm: "삼성전자",
    stockData: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.stockData = action.payload;
        console.log("slice에 stock데이터 담겼는지 확인", action.payload);
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm } = stockSlice.actions;
export default stockSlice.reducer;
