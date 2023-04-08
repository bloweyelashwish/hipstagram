import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearQuery: (state) => {
      state.query = "";
    },
  },
});

export const { setQuery, clearQuery } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

export const selectCurrentSearchQuery = (state) => state.search.query;
