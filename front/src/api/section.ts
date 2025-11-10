export async function getSections() {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/api/sections`,
		{
			method: "GET",
			credentials: "include",
		},
	);

	if (!response.ok) {
		throw new Error("Error getting sections");
	}
	return response.json();
}

export async function createSection(name: string) {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/admin/section`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify({ name }),
		},
	);

	if (!response.ok) {
		throw new Error("Error creating section");
	}
	return response.json();
}

export async function deleteSection(sectionID: string) {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/admin/section/${sectionID}`,
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
