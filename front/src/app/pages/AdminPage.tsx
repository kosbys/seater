import { AddSection } from "@/components/section/AddSection";
import { Section } from "@/components/section/Section";
import { AddStation } from "@/components/station/AddStation";

function AdminPage() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="flex flex-row gap-4">
        <AddSection />
        <Section />
      </div>
      <div className="flex flex-row gap-4">
        <AddStation />
      </div>
    </div>
  );
}

export { AdminPage };
