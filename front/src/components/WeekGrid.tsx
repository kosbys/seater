import { useState } from "react";
import { getSundayDate, getWeekDates } from "../utils/date";

function WeekGrid() {
  // changed with a button
  const [weekDates, setWeekDates] = useState();
  function date() {
    const today = new Date();
    const sunday = getSundayDate(today, today.getDay());

    const dates = getWeekDates(sunday);

    console.log(dates);
  }

  date();

  return (
    <div className="grid grid-cols-5 gap-4 text-center">
      <div>01</div>
      <div>01</div>
      <div>01</div>
      <div>01</div>
      <div>01</div>
    </div>
  );
}

export { WeekGrid };
