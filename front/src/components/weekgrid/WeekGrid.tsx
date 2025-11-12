import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getShifts } from "@/api/shift";
import { getSundayDate, getWeekDates } from "../../utils/date";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { WeekButtons } from "./WeekButtons";
import { WeekTableHeader } from "./WeekTableHeader";

const WEEK_MILISECONDS = 86400000 * 7;

function WeekGrid() {
  const today = new Date();
  const offset = today.getDay();
  const [sunday, setSunday] = useState<Date>(getSundayDate(today, offset));

  const { data: shifts, isLoading } = useQuery({
    queryKey: ["weekShifts", sunday],
    queryFn: () => getShifts(sunday),
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

  return (
    <>
      <WeekButtons nextWeek={nextWeek} previousWeek={previousWeek} />
      <div className="w-full" dir="rtl">
        <Table className="w-full text-center border-0 rounded-lg table-fixed">
          <WeekTableHeader weekDates={weekDates} />
          <TableBody>
            {Array.from({ length: rowsPerDay }).map((_, rowIdx) => {
              const rowKey = `row-${rowIdx}`;
              return (
                <TableRow key={rowKey}>
                  {Array.from(weekDates.entries()).map(([_, formatted]) => {
                    const cellKey = `${formatted.date}-${rowIdx}`;
                    return (
                      <TableCell
                        key={cellKey}
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
