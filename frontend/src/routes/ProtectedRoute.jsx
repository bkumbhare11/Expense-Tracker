import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
