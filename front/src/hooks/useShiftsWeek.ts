import { useQuery } from "@tanstack/react-query";
import { getShiftsByWeek } from "@/api/shift";

function useShiftsWeek(day: Date) {
	return useQuery({
		queryKey: ["shifts", "day", day],
		queryFn: () => {
			if (!day) throw new Error("no date selected");
			return getShiftsByWeek(day.toISOString().split("T")[0]);
		},
	});
}

export { useShiftsWeek };
