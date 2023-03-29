import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { STORAGE_PREFIX } from "../globals";
import { apiService } from "./api/apiService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  preloadedState: {
    auth: {
      token: localStorage.getItem(STORAGE_PREFIX + "token"),
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
