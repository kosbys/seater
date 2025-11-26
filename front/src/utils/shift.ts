import type { Shift } from "@/types/types";

function checkTakenRange(shifts: Shift[]) {
    return shifts.map((shift) => {
        const end = shift.endTime === 15 ? shift.endTime : shift.endTime - 1;
        return [shift.startTime, end];
    });
}

function timeStringToNumber(time: string) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
}

function numberToTimeString(number: number) {
    const hours = Math.floor(number);
    const minutes = Math.round((number - hours) * 60);
    const hoursString = String(hours).padStart(2, "0");
    const minutesString = String(minutes).padStart(2, "0");
    return `${hoursString}:${minutesString}`;
}

function checkTakenTime(hour: string, ranges: number[][]) {
    const hourNum = timeStringToNumber(hour);

    return ranges.some(([start, end]) => hourNum >= start && hourNum <= end);
}

export {
    checkTakenTime,
    checkTakenRange,
    timeStringToNumber,
    numberToTimeString,
};
