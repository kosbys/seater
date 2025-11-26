import { AdminButton } from "../dock/AdminButton";
import { HomeButton } from "../dock/HomeButton";
import { LogoutButton } from "../dock/LogoutButton";
import { ThemeToggle } from "../theme/ThemeToggle";

function Header() {
    return (
        <div
            className="z-1 self-center justify-start items-center flex-row
          gap-4 w-full h-12 shadow-lg bg-dock hidden md:flex"
        >
            <AdminButton />
            <LogoutButton />
            <HomeButton />
            <ThemeToggle />
        </div>
    );
}

export { Header };
