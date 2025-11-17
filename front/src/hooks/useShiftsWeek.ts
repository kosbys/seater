import { useQuery } from "@tanstack/react-query";
import { getShiftsByWeek } from "@/api/shift";
import type { Shift } from "@/types/types";

function useShiftsWeek(day: Date) {
	return useQuery<Shift[]>({
		queryKey: ["shifts", "day", day],
		queryFn: () => {
			if (!day) throw new Error("no date selected");
			return getShiftsByWeek(day.toISOString().split("T")[0]);
		},
	});
}

export { useShiftsWeek };
