// like adminpage

import { useParams } from "react-router";
import { SectionList } from "@/components/section/SectionList";
import { urlParamToDate } from "@/utils/date";
import { NotFound } from "./NotFound";

function DayPage() {
  const { day } = useParams<{ day: string }>();

  if (!day) {
    return <NotFound />;
  }

  const date = urlParamToDate(day);

  console.log(date);

  return (
    <div className="flex flex-col flex-2 items-center gap-4 pt-4">
      <SectionList />
    </div>
  );
}

export { DayPage };
