import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/auth";

function PublicRoute() {
  const user = useAuthStore((s) => s.user);
  return !user ? <Outlet /> : <Navigate to="/" replace />;
}

export { PublicRoute };
