export type FormattedDate = {
	day: string;
	date: string;
};

// 5 days in Sunday -> Thursday
const WEEK_RANGE = 5;

function getSundayDate(today: Date, offset: number) {
	return new Date(today.setDate(today.getDate() - offset));
}

function getWeekDates(sunday: Date): Map<number, FormattedDate> {
	const weekDates = new Map();

	const currentDay = new Date(sunday);

	for (let i = 0; i < WEEK_RANGE; i++) {
		const day = currentDay.toLocaleString("he-IL", { weekday: "long" });
		const date = currentDay.toLocaleDateString("en-GB").toString();

		weekDates.set(i, { day, date });

		currentDay.setDate(currentDay.getDate() + 1);
	}

	return weekDates;
}

export { getWeekDates, getSundayDate };
