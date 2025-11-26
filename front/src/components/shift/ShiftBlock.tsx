import type { Shift } from "@/types/types";
import { numberToTimeString } from "@/utils/shift";

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
                <span className="">{numberToTimeString(shift.startTime)}</span>
                <span> - </span>
                <span>{numberToTimeString(shift.endTime)}</span>
            </div>
        </div>
    );
}

export { ShiftBlock };
