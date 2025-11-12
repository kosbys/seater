import type { FormattedDate } from "@/utils/date";
import { TableHead, TableHeader, TableRow } from "../ui/table";

type HeaderProps = {
  weekDates: FormattedDate[];
};

function WeekTableHeader({ weekDates }: HeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        {weekDates.map((day) => (
          <TableHead
            key={day.date}
            className="text-center border-x-2 py-2 text-xs sm:text-sm w-1/5 wrap-break-word whitespace-normal"
          >
            <div className="flex flex-col">
              <span>{day.day}</span>
              <span>{day.date}</span>
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}

export { WeekTableHeader };
