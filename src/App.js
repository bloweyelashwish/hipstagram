import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./contexts/theme";

import "./App.css";
import { AppRoutes } from "./routes/Routes";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
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
