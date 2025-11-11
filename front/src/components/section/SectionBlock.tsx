import type { Section } from "@/types/types";
import { StationBlock } from "../station/StationBlock";

function SectionBlock({ section }: { section: Section }) {
	const stations = section.stations;

	return (
		<div className="border-2 p-2">
			<span>{section.name}</span>
			<div className="grid grid-cols-2 gap-1">
				{stations.map((station) => (
					<StationBlock key={station.id} station={station} />
				))}
			</div>
		</div>
	);
}

export { SectionBlock };
