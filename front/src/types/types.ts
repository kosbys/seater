export type StationType = "laptop" | "computer" | "tablet" | "monitor";

export type Station = {
	id: number;
	name: string;
	type: StationType;
};

export type Section = {
	id: number;
	name: string;
	stations: Station[];
};

export type Shift = {
	name: string;
};
