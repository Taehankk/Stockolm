import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { getBoardAPI, writeBoardAPI } from "../api/communityAPI";

// 자유글 작성
interface Board {
  title: string;
  content: string;
  category: string;
}

// 게시글 데이터
interface BoardState {
  currentPage: number;
  userNickname: string;
  userImagePath: string;
  title: string;
  content: string;
  likeCnt: number;
  viewCnt: number;
  category: string;
  createAt: string;
  updateAt: string;
  isLike: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  currentPage: 1,
  userNickname: "",
  userImagePath: "",
  title: "",
  content: "",
  likeCnt: 0,
  viewCnt: 0,
  category: "",
  createAt: "",
  updateAt: "",
  isLike: false,
  loading: false,
  error: null,
};

export const postBoardData = createAsyncThunk(
  "board/postBoardData",
  async (board: Board) => {
    const response = await writeBoardAPI(board);
    return response;
  }
);

export const getBoardData = createAsyncThunk(
  "board/getBoardData",
  async (boardId: string) => {
    const token = sessionStorage.getItem("access_token");
    const response = await getBoardAPI(token, boardId);
    return response;
  }
);

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setBoardTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setBoardContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postBoardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postBoardData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postBoardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "게시글 저장 실패";
      })
      .addCase(getBoardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoardData.fulfilled, (state, action) => {
        state.loading = false;
        state.userNickname = action.payload.userNickname;
        state.userImagePath = action.payload.userImagePath;
        state.title = action.payload.title;
        state.content = action.payload.content;
        state.likeCnt = action.payload.likeCnt;
        state.viewCnt = action.payload.viewCnt;
        state.category = action.payload.category;
        state.createAt = action.payload.createAt;
        state.updateAt = action.payload.updateAt;
        state.isLike = action.payload.isLike;
      })
      .addCase(getBoardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "게시글 가져오기 실패";
      });
  },
});

export const { setCurrentPage, setBoardTitle, setBoardContent } =
  boardSlice.actions;
export default boardSlice.reducer;
