import { LogoutButton } from "@/components/LogoutButton";
import { WeekGrid } from "@/components/weekgrid/WeekGrid";
import { useAuthStore } from "@/store/auth";

function Homepage() {
  const user = useAuthStore((s) => s.user);
  return (
    <div>
      <LogoutButton />
      <div>hello {user?.username}</div>
      <WeekGrid />
    </div>
  );
}

export { Homepage };
