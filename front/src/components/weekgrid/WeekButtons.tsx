import { Button } from "../ui/button";

type WeekButtonProps = {
    previousWeek: () => void;
    nextWeek: () => void;
};

// on dock?

function WeekButtons({ previousWeek, nextWeek }: WeekButtonProps) {
    return (
        <div className="flex flex-row gap-2">
            <Button type="button" onClick={previousWeek}>
                Previous
            </Button>
            <Button type="button" onClick={nextWeek}>
                Next
            </Button>
        </div>
    );
}

export { WeekButtons };
