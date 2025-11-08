const OPTIONS: Intl.DateTimeFormatOptions = {
	weekday: "long",
	month: "long",
	year: "numeric",
	day: "numeric",
};

// 5 days in Sunday -> Thursday
const WEEK_RANGE = 5;

function getSundayDate(today: Date, offset: number) {
	return new Date(today.setDate(today.getDate() - offset));
}

function getWeekDates(sunday: Date): Map<number, Date> {
	const weekDates = new Map();

	const currentDay = new Date(sunday);

	for (let i = 0; i < WEEK_RANGE; i++) {
		const dateString = currentDay.toLocaleDateString("he-IL", OPTIONS);

		weekDates.set(i, dateString);

		currentDay.setDate(currentDay.getDate() + 1);
	}

	return weekDates;
}

export { getWeekDates, getSundayDate };
