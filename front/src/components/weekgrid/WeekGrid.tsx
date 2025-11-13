import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getShiftsByWeek } from "@/api/shift";
import { useDateNavigate } from "@/hooks/dateNavigate";
import { getSundayDate, getWeekDates } from "../../utils/date";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { WeekButtons } from "./WeekButtons";
import { WeekTableHeader } from "./WeekTableHeader";

const WEEK_MILISECONDS = 86400000 * 7;

// clicking on a day should lead you to its own page where it renders a DayPage with shift stats

function WeekGrid() {
  const dateNavigate = useDateNavigate();
  const today = new Date();
  const offset = today.getDay();
  const [sunday, setSunday] = useState<Date>(getSundayDate(today, offset));

  console.log(sunday.toISOString().split("T")[0]);

  const { data: shifts, isLoading } = useQuery({
    queryKey: ["weekShifts", sunday],
    queryFn: () => getShiftsByWeek(sunday.toISOString().split("T")[0]),
  });

  function nextWeek() {
    setSunday(
      (prevSunday) => new Date(prevSunday.getTime() + WEEK_MILISECONDS)
    );
  }

  function previousWeek() {
    setSunday(
      (prevSunday) => new Date(prevSunday.getTime() - WEEK_MILISECONDS)
    );
  }

  // map every date with a shift
  const weekDates = getWeekDates(sunday);

  const rowsPerDay = 10;

  console.log(weekDates);

  console.log("sunday", sunday);

  return (
    <>
      <WeekButtons nextWeek={nextWeek} previousWeek={previousWeek} />
      <div className="w-full" dir="rtl">
        <Table className="w-full text-center border-0 rounded-lg table-fixed">
          <WeekTableHeader weekDates={weekDates} />
          <TableBody>
            {Array.from({ length: rowsPerDay }).map((_, rowIndex) => {
              const rowKey = `row-${rowIndex}`;
              return (
                <TableRow key={rowKey}>
                  {weekDates.map((day) => {
                    const cellKey = `${day.date}-${rowIndex}`;
                    return (
                      <TableCell
                        key={cellKey}
                        onClick={() =>
                          dateNavigate(day.date.replaceAll("-", ""))
                        }
                        data-date={day.date}
                        className="border px-4 py-2 h-16 align-middle"
                      >
                        {/* shift data here */}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export { WeekGrid };
