import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface UserState {
  id: number | null;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  password: string | null;
  wallet: number;
}

const initialState: UserState = {
  id: null,
  username: null,
  firstname: null,
  lastname: null,
  password: null,
  wallet: 1000,
};

interface UserStatePayload {
  id: number | null;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  password: string | null;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<UserStatePayload>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.password = action.payload.password;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.id = null;
      state.username = null;
      localStorage.removeItem("user");
    },
    updateWallet: (state, action: PayloadAction<number>) => {
      if (state.wallet !== null) state.wallet = state.wallet - action.payload;
    },
  },
});

export const { registerSuccess, logout, updateWallet } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
