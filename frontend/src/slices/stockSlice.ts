import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getChartData, getStockInfo } from "../api/stockAPI";

interface StockDataItem {
  stockDate: string;
  stockStartValue: number;
  stockHigh: number;
  stockLow: number;
  stockEndValue: number;
}

interface StockInfo {
  corpCode: string;
  corpName: string;
  stockCode: string;
  ceoName: string;
  address: string;
  url: string;
  phoneNumber: string;
  faxNumber: string;
  cpta: string;
  papr: string;
  bps: string;
  eps: string;
  roeVal: string;
  ntinInrt: string;
  bsopPrfiInrt: string;
  grs: string;
}

interface StockState {
  searchTerm: string;
  searchCode: string;
  stockData: StockDataItem[];
  stockInfo: StockInfo | null;
  isFollow: boolean;
  loading: boolean;
  error: string | null;
}
// 초기 상태 정의
const initialState: StockState = {
  searchTerm: "삼성전자",
  searchCode: "005930",
  stockData: [],
  stockInfo: null,
  isFollow: false,
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

export const fetchStockInfo = createAsyncThunk(
  "stock/fetchStockInfo",
  async (stockCode: string) => {
    const response = await getStockInfo(stockCode);
    console.log("주식정보 호출 했니?", response);
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
    updateFollowStatus: (state, action: PayloadAction<boolean>) => {
      state.isFollow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.isFollow = action.payload.isFollow;
        state.stockData = action.payload.stockData;
        console.log("slice에 stock데이터 담겼는지 확인", action.payload);
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "주식 데이터 호출 실패";
      })
      .addCase(fetchStockInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockInfo.fulfilled, (state, action) => {
        console.log("주식정보", action.payload);
        state.loading = false;
        state.stockInfo = action.payload; // 받아온 회사 및 투자 정보를 저장
      })
      .addCase(fetchStockInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "주식 정보 호출 실패";
      });
  },
});

export const { setSearchTerm, setSearchCode, updateFollowStatus } =
  stockSlice.actions;
export default stockSlice.reducer;
