import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes";
import { User, Feed } from "../pages/private/";
import { Login, Registration } from "../pages/authentication";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Navigate to="feed" replace />} />
        <Route path="feed" index element={<Feed />} />
        <Route path="user/:id" element={<User />} />
      </Route>
      <Route path="/" element={<PublicRoutes />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Registration />} />
      </Route>
    </Routes>
  );
};

/*
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
*/
