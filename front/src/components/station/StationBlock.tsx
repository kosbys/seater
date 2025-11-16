import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { deleteStation } from "@/api/station";
import { useShiftsDay } from "@/hooks/useShiftsDay";
import { useAuthStore } from "@/store/auth";
import { useDateStore } from "@/store/day";
import { useModalStore } from "@/store/modal";
import type { Shift, Station } from "@/types/types";
import { AddShift } from "../shift/AddShift";
import { Button } from "../ui/button";
import { StationTypeIcon } from "./StationTypeIcon";

function StationBlock({ station }: { station: Station }) {
  const openModal = useModalStore((s) => s.openModal);
  const [filteredShifts, setFilteredShifts] = useState<Shift[]>([]);
  const queryClient = useQueryClient();
  const selectedDate = useDateStore((s) => s.selectedDate);
  const user = useAuthStore((s) => s.user);

  const { data: shifts, isLoading } = useShiftsDay(selectedDate);

  const deleteSectionMutation = useMutation({
    mutationFn: (id: number) => deleteStation(id.toString()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });

  useEffect(() => {
    if (shifts) {
      setFilteredShifts(
        shifts.filter((shift) => shift.stationID === station.id)
      );
    }
  }, [shifts, station.id]);

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

          <div className="flex flex-col gap-1 mt-2 overflow-y-auto">
            {filteredShifts?.length ? (
              filteredShifts.map((shift) => (
                <div
                  key={shift.id}
                  className="border rounded-md p-1 text-sm bg-muted flex justify-between"
                >
                  <span>{shift.startTime}</span>
                  <span>-</span>
                  <span>{shift.endTime}</span>
                </div>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">אין משמרות</span>
            )}
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
