import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./contexts/theme";

import "./App.css";
import { AppRoutes } from "./routes/Routes";
import ErrorBoundary from "./ErrorBoundary";
import { loadPersistedState } from "./app/persisted-store";
import { useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function checkPersistedState() {
      const persistedState = loadPersistedState();
      if (!persistedState) {
        dispatch(logout());
      }
    }

    window.addEventListener("storage", checkPersistedState);

    return () => window.removeEventListener("storage", checkPersistedState);
  });

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <div className="App">
          <AppRoutes />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
