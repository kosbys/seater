import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStation } from "@/api/station";
import { useAuthStore } from "@/store/auth";
import { useModalStore } from "@/store/modal";
import type { Station } from "@/types/types";
import { AddShift } from "../shift/AddShift";
import { Button } from "../ui/button";
import { ShiftTimeline } from "./ShiftTimeline";
import { StationTypeIcon } from "./StationTypeIcon";

// get shifts selected date

function StationBlock({ station }: { station: Station }) {
  const openModal = useModalStore((s) => s.openModal);
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const deleteSectionMutation = useMutation({
    mutationFn: (id: number) => deleteStation(id.toString()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });

  return (
    <div>
      <Button
        asChild
        variant="ghost"
        className="group border-2 flex flex-col justify-around p-2 gap-1 hover:opacity-70"
        onClick={() => {
          openModal(<AddShift stationID={station.id} />);
        }}
      >
        <div className="w-48 h-48 flex flex-col">
          <div className="flex flex-row gap-1">
            <span className="text-lg">{station.name}</span>
            <StationTypeIcon type={station.type} />
            <span className="text-lg">{station.type}</span>
          </div>

          {user?.role === "admin" && (
            <Button
              variant="destructive"
              className="self-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-black"
              onClick={(e) => {
                e.stopPropagation();
                deleteSectionMutation.mutate(station.id);
              }}
            >
              מחק
            </Button>
          )}
        </div>
      </Button>
    </div>
  );
}

export { StationBlock };
