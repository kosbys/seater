import type { Station } from "@/types/types";

function StationBlock({ station }: { station: Station }) {
	return (
		<div className="w-32 h-32 border-2 flex flex-col p-2">
			<span>{station.name}</span>
			<span>{station.type}</span>
		</div>
	);
}

export { StationBlock };
