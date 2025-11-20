// next/prev day
// if day is sunday and you go back, go to last week's thu
// if day is thur and you go forward, go to next week's sunday

import { useNavigate } from "react-router";
import { useDateStore } from "@/store/day";
import { Button } from "./ui/button";

function DayButtons() {
    const navigate = useNavigate();
    const selectedDate = useDateStore((s) => s.selectedDate);

    const previousDay = () => {
        if (selectedDate.getDay() === 0) {
            console.log("sunday");
        }
    };

    const nextDay = () => {
        if (selectedDate.getDay() === 4) {
            console.log("thursday");
        }
    };

    console.log(selectedDate);

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
