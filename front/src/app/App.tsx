import { useEffect } from "react";
import { BrowserRouter } from "react-router";
import { useAuthStore } from "@/store/auth";
import { Router } from "./Router";

function App() {
  const refresh = useAuthStore((s) => s.refresh);

  useEffect(() => {
    refresh().catch(() => {});
  }, [refresh]);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
