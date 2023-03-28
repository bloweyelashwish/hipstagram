import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_PREFIX } from "../../globals";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logout: (state) => {
      localStorage.removeItem(STORAGE_PREFIX + "token");
      state.token = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectToken = (state) => state.auth.token;
