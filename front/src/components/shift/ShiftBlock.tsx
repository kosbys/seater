import type { Shift } from "@/types/types";

function ShiftBlock({ shift }: { shift: Shift }) {
	return (
		<div
			key={shift.id}
			className="border rounded-md text-sm bg-muted flex flex-col gap-1 p-1"
		>
			<div className="text-center">
				<span className="text-center">{shift.username}</span>
			</div>
			<div>
				<span className="">{shift.startTime}:00</span>
				<span>-</span>
				<span>{shift.endTime}:00</span>
			</div>
		</div>
	);
}

export { ShiftBlock };
