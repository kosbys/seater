import type { Shift } from "@/types/types";

export type FormattedDate = {
	day: string;
	date: string;
	shifts: Shift[];
};

// 5 days in Sunday -> Thursday
const WEEK_RANGE = 5;

function getSundayDate(today: Date, offset: number) {
	return new Date(today.setDate(today.getDate() - offset));
}

// need to get shifts of the week to populate array with shifts
function getWeekDates(sunday: Date): FormattedDate[] {
	const weekDates: FormattedDate[] = [];

	const currentDay = new Date(sunday);

	for (let i = 0; i < WEEK_RANGE; i++) {
		const day = currentDay.toLocaleString("he-IL", { weekday: "long" });
		const date = currentDay.toLocaleDateString("en-GB").toString();

		weekDates.push({ day, date, shifts: [] });

		currentDay.setDate(currentDay.getDate() + 1);
	}

	return weekDates;
}

export { getWeekDates, getSundayDate };
