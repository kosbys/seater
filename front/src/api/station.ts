export async function getStations() {
	const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/stations`, {
		method: "GET",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error getting stations");
	}
	return response.json();
}

export async function createStation(
	sectionID: string,
	computer: boolean,
	monitor: boolean,
) {
	const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/stations`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ sectionID, computer, monitor }),
	});

	if (!response.ok) {
		throw new Error("Error creating station");
	}
	return response.json();
}

export async function deleteStation(stationID: string) {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/stations/${stationID}`,
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
