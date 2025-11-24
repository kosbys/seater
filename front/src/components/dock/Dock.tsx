import { ThemeToggle } from "../theme/ThemeToggle";
import { HomeButton } from "./HomeButton";
import { LogoutButton } from "./LogoutButton";

// if /days show daybuttons else weekbuttons

function Dock() {
    return (
        <div className="fixed bottom-0 overflow-hidden self-center justify-center items-center flex flex-row gap-4 w-full h-12 bg-primary">
            <HomeButton />
            <LogoutButton />
            <ThemeToggle />
        </div>
    );
}

export { Dock };
