import type { Station } from "@/types/types";

function StationBlock({ station }: { station: Station }) {
	return (
		<div className="w-32 h-32 border-2 flex flex-col p-2">
			<span>{station.name}</span>
			<span>{station.computer ? "מחשב" : "אין מחשב :("}</span>
			<span>{station.monitor ? "מסך" : "אין מסך :("}</span>
		</div>
	);
}

export { StationBlock };
