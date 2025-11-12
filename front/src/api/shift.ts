export async function getShiftsByWeek(sunday: string) {
	// convert sunday to a query param?

	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/shifts/${sunday}`,
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

export async function createShift(
	sectionID: string,
	date: Date,
	startTime: string,
	endTime: string,
) {
	const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/shifts`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({
			sectionID,
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
