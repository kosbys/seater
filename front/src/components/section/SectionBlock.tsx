import { useAuthStore } from "@/store/auth";
import type { Section } from "@/types/types";
import { StationBlock } from "../station/StationBlock";
import { Button } from "../ui/button";

function SectionBlock({ section }: { section: Section }) {
  const user = useAuthStore((s) => s.user);

  const stations = section.stations;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between pb-1">
        <span className="text-lg">{section.name}</span>
        {user?.role === "admin" && (
          <Button variant="destructive" className="">
            מחק
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-0.5">
        {stations.map((station) => (
          <StationBlock key={station.id} station={station} />
        ))}
      </div>
    </div>
  );
}

export { SectionBlock };
