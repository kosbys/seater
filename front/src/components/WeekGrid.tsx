import { useState } from "react";
import { getSundayDate, getWeekDates } from "../utils/date";

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
      <button type="button" onClick={previousWeek}>
        Previous
      </button>
      <button type="button" onClick={nextWeek}>
        Next
      </button>
      <div className="grid grid-cols-5 gap-4 text-center">
        {[...weekDates.values()].map((day) => (
          <div key={crypto.randomUUID()}>{day}</div>
        ))}
      </div>
    </>
  );
}

export { WeekGrid };
