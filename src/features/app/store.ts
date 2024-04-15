import { configureStore } from "@reduxjs/toolkit";
import biddersReducer from "../services/biddersSlice";
import userReducer from "../services/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    bidders: biddersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
