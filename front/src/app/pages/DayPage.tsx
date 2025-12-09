import { Navigate, useParams } from "react-router";
import { NextPrevButtons } from "@/components/NextPrevButtons";
import { SectionList } from "@/components/section/SectionList";
import { ShiftModal } from "@/components/shift/ShiftModal";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useDateNavigate } from "@/hooks/dateNavigate";
import { useDayNextPrev } from "@/hooks/useDayNextPrev";
import { useDateStore } from "@/store/day";
import { getSundayDate, urlParamToDate } from "@/utils/date";
import { NotFound } from "./NotFound";

// modal state here?
// query for shifts today
//
const allowedDays = [0, 1, 2, 3, 4];

function DayPage() {
	const setSelecteDate = useDateStore((s) => s.setSelectedDate);
	const dateNavigate = useDateNavigate();
	const { day } = useParams<{ day: string }>();
	const date = urlParamToDate(day);
	const { previousDay, nextDay } = useDayNextPrev(date, dateNavigate);

	if (!day || !date || Number.isNaN(date.getTime())) {
		return <NotFound />;
	}

	const weekday = date.getDay();

	if (!allowedDays.includes(weekday)) {
		const sunday = getSundayDate(date, date.getDay());
		const formatted = sunday.toISOString().split("T")[0];
		return <Navigate to={`/days/${formatted}`} replace />;
	}

	if (date.getDay() > 4) {
		return <NotFound />;
	}

	setSelecteDate(date);

	console.log(date);

	return (
		<>
			<ShiftModal />
			<div className="flex flex-col flex-2 items-center gap-4 pt-4">
				<h2 className="text-3xl p-2">
					{date.toLocaleDateString("he-IL", {
						weekday: "long",
						year: "numeric",
						month: "numeric",
						day: "numeric",
					})}
				</h2>
				<ThemeToggle />
				<NextPrevButtons next={nextDay} previous={previousDay} />
				<SectionList />
			</div>
		</>
	);
}

export { DayPage };
