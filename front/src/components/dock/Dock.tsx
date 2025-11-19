import { ThemeToggle } from "../theme/ThemeToggle";
import { LogoutButton } from "./LogoutButton";

// if /days show daybuttons else weekbuttons

function Dock() {
	return (
		<div className="fixed bottom-0 overflow-hidden self-center flex flex-row gap-4">
			<LogoutButton />
			<ThemeToggle />
		</div>
	);
}

export { Dock };
