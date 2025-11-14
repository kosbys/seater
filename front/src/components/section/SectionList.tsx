import { useQuery } from "@tanstack/react-query";
import { getSections } from "@/api/section";
import type { Section } from "@/types/types";
import { SectionBlock } from "./SectionBlock";

function SectionList() {
  const { data: sections, isLoading } = useQuery({
    queryKey: ["sections"],
    queryFn: getSections,
  });

  return (
    <div className="flex flex-col gap-4">
      {!isLoading &&
        sections.map((section: Section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
    </div>
  );
}

export { SectionList };
