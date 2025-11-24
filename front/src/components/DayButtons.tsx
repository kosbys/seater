// next/prev day
// if day is sunday and you go back, go to last week's thu
// if day is thur and you go forward, go to next week's sunday

import { useDateNavigate } from "@/hooks/dateNavigate";
import { useDateStore } from "@/store/day";
import { Button } from "./ui/button";

// do this

function DayButtons() {
    const dateNavigate = useDateNavigate();
    const selectedDate = useDateStore((s) => s.selectedDate);

    const previousDay = () => {
        // last thu
        // 3 days ago
        const prev = new Date(selectedDate);

        const difference = selectedDate.getDay() === 0 ? 3 : 1;

        prev.setDate(prev.getDate() - difference);

        console.log(prev);

        dateNavigate(prev.toISOString().split("T")[0].replaceAll("-", ""));
    };

    const nextDay = () => {
        // next sun
        // 3 days next
        const next = new Date(selectedDate);

        const difference = selectedDate.getDay() === 4 ? 3 : 1;

        next.setDate(next.getDate() + difference);

        console.log(next);

        dateNavigate(next.toISOString().split("T")[0].replaceAll("-", ""));
    };

    return (
        <>
            <Button type="button" onClick={previousDay}>
                Previous
            </Button>
            <Button type="button" onClick={nextDay}>
                Next
            </Button>
        </>
    );
}

export { DayButtons };
