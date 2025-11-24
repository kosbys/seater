import type { Shift } from "@/types/types";

export type FormattedDate = {
    day: string;
    date: string;
    shifts: Shift[];
};

export type Range = {
    start: number;
    end: number;
};

// 5 days in Sunday -> Thursday
const WEEK_RANGE = 5;

function getSundayDate(today: Date, offset: number) {
    const sunday = new Date(today);

    return new Date(sunday.setDate(sunday.getDate() - offset));
}

// need to get shifts of the week to populate array with shifts
function getWeekDates(sunday: Date): FormattedDate[] {
    const weekDates: FormattedDate[] = [];

    const currentDay = new Date(sunday);

    for (let i = 0; i < WEEK_RANGE; i++) {
        const day = currentDay.toLocaleString("he-IL", { weekday: "long" });
        const date = currentDay.toISOString().split("T")[0];

        weekDates.push({ day, date, shifts: [] });

        currentDay.setDate(currentDay.getDate() + 1);
    }

    return weekDates;
}

function urlParamToDate(date: string) {
    return new Date(
        `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`,
    );
}

function checkOverlap(a: Range, b: Range) {
    return a.start < b.end && b.start < a.end;
}

export { getWeekDates, getSundayDate, urlParamToDate, checkOverlap };
