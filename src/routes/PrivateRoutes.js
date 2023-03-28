import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppLayout } from "../components/layout/AppLayout";
import { selectToken } from "../features/auth/authSlice";

export const PrivateRoutes = () => {
  const token = useSelector(selectToken);
  const location = useLocation();

  return token ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
