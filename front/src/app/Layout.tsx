import { Outlet } from "react-router";
import { Dock } from "@/components/dock/Dock";
import { Header } from "@/components/header/Header";

function Layout() {
	return (
		<div className="flex flex-col pb-20 md:pb-10">
			<Header />
			<Outlet />
			<Dock />
		</div>
	);
}

export { Layout };
