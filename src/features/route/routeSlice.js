import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "route",
  initialState: {
    activeRouteTitle: "",
  },
  reducers: {
    setActiveRouteTitle: (state, action) => {
      state.activeRouteTitle = action.payload;
    },
  },
});

export const { setActiveRouteTitle } = routeSlice.actions;
export const routeReducer = routeSlice.reducer;

export const selectActiveRouteTitle = (state) => state.route.activeRouteTitle;
