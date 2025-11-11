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

export async function createStation(sectionID: number, type, name: string) {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/admin/station`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ sectionID, type, name }),
		},
	);

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
