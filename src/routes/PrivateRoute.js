import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { selectToken } from "../features/auth/authSlice";

export const PrivateRoute = () => {
  const token = useSelector(selectToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
