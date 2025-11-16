import { useQuery } from "@tanstack/react-query";
import { getShiftsByDay } from "@/api/shift";
import type { Shift } from "@/types/types";

function useShiftsDay(day: Date) {
	return useQuery<Shift[]>({
		queryKey: ["shifts", "day", day],
		queryFn: () => {
			if (!day) throw new Error("no date selected");
			return getShiftsByDay(day.toISOString().split("T")[0]);
		},
	});
}

export { useShiftsDay };
