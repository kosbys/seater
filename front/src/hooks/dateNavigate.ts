import { useNavigate } from "react-router";

function useDateNavigate() {
	const navigate = useNavigate();

	function dateNavigate(date: string) {
		console.log(date);
		navigate(`/${date}`);
	}

	return dateNavigate;
}

export { useDateNavigate };
