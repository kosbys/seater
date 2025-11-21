import { useState } from "react";
import { useDateNavigate } from "@/hooks/dateNavigate";
import { useShiftsWeek } from "@/hooks/useShiftsWeek";
import { getSundayDate, getWeekDates } from "../../utils/date";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { WeekButtons } from "./WeekButtons";
import { WeekTableHeader } from "./WeekTableHeader";
import type { Shift } from "@/types/types";

const WEEK_MILISECONDS = 86400000 * 7;

// clicking on a day should lead you to its own page where it renders a DayPage with shift stats

function WeekGrid() {
    const dateNavigate = useDateNavigate();
    const today = new Date();
    const offset = today.getDay();
    const [sunday, setSunday] = useState<Date>(getSundayDate(today, offset));

    console.log(sunday.toISOString().split("T")[0]);

    const { data: shifts, isLoading } = useShiftsWeek(sunday);

    function nextWeek() {
        setSunday(
            (prevSunday) => new Date(prevSunday.getTime() + WEEK_MILISECONDS),
        );
    }

    function previousWeek() {
        setSunday(
            (prevSunday) => new Date(prevSunday.getTime() - WEEK_MILISECONDS),
        );
    }

    // map every date with a shift
    const weekDates = getWeekDates(sunday);

    const rowsPerDay = 20;

    console.log(shifts);

    return (
        <div className="w-full pb-20" dir="rtl">
            <WeekButtons nextWeek={nextWeek} previousWeek={previousWeek} />
            <Table className="w-full text-center border-0 rounded-lg table-fixed">
                <WeekTableHeader weekDates={weekDates} />
                <TableBody>
                    {Array.from({ length: rowsPerDay }).map((_, rowIndex) => {
                        const rowKey = `row-${rowIndex}`;
                        return (
                            <TableRow key={rowKey}>
                                {weekDates.map((day) => {
                                    const cellKey = `${day.date}-${rowIndex}`;

                                    const shiftsToday = shifts
                                        ? shifts.filter(
                                              (shift: Shift) =>
                                                  day.date ===
                                                  new Date(shift.date)
                                                      .toISOString()
                                                      .slice(0, 10),
                                          )
                                        : [];

                                    const cellShift =
                                        shiftsToday[rowIndex] || null;

                                    return (
                                        <TableCell
                                            key={cellKey}
                                            onClick={() =>
                                                dateNavigate(
                                                    day.date.replaceAll(
                                                        "-",
                                                        "",
                                                    ),
                                                )
                                            }
                                            data-date={day.date}
                                            className="border-2 px-4 py-2 h-16 align-middle"
                                        >
                                            {/* make this better */}
                                            {cellShift ? (
                                                <div>
                                                    {cellShift.username}{" "}
                                                    {cellShift.sectionName}
                                                    {cellShift.stationName}
                                                </div>
                                            ) : null}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export { WeekGrid };
