import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStation } from "@/api/station";
import { useAuthStore } from "@/store/auth";
import { useDateStore } from "@/store/day";
import { useModalStore } from "@/store/modal";
import type { Station } from "@/types/types";
import { AddShift } from "../shift/AddShift";
import { Button } from "../ui/button";
import { StationTypeIcon } from "./StationTypeIcon";

// onclick open modal

function StationBlock({ station }: { station: Station }) {
  const selectedDate = useDateStore((s) => s.selectedDate);
  const openModal = useModalStore((s) => s.openModal);
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const deleteSectionMutation = useMutation({
    mutationFn: (id: number) => deleteStation(id.toString()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });

  console.log(selectedDate);

  return (
    <div>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: <sn> */}
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: <s> */}
      <div
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
            onClick={() => {
              deleteSectionMutation.mutate(station.id);
            }}
          >
            מחק
          </Button>
        )}
      </div>
    </div>
  );
}

export { StationBlock };
