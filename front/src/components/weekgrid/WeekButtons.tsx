import { Button } from "../ui/button";

type WeekButtonProps = {
  previousWeek: () => void;
  nextWeek: () => void;
};

function WeekButtons({ previousWeek, nextWeek }: WeekButtonProps) {
  return (
    <>
      <Button type="button" onClick={previousWeek}>
        Previous
      </Button>
      <Button type="button" onClick={nextWeek}>
        Next
      </Button>
    </>
  );
}

export { WeekButtons };
