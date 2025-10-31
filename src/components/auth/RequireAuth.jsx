import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

function RequireAuth() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) return <Navigate to="/" replace />;
  else return <Outlet />;
}

export default RequireAuth;
