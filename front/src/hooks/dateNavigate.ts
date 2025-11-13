import { useNavigate } from "react-router";

function useDateNavigate() {
	const navigate = useNavigate();

	function dateNavigate(date: string) {
		navigate(`/days/${date}`);
	}

	return dateNavigate;
}

export { useDateNavigate };
