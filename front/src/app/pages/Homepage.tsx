import { WeekGrid } from "@/components/weekgrid/WeekGrid";
import { useAuthStore } from "@/store/auth";

function Homepage() {
  const user = useAuthStore((s) => s.user);
  return (
    <div>
      <div>hello {user}</div>
      <WeekGrid />
    </div>
  );
}

export { Homepage };
