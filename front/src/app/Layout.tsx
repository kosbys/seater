import { Outlet } from "react-router";
import { Dock } from "@/components/dock/Dock";

function Layout() {
	return (
		<div className="flex flex-col">
			<Outlet />
			<Dock />
		</div>
	);
}

export { Layout };
