import { useParams } from "react-router";
import { SectionList } from "@/components/section/SectionList";
import { ShiftModal } from "@/components/shift/ShiftModal";
import { useDateStore } from "@/store/day";
import { urlParamToDate } from "@/utils/date";
import { NotFound } from "./NotFound";
import { DayButtons } from "@/components/DayButtons";

// modal state here?
// query for shifts today

function DayPage() {
    const setSelecteDate = useDateStore((s) => s.setSelectedDate);
    const { day } = useParams<{ day: string }>();

    if (!day) {
        return <NotFound />;
    }

    const date = urlParamToDate(day);

    if (date.getDay() > 4) {
        return <NotFound />;
    }

    const previousDay = () => {};

    const nextDay = () => {};

    setSelecteDate(date);

    console.log(date);

    return (
        <>
            <ShiftModal />
            <div className="flex flex-col flex-2 items-center gap-4 pt-4">
                <DayButtons />
                <SectionList />
            </div>
        </>
    );
}

export { DayPage };
