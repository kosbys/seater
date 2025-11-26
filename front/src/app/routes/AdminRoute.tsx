import type { JSX } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/store/auth";

function AdminRoute({ element }: { element: JSX.Element }) {
    const user = useAuthStore((s) => s.user);
    return user?.role === "admin" ? element : <Navigate to="/login" replace />;
}

export { AdminRoute };
