import clsx from "clsx";
import { useState } from "react";
import { useDateNavigate } from "@/hooks/dateNavigate";
import { useShiftsWeek } from "@/hooks/useShiftsWeek";
import type { Shift } from "@/types/types";
import { getSundayDate, getWeekDates } from "../../utils/date";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { WeekButtons } from "./WeekButtons";
import { WeekTableHeader } from "./WeekTableHeader";

const WEEK_MILISECONDS = 86400000 * 7;
const ROWS_PER_DAY = 20;

// clicking on a day should lead you to its own page where it renders a DayPage with shift stats

function WeekGrid() {
	const dateNavigate = useDateNavigate();
	const today = new Date();
	const offset = today.getDay();
	const [sunday, setSunday] = useState<Date>(getSundayDate(today, offset));

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

	return (
		<div className="w-full" dir="rtl">
			<WeekButtons nextWeek={nextWeek} previousWeek={previousWeek} />
			<Table className="w-full text-center border-0 rounded-lg table-fixed">
				<WeekTableHeader weekDates={weekDates} />
				<TableBody>
					{Array.from({ length: ROWS_PER_DAY }).map((_, rowIndex) => {
						const rowKey = `row-${rowIndex}`;
						return (
							<TableRow key={rowKey}>
								{weekDates.map((day) => {
									const cellKey = `${day.date}-${rowIndex}`;

									const shiftsToday = shifts
										? shifts.filter(
												(shift: Shift) =>
													day.date ===
													new Date(shift.date).toISOString().slice(0, 10),
											)
										: [];

									const cellShift = shiftsToday[rowIndex] || null;

									return (
										<TableCell
											key={cellKey}
											onClick={() => dateNavigate(day.date.replaceAll("-", ""))}
											data-date={day.date}
											className={clsx(
												"border-2 px-4 py-2 h-16 align-middle transition-all duration-150",
												{
													// Highlight today (light primary with readable text)
													"bg-primary/20 text-primary font-semibold ring-2 ring-primary/40 shadow-sm":
														day.date === today.toISOString().slice(0, 10),

													// Normal cells (surface background + subtle hover)
													"bg-background hover:bg-muted/50":
														day.date !== today.toISOString().slice(0, 10),
												},
											)}
										>
											{/* make this better */}
											{cellShift ? (
												<div>
													{cellShift.username} {cellShift.sectionName}
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
