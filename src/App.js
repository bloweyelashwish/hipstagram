import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./contexts/theme";

import "./App.css";
import { AppRoutes } from "./routes/Routes";
// import { useDispatch, useSelector } from "react-redux";
// import { useCurrentUserQuery } from "./features/users/usersApiService";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
