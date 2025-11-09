import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/auth";

function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export { ProtectedRoute };
