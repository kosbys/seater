import { Laptop, Monitor, PcCase, Tablet } from "lucide-react";
import type { StationType } from "@/types/types";

function StationTypeIcon({ type }: { type: StationType }) {
	switch (type) {
		case "computer":
			return <PcCase className="self-center size-6" />;
		case "laptop":
			return <Laptop className="self-center size-6" />;
		case "tablet":
			return <Tablet className="self-center size-6" />;
		case "monitor":
			return <Monitor className="self-center size-6" />;
		default:
			return null;
	}
}

export { StationTypeIcon };
