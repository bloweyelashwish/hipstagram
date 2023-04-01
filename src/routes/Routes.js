import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes";
import { User, Feed } from "../pages/private/";
import { Login, Registration } from "../pages/authentication";
import { Search } from "../pages/private/Search";
import { ProfileSettings } from "../pages/private/ProfileSettings";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Navigate to="feed" replace />} />
        <Route path="feed" index element={<Feed />} />
        <Route path="user/:id" element={<User />} />
        <Route path="user/settings" element={<ProfileSettings />} />
        <Route path="search" element={<Search />} />
        <Route path="*" element={<Navigate to="feed" replace />} />
      </Route>
      <Route path="/" element={<PublicRoutes />}>
        <Route path="*" element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Registration />} />
      </Route>
    </Routes>
  );
};
