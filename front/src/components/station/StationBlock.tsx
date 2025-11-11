import type { Station } from "@/types/types";
import { StationTypeIcon } from "./StationTypeIcon";

function StationBlock({ station }: { station: Station }) {
	return (
		<div className="w-32 h-32 border-2 flex flex-col p-2 gap-1">
			<span className="text-lg">{station.name}</span>
			<span className="">
				<StationTypeIcon type={station.type} />
			</span>
		</div>
	);
}

export { StationBlock };
