import { useState } from "react";
import { getSundayDate, getWeekDates } from "../utils/date";
import { Button } from "./ui/button";

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
      <Button type="button" onClick={previousWeek}>
        Previous
      </Button>
      <Button type="button" onClick={nextWeek}>
        Next
      </Button>
      <div className="grid grid-cols-5 gap-4 text-center">
        {[...weekDates.values()].map((day) => (
          <div key={crypto.randomUUID()}>{day}</div>
        ))}
      </div>
    </>
  );
}

export { WeekGrid };
