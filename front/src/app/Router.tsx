import { Route, Routes } from "react-router";
import { Homepage } from "./pages/Homepage";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";

function Router() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Homepage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { Router };
