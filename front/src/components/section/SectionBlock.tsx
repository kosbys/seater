import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSection } from "@/api/section";
import { useAuthStore } from "@/store/auth";
import type { Section, Station } from "@/types/types";
import { StationBlock } from "../station/StationBlock";
import { Button } from "../ui/button";

function SectionBlock({ section }: { section: Section }) {
	const queryClient = useQueryClient();
	const user = useAuthStore((s) => s.user);

	const stations = section.stations;

	const deleteSectionMutation = useMutation({
		mutationFn: (id: number) => deleteSection(id.toString()),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sections"] });
		},
	});

	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center justify-between pb-1">
				<span className="text-lg">{section.name}</span>
				{user?.role === "admin" && (
					<Button
						variant="destructive"
						className=""
						onClick={() => {
							deleteSectionMutation.mutate(section.id);
						}}
					>
						מחק
					</Button>
				)}
			</div>

			<div className="grid grid-cols-2 gap-1">
				{stations.map((station: Station) => (
					<StationBlock key={station.id} station={station} />
				))}
			</div>
		</div>
	);
}

export { SectionBlock };
