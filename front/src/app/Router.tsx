import { Navigate, Route, Routes } from "react-router";
import { Layout } from "./Layout";
import { AdminPage } from "./pages/AdminPage";
import { DayPage } from "./pages/DayPage";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { WeekPage } from "./pages/WeekPage";
import { AdminRoute } from "./routes/AdminRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";

function RedirectToday() {
	const today = new Date().toISOString().split("T")[0].replaceAll("-", "");
	// e.g. "2025-01-21"
	return <Navigate to={`/days/${today}`} replace />;
}

function Router() {
	return (
		<Routes>
			<Route element={<PublicRoute />}>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Route>

			<Route element={<ProtectedRoute element={<Layout />} />}>
				<Route path="/" element={<RedirectToday />} />
				<Route path="/week" element={<WeekPage />} />
				<Route path="/days/:day" element={<DayPage />} />
			</Route>

			<Route element={<AdminRoute element={<Layout />} />}>
				<Route path="/admin" element={<AdminPage />} />
			</Route>

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export { Router };
