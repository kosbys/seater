import { ShieldUser } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth";
import { Button } from "../ui/button";

function AdminButton() {
    const user = useAuthStore((s) => s.user);
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate("/admin");
    };

    return user?.role === "admin" ? (
        <Button size="lg" variant="ghost" onClick={handleClick} type="button">
            <ShieldUser className="size-8" />
        </Button>
    ) : null;
}

export { AdminButton };
