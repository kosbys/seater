import { useAuthStore } from "@/store/auth";
import type { Station } from "@/types/types";
import { Button } from "../ui/button";
import { StationTypeIcon } from "./StationTypeIcon";

function StationBlock({ station }: { station: Station }) {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="group w-32 h-32 border-2 flex flex-col p-2 gap-1">
      <span className="text-lg">{station.name}</span>
      <span className="flex flex-row gap-1">
        <StationTypeIcon type={station.type} />
        <span>{station.type}</span>
      </span>

      {/* should delete */}
      {user?.role === "admin" && (
        <Button
          variant="destructive"
          className="mt-auto self-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-black"
        >
          מחק
        </Button>
      )}
    </div>
  );
}

export { StationBlock };
