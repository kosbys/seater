import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getShiftsByDay } from "@/api/shift";
import { deleteStation } from "@/api/station";
import { useAuthStore } from "@/store/auth";
import { useDateStore } from "@/store/day";
import { useModalStore } from "@/store/modal";
import type { Shift, Station } from "@/types/types";
import { AddShift } from "../shift/AddShift";
import { Button } from "../ui/button";
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
      <button
        type="button"
        className="group w-32 h-32 border-2 flex flex-col p-2 gap-1 hover:opacity-70"
        onClick={() => {
          openModal(<AddShift />);
        }}
      >
        <span className="text-lg">{station.name}</span>
        <span className="flex flex-row gap-1">
          <StationTypeIcon type={station.type} />
          <span>{station.type}</span>
        </span>

        {user?.role === "admin" && (
          <Button
            variant="destructive"
            className="mt-auto self-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-black"
            onClick={(e) => {
              e.stopPropagation();
              deleteSectionMutation.mutate(station.id);
            }}
          >
            מחק
          </Button>
        )}
      </button>
    </div>
  );
}

export { StationBlock };
