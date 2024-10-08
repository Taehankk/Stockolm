// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getReportAPI } from "../api/communityAPI";
//
// 분석글 작성
// interface Report {
//   title: string;
//   content: string;
//   stockName: string;
//   opinion: string;
//   goalStock: number;
//   currentStock: number;
//   marketCapitalization: number;
//   goalDate: Date;
// }

// 분석글 데이터
interface ReportState {
  currentPage: number;
  analystBoardId: number;
  stockName: string;
  title: string;
  userName: string; // 애널리스트 실명
  userNickname: string;
  userImagePath: string;
  opinion: string; // 투자의견
  goalStock: number; // 목표주가
  currentStock: number; // 현재주가
  marketCapitalization: number; // 시가총액
  content: string; // 요약 내용
  goalDate: string;
  filePath: string; // S3 서버 내 리포트 파일 경로
  likeCnt: number;
  viewCnt: number;
  createAt: string;
  updateAt: string;
  isLike: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  currentPage: 1,
  analystBoardId: 0,
  stockName: "PDF 파일을 업로드 해주세요.",
  title: "",
  userName: "", // 애널리스트 실명
  userNickname: "",
  userImagePath: "",
  opinion: "", // 투자의견
  goalStock: 0, // 목표주가
  currentStock: 0, // 현재주가
  marketCapitalization: 0, // 시가총액
  content: "", // 요약 내용
  goalDate: "",
  filePath: "", // S3 서버 내 리포트 파일 경로
  likeCnt: 0,
  viewCnt: 0,
  createAt: "",
  updateAt: "",
  isLike: false,
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setStockName: (state, action: PayloadAction<string>) => {
      state.stockName = action.payload;
    },
    setReportTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setReportContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setOpinion: (state, action: PayloadAction<string>) => {
      state.opinion = action.payload;
    },
    setGoalStock: (state, action: PayloadAction<number>) => {
      state.goalStock = action.payload;
    },
    setCurrentStock: (state, action: PayloadAction<number>) => {
      state.currentStock = action.payload;
    },
    setMarketCapitalization: (state, action: PayloadAction<number>) => {
      state.marketCapitalization = action.payload;
    },
    setGoalDate: (state, action: PayloadAction<string>) => {
      state.goalDate = action.payload;
    },
    setFilePath: (state, action: PayloadAction<string>) => {
      state.filePath = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setStockName,
  setReportTitle,
  setReportContent,
  setCurrentStock,
  setGoalDate,
  setGoalStock,
  setMarketCapitalization,
  setOpinion,
  setFilePath,
} = reportSlice.actions;
export default reportSlice.reducer;
