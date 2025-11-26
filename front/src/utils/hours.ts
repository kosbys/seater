function getSelectableHours(
	showHalfHours: boolean,
	start: number,
	end: number,
) {
	const step = showHalfHours ? 30 : 60; // minutes
	const hours = [];

	for (let minutes = start * 60; minutes <= end * 60; minutes += step) {
		const h = Math.floor(minutes / 60)
			.toString()
			.padStart(2, "0");
		const m = (minutes % 60).toString().padStart(2, "0");
		hours.push(`${h}:${m}`);
	}

	return hours;
}

export { getSelectableHours };
