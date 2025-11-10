import { AddSection } from "@/components/section/AddSection";
import { Section } from "@/components/section/Section";
import { AddStation } from "@/components/station/AddStation";

// use dropdown to select section when adding station
function AdminPage() {
  return (
    <div className="flex flex-col w-full h-full items-start p-10 gap-4">
      <div className="flex flex-row gap-4">
        <AddSection />
      </div>
      <div className="flex flex-row gap-4">
        <AddStation />
      </div>
    </div>
  );
}

export { AdminPage };
