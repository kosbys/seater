import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { useAuthStore } from "@/store/auth";
import { Router } from "./Router";

const queryClient = new QueryClient();

function App() {
	const refresh = useAuthStore((s) => s.refresh);

	useEffect(() => {
		refresh().catch(() => {});
	}, [refresh]);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
