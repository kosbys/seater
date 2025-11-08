import { Route, Routes } from "react-router";
import { WeekGrid } from "@/components/WeekGrid/WeekGrid";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<WeekGrid />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export { Router };
