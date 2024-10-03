import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from '../api/mypageAPI';

interface UserState {
  userName: string;
  userNickName: string;
  userImagePath: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userName: "",
  userNickName: "",
  userImagePath: "",
  loading: false,
  error: null,
};

export const getUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async () => {
    const data = await fetchUser();
    return data; 
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.loading = false;
        state.userNickName = action.payload.userNickName;
        state.userImagePath = action.payload.userImagePath;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '유저 정보를 가져오지 못했습니다.';
      });
  },
});

export default userSlice.reducer;
