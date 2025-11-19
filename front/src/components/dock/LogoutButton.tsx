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
		<Button onClick={handleClick} type="button">
			Logout
		</Button>
	);
}

export { LogoutButton };
