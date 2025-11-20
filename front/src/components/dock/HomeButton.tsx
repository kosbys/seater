import { useNavigate } from "react-router";
import { Button } from "../ui/button";

function HomeButton() {
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate("/");
    };

    return (
        <Button onClick={handleClick} type="button">
            Home
        </Button>
    );
}

export { HomeButton };
