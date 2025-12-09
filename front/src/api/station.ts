import type { StationType } from "@/types/types";

export async function getStations() {
	const response = await fetch(`https://seater.onrender.com/stations`, {
		method: "GET",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Error getting stations");
	}
	return response.json();
}

export async function createStation(
	sectionID: number,
	type: StationType,
	name: string,
) {
	const response = await fetch(`https://seater.onrender.com/admin/station`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ sectionID, type, name }),
	});

	if (!response.ok) {
		throw new Error("Error creating station");
	}
	return response.json();
}

export async function deleteStation(stationID: string) {
	const response = await fetch(
		`https://seater.onrender.com/admin/station/${stationID}`,
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
