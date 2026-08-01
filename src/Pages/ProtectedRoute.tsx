import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageKeys } from "../constants/constants";

function ProtectedRoute() {
  const isLoggedIn = localStorage.getItem(LocalStorageKeys.TOKEN) !== null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
