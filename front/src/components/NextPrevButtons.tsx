import { Button } from "./ui/button";

type ButtonProps = {
	previous: () => void;
	next: () => void;
};

// on dock?

function NextPrevButtons({ previous, next }: ButtonProps) {
	return (
		<>
			<Button type="button" onClick={previous}>
				קודם
			</Button>
			<Button type="button" onClick={next}>
				הבא
			</Button>
		</>
	);
}

export { NextPrevButtons };
