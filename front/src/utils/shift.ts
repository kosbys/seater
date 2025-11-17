import type { Shift } from "@/types/types";

function checkTakenRange(shifts: Shift[]) {
	return shifts.map((shift) => {
		const end = shift.endTime === 15 ? shift.endTime : shift.endTime - 1;
		return [shift.startTime, end];
	});
}

function checkTakenTime(hour: number, ranges: number[][]) {
	return ranges.some(([start, end]) => hour >= start && hour <= end);
}

export { checkTakenTime, checkTakenRange };
