export async function getShiftsByWeek(day: string) {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/shifts/week/${day}`,
		{
			method: "GET",
			credentials: "include",
		},
	);

	if (!response.ok) {
		throw new Error("Error getting shifts");
	}
	return response.json();
}

export async function getShiftsByDay(day: string) {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/shifts/day/${day}`,
		{
			method: "GET",
			credentials: "include",
		},
	);

	if (!response.ok) {
		throw new Error("Error getting shifts");
	}
	return response.json();
}

// converts date to YYYY-MM-DD
export async function createShift(
	stationID: number,
	date: Date,
	startTime: string,
	endTime: string,
) {
	const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/shifts`, {
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
		`${import.meta.env.VITE_SERVER_URL}/shifts/${shiftID}`,
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
