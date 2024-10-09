import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getChartData,
  getStockInfo,
  getBestAnalysts,
  getFollowStatus,
} from "../api/stockAPI";

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

interface Analyst {
  analystName: string;
  analystNickname: string;
  userImagePath: string;
  reliability: number;
  accuracy: number;
  analystBoardId: number;
  goalDate: string;
  opinion: string;
  goalStock: string;
}

interface StockState {
  searchTerm: string;
  searchCode: string;
  stockId: string;
  bestAnalysts: Analyst[];
  stockData: StockDataItem[];
  stockInfo: StockInfo | null;
  isFollow: boolean;
  isFollowed: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: StockState = {
  searchTerm: "삼성전자",
  searchCode: "005930",
  stockId: "764",
  stockData: [],
  bestAnalysts: [],
  stockInfo: null,
  isFollow: false,
  isFollowed: false,
  loading: false,
  error: null,
};

export const fetchStockData = createAsyncThunk(
  "stock/fetchStockData",
  async (searchTerm: string) => {
    const response = await getChartData(searchTerm);
    return response;
  }
);

export const fetchStockInfo = createAsyncThunk(
  "stock/fetchStockInfo",
  async (stockCode: string) => {
    const response = await getStockInfo(stockCode);
    return response;
  }
);

export const fetchBestAnalysts = createAsyncThunk(
  "stock/fetchBestAnalysts",
  async (stockId: string) => {
    const response = await getBestAnalysts(stockId);
    return response;
  }
);

export const fetchFollowStatus = createAsyncThunk(
  "stock/fetchFollowStatus",
  async (searchTerm: string) => {
    const isFollowed = await getFollowStatus(searchTerm);
    return isFollowed;
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
      state.searchCode = action.payload;
    },
    setStockId: (state, action: PayloadAction<string>) => {
      state.stockId = action.payload;
    },
    updateFollowStatus: (state, action: PayloadAction<boolean>) => {
      state.isFollowed = action.payload;
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
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "주식 데이터 호출 실패";
      })
      .addCase(fetchStockInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.stockInfo = action.payload;
      })
      .addCase(fetchStockInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "주식 정보 호출 실패";
      })
      .addCase(fetchBestAnalysts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBestAnalysts.fulfilled, (state, action) => {
        state.loading = false;
        state.bestAnalysts = action.payload;
      })
      .addCase(fetchBestAnalysts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "베스트 애널리스트 데이터 호출 실패";
      })
      .addCase(fetchFollowStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isFollowed = action.payload;
      })
      .addCase(fetchFollowStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "관심 종목 상태 호출 실패";
      });
  },
});

export const { setSearchTerm, setSearchCode, setStockId, updateFollowStatus } =
  stockSlice.actions;
export default stockSlice.reducer;
