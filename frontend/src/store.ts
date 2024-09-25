import { configureStore } from "@reduxjs/toolkit";
import stockSlice from "./slices/stockSlice";

export const store = configureStore({
  reducer: {
    stock: stockSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch } from "react-redux";
export const useAppDispatch: () => AppDispatch = useDispatch;
