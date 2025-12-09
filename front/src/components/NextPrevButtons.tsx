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
				Previous
			</Button>
			<Button type="button" onClick={next}>
				Next
			</Button>
		</>
	);
}

export { NextPrevButtons };
