import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { apiService } from "./api/apiService";
import { debounce } from "../utils/helpers";
import { persistState, loadPersistedState } from "./persisted-store";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  preloadedState: loadPersistedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

store.subscribe(
  debounce(() => {
    persistState(store.getState());
  }, 900)
);
