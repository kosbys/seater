import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/auth";

function AdminRoute() {
  const user = useAuthStore((s) => s.user);
  return user?.role === "admin" ? <Outlet /> : <Navigate to="/login" replace />;
}

export { AdminRoute };
