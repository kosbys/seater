import { useNavigate } from "react-router";

// YYYYMMDD
function useDateNavigate() {
    const navigate = useNavigate();

    function dateNavigate(date: string) {
        navigate(`/days/${date}`);
    }

    return dateNavigate;
}

export { useDateNavigate };
