import { configureStore } from "@reduxjs/toolkit";
import stockSlice from "./slices/stockSlice";
import searchSlice from "./slices/searchSlice";
import rankingSlice from "./slices/rankingSlice";

export const store = configureStore({
  reducer: {
    stock: stockSlice,
    search: searchSlice,
    rankings: rankingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch } from "react-redux";
export const useAppDispatch: () => AppDispatch = useDispatch;
