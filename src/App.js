import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useCurrentUserQuery } from "./features/users/usersApiSlice";
import { useDispatch } from "react-redux";
import { theme } from "./contexts/theme";

import "./App.css";
import { AppRoutes } from "./routes/Routes";
import { setUser, logout, setLoadingState } from "./features/auth/authSlice";
import { Loader } from "./components/ui/Loader/Loader";

const App = () => {
  const { data, isLoading, isSuccess, isError } = useCurrentUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      dispatch(logout());
      return;
    }

    if (isLoading) {
      dispatch(setLoadingState({ loading: true }));
    }

    if (isSuccess && !isLoading) {
      dispatch(setLoadingState({ loading: false }));
      dispatch(setUser({ user: data }));
    }
  }, [data, dispatch, isError, isLoading, isSuccess]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
};

export default App;
