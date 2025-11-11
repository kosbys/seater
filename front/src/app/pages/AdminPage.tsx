import { AddSection } from "@/components/section/AddSection";
import { SectionList } from "@/components/section/SectionList";
import { AddStation } from "@/components/station/AddStation";

function AdminPage() {
	return (
		<div className="flex w-full h-full p-4 gap-4">
			<div className="flex flex-col flex-1 items-start gap-4">
				<AddSection />
				<AddStation />
			</div>

			<div className="flex flex-col flex-2 items-start gap-4">
				<SectionList />
			</div>
		</div>
	);
}

export { AdminPage };
