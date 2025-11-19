import type { JSX } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/store/auth";

function ProtectedRoute({ element }: { element: JSX.Element }) {
	const user = useAuthStore((s) => s.user);
	return user ? element : <Navigate to="/login" replace />;
}

export { ProtectedRoute };
