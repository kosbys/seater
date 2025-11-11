export type Station = {
	id: number;
	name: string;
	type: "laptop" | "computer" | "tablet" | "monitor";
};

export type Section = {
	id: number;
	name: string;
	stations: Station[];
};
