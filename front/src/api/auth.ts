export async function requestLogin(username: string, password: string) {
	const response = await fetch(`https://seater.onrender.com/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ username, password }),
	});

	if (!response.ok) {
		throw new Error("Login failure");
	}
	return response.json();
}

export async function requestRegister(username: string, password: string) {
	const response = await fetch(`https://seater.onrender.com/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({ username, password }),
	});

	if (!response.ok) {
		console.log(response);

		throw new Error("Register failure");
	}
	return response.json();
}

export async function requestRefresh() {
	const response = await fetch(`https://seater.onrender.com/refresh`, {
		method: "GET",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Refresh failure");
	}
	return response.json();
}

export async function requestLogout() {
	const response = await fetch(`https://seater.onrender.com/logout`, {
		method: "POST",
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Logout failure");
	}
	return response.json();
}
