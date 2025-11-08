import { useState } from "react";
import { getSundayDate, getWeekDates } from "../../utils/date";
import { Table, TableBody } from "../ui/table";
import { WeekButtons } from "./WeekButtons";
import { WeekTableHeader } from "./WeekTableHeader";

const WEEK_MILISECONDS = 86400000 * 7;

function WeekGrid() {
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
      <WeekButtons nextWeek={nextWeek} previousWeek={previousWeek} />
      <div className="w-full" dir="rtl">
        <Table className="w-full text-center border-0 rounded-lg table-fixed">
          <WeekTableHeader weekDates={weekDates} />
          <TableBody></TableBody>
        </Table>
      </div>
    </>
  );
}

export { WeekGrid };
