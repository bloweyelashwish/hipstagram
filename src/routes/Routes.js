import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes";
import { Login, Registration } from "../pages/authentication";
import { Profile, ProfileSettings, Search, Feed } from "../pages/private";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Navigate to="feed" replace />} />
        <Route path="feed" index element={<Feed />} />
        <Route path="user/:id" element={<Profile />} />
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
