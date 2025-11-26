import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth";
import { Button } from "../ui/button";

function LogoutButton() {
	const navigate = useNavigate();
	const logout = useAuthStore((s) => s.logout);

	const handleClick = async () => {
		try {
			await logout();
			navigate("/login");
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	return (
		<Button size="lg" variant="ghost" onClick={handleClick} type="button">
			<LogOut className="size-8" />
		</Button>
	);
}

export { LogoutButton };
