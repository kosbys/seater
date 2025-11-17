import { LogoutButton } from "@/components/LogoutButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { WeekGrid } from "@/components/weekgrid/WeekGrid";
import { useAuthStore } from "@/store/auth";

function Homepage() {
	const user = useAuthStore((s) => s.user);
	return (
		<div>
			<LogoutButton />
			<ThemeToggle />
			<div>hello {user?.username}</div>
			<WeekGrid />
		</div>
	);
}

export { Homepage };
