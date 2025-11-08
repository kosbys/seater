import { useState } from "react";
import { getSundayDate, getWeekDates } from "../utils/date";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const WEEK_MILISECONDS = 86400000 * 7;

function WeekGrid() {
  // changed with a button
  // prev -> -7
  // next -> +7

  const today = new Date();
  const offset = today.getDay();

  const [sunday, setSunday] = useState<Date>(getSundayDate(today, offset));

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

  const weekDates = getWeekDates(sunday);

  console.log(weekDates);

  return (
    <>
      <div>
        {" "}
        <Button type="button" onClick={previousWeek}>
          Previous
        </Button>
        <Button type="button" onClick={nextWeek}>
          Next
        </Button>
      </div>
      <div className="w-full" dir="rtl">
        <Table className="w-full text-center border rounded-lg table-fixed">
          <TableHeader>
            <TableRow>
              {[...weekDates.values()].map((day) => (
                <TableHead
                  key={day.date}
                  className="text-center py-2 text-xs sm:text-sm w-1/5 wrap-break-word whitespace-normal"
                >
                  <div className="flex flex-col">
                    <span>{day.day}</span>
                    <span>{day.date}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
        </Table>
      </div>
    </>
  );
}

export { WeekGrid };
