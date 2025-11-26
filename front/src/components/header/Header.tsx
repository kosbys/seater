import { AdminButton } from "../dock/AdminButton";
import { HomeButton } from "../dock/HomeButton";
import { LogoutButton } from "../dock/LogoutButton";
import { ThemeToggle } from "../theme/ThemeToggle";

function Header() {
    return (
        <div
            className="self-center justify-start items-center flex-row
          gap-4 w-full h-12 shadow-2xl bg-dock hidden md:flex"
        >
            <AdminButton />
            <LogoutButton />
            <HomeButton />
            <ThemeToggle />
        </div>
    );
}

export { Header };
