import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { deleteStation } from "@/api/station";
import { useShiftsDay } from "@/hooks/useShiftsDay";
import { useAuthStore } from "@/store/auth";
import { useDateStore } from "@/store/day";
import { useModalStore } from "@/store/modal";
import type { Shift, Station, StationType } from "@/types/types";
import { AddShift } from "../shift/AddShift";
import { Button } from "../ui/button";
import { StationTypeIcon } from "./StationTypeIcon";

function StationBlock({ station }: { station: Station }) {
	const openModal = useModalStore((s) => s.openModal);
	const [filteredShifts, setFilteredShifts] = useState<Shift[]>([]);
	const queryClient = useQueryClient();
	const selectedDate = useDateStore((s) => s.selectedDate);
	const user = useAuthStore((s) => s.user);

	const { data: shifts, isLoading } = useShiftsDay(selectedDate);

	const deleteSectionMutation = useMutation({
		mutationFn: (id: number) => deleteStation(id.toString()),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sections"] });
		},
	});

	const fullShiftTaken = () => {
		const hasStart = filteredShifts.some((shift) => shift.startTime === 9);
		const hasEnd = filteredShifts.some((shift) => shift.endTime === 15);
		return hasStart && hasEnd;
	};

	const typeToHebrew = (type: StationType) => {
		switch (type) {
			case "laptop": {
				return "מחשב נייד";
			}
			case "computer": {
				return "מחשב";
			}
			case "tablet": {
				return "טאבלט";
			}
			case "monitor": {
				return "מסך";
			}
			case "empty": {
				return "";
			}
		}
	};

	useEffect(() => {
		if (shifts) {
			setFilteredShifts(
				shifts.filter((shift) => shift.stationID === station.id),
			);
		}
	}, [shifts, station.id]);

	return (
		<div>
			<Button
				asChild
				variant="ghost"
				className={clsx(
					"group border-2 flex flex-col justify-around p-2 gap-1 hover:opacity-70",
					{
						"border-green-300": filteredShifts.length === 0,
						"border-amber-300": filteredShifts.length > 0,
						"border-red-300": fullShiftTaken(),
					},
				)}
				onClick={() => {
					if (!fullShiftTaken()) {
						openModal(
							<AddShift
								stationID={station.id}
								filteredShifts={filteredShifts}
							/>,
						);
					}
				}}
			>
				<div className="w-fit h-fit min-h-46 min-w-46 flex flex-col justify-start gap-2">
					<div className="flex flex-row gap-2">
						<StationTypeIcon type={station.type} />
						<span className="text-lg">{station.name}</span>
						{/* map station types to hebrew */}
						<span className="text-lg">{typeToHebrew(station.type)}</span>
					</div>

					<div className="flex flex-col gap-2">
						{filteredShifts?.length
							? filteredShifts.map((shift) => (
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
								))
							: null}
					</div>

					{user?.role === "admin" && (
						<Button
							variant="destructive"
							className="self-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-black"
							onClick={(e) => {
								e.stopPropagation();
								deleteSectionMutation.mutate(station.id);
							}}
						>
							מחק
						</Button>
					)}
				</div>
			</Button>
		</div>
	);
}

export { StationBlock };
