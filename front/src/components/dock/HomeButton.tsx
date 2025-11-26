import { House } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

function HomeButton() {
	const navigate = useNavigate();

	const handleClick = async () => {
		navigate("/");
	};

	return (
		<Button size="lg" variant="ghost" onClick={handleClick} type="button">
			<House className="size-8" />
		</Button>
	);
}

export { HomeButton };
