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
	const today = new Date();

	const todayFormatted = today.toISOString().split("T")[0].replaceAll("-", "");
	return <Navigate to={`/days/${todayFormatted}`} replace />;
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
