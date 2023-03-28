import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { selectToken } from "../features/auth/authSlice";
import { AuthLayout } from "../components/layout";
import { STORAGE_PREFIX } from "../globals";

export const PublicRoutes = () => {
  const token = useSelector(selectToken);
  const location = useLocation();

  return token ? (
    <Navigate to="/feed" state={{ from: location }} replace />
  ) : (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};
