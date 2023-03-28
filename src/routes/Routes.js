import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "../routes";
import { AuthenticationLayout } from "../components/layout/authentication";
import { Login, Registration } from "../pages/authentication";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/feed"
        element={
          <PrivateRoute>
            <p>Feed</p>
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AuthenticationLayout>
            <Login />
          </AuthenticationLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthenticationLayout>
            <Registration />
          </AuthenticationLayout>
        }
      />
    </Routes>
  );
};
