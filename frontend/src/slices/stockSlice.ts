import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getChartData } from "../api/stockAPI";

interface StockDataItem {
  stockDate: string;
  stockStartValue: number;
  stockHigh: number;
  stockLow: number;
  stockEndValue: number;
}

interface StockState {
  searchTerm: string;
  searchCode: string;
  stockData: StockDataItem[];
  loading: boolean;
  error: string | null;
}

// 초기 상태 정의
const initialState: StockState = {
  searchTerm: "삼성전자",
  searchCode: "005930",
  stockData: [],
  loading: false,
  error: null,
};

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
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSearchCode: (state, action: PayloadAction<string>) => {
      console.log("검색어 코드입력확인", action);
      state.searchCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.stockData = action.payload.stockData;
        console.log("slice에 stock데이터 담겼는지 확인", action.payload);
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "주식 데이터 호출 실패";
      });
  },
});

export const { setSearchTerm, setSearchCode } = stockSlice.actions;
export default stockSlice.reducer;
