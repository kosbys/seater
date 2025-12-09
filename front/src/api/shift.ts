import { shiftsResponseSchema } from "@/types/types";

export async function getShiftsByWeek(day: string) {
	const response = await fetch(
		`https://seater.onrender.com/api/shifts/week/${day}`,
		{
			method: "GET",
			credentials: "include",
		},
	);

	if (!response.ok) {
		throw new Error("Error getting shifts");
	}
	const json = await response.json();
	const shifts = shiftsResponseSchema.parse(json).shifts;

	return shifts ?? [];
}

export async function getShiftsByDay(day: string) {
	const response = await fetch(
		`https://seater.onrender.com/api/shifts/day/${day}`,
		{
			method: "GET",
			credentials: "include",
		},
	);

	if (!response.ok) {
		throw new Error("Error getting shifts");
	}

	const json = await response.json();
	const shifts = shiftsResponseSchema.parse(json).shifts;
	return shifts ?? [];
}

// converts date to YYYY-MM-DD
export async function createShift(
	stationID: number,
	date: Date,
	startTime: number,
	endTime: number,
) {
	const response = await fetch(`https://seater.onrender.com/api/shifts`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({
			stationID,
			date: date.toISOString().split("T")[0],
			startTime,
			endTime,
		}),
	});

	if (!response.ok) {
		throw new Error("Error creating shift");
	}
	return response.json();
}

export async function deleteShift(shiftID: string) {
	const response = await fetch(
		`https://seater.onrender.com/api/shifts/${shiftID}`,
		{
			method: "DELETE",
			credentials: "include",
		},
	);

	if (!response.ok) {
		throw new Error("Error deleting");
	}
	return response.json();
}
