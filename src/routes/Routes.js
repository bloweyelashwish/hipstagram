import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes";
import { User, Feed } from "../pages/private/";
import { Login, Registration } from "../pages/authentication";
import { Search } from "../pages/private/Search";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Navigate to="feed" replace />} />
        <Route path="feed" index element={<Feed />} />
        <Route path="user/:id" element={<User />} />
        <Route path="settings" element={<p>Settings</p>} />
        <Route path="search" element={<Search />} />
      </Route>
      <Route path="/" element={<PublicRoutes />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Registration />} />
      </Route>
    </Routes>
  );
};
