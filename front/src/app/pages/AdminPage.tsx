import { useQuery } from "@tanstack/react-query";
import { getSections } from "@/api/section";
import { AddSection } from "@/components/section/AddSection";
import { AddStation } from "@/components/station/AddStation";

// use dropdown to select section when adding station
function AdminPage() {
  const { data } = useQuery({
    queryKey: ["sections"],
    queryFn: getSections,
  });

  console.log(data);

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
