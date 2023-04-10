import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { apiService } from "./api/apiService";
import { debounce } from "../utils/helpers";
import { persistState, loadPersistedState } from "./persisted-store";
import { searchReducer } from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  preloadedState: {
    auth: {
      token: loadPersistedState().auth.token,
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

store.subscribe(
  debounce(() => {
    persistState(store.getState());
  }, 900)
);
