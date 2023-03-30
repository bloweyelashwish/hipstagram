import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "./contexts/theme";
import { useCurrentUserQuery } from "./features/users/usersApiSlice";

import "./App.css";
import { AppRoutes } from "./routes/Routes";
import { setUser, logout, setLoadingState } from "./features/auth/authSlice";
import { Loader } from "./components/ui/Loader/Loader";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
};

export default App;
