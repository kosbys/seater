import { AdminButton } from "./AdminButton";
import { HomeButton } from "./HomeButton";
import { LogoutButton } from "./LogoutButton";

function Dock() {
	return (
		<div
			className="fixed bottom-0 overflow-hidden self-center justify-around items-center flex flex-row
          gap-4 w-full h-12 shadow-2xl bg-dock md:hidden"
		>
			<AdminButton />
			<LogoutButton />
			<HomeButton />
		</div>
	);
}

export { Dock };
