import type { Shift } from "@/types/types";

function checkTakenRange(shifts: Shift[]) {
	return shifts.map((shift) => {
		const end = shift.endTime === 15 ? shift.endTime : shift.endTime - 1;
		return [shift.startTime, end];
	});
}

function timeStringToNumber(time: string) {
	const [hours, minutes] = time.split(":").map(Number);
	return hours + minutes / 60;
}

function checkTakenTime(hour: string, ranges: number[][]) {
	const hourNum = timeStringToNumber(hour);

	return ranges.some(([start, end]) => hourNum >= start && hourNum <= end);
}

export { checkTakenTime, checkTakenRange, timeStringToNumber };
