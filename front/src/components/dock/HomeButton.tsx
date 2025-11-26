import { House } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

function HomeButton() {
	const navigate = useNavigate();

	const handleClick = async () => {
		navigate("/");
	};

	return (
		<Button size="icon" variant="outline" onClick={handleClick} type="button">
			<House />
		</Button>
	);
}

export { HomeButton };
