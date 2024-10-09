import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRankings } from "../api/rankingAPI";

interface RankingItem {
  userName: string;
  userNickname: string;
  userImagePath: string;
  totalAnalystRanking: number;
  totalAnalystScore: number;
  totalBoardSize: number;
  reliability: number;
  accuracy: number;
}

interface RankingResponse {
  content: RankingItem[];
  totalPages: number;
  totalElements: number;
}

interface RankingState {
  rankings: RankingItem[]; // rankings는 RankingItem 배열로 정의
  totalPages: number;
  totalElements: number;
  loading: boolean;
  error: string | null; // error는 문자열 또는 null로 정의
}

const initialState: RankingState = {
  rankings: [],
  totalPages: 0,
  totalElements: 0,
  loading: false,
  error: null,
};

export const getRankings = createAsyncThunk<
  RankingResponse,
  {
    rankValue: string | null;
    page: number;
    size: number;
    sort: string | null;
    analystName?: string;
  },
  { rejectValue: string }
>(
  "rankings/fetchRankings",
  async ({ rankValue, page, size, sort, analystName }, thunkAPI) => {
    try {
      const data = await fetchRankings(
        rankValue,
        page,
        size,
        sort,
        analystName
      );
      console.log("받아오는 ranking", data);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

const rankingSlice = createSlice({
  name: "rankings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRankings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRankings.fulfilled, (state, action) => {
        state.rankings = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
        state.loading = false;
      })
      .addCase(getRankings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default rankingSlice.reducer;
