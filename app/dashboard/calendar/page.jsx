import { Suspense } from "react";
import { Calendar } from "@/components/features/calendar/calendar";
import { CalendarSkeleton } from "@/components/features/calendar/skeletons/calendar-skeleton";

export default function CalendarPage() {
  return (
    <div className="flex max-h-screen my-10 flex-col">
      <div className="container p-4 md:mx-auto">
        <Suspense fallback={<CalendarSkeleton />}>
          <Calendar />
        </Suspense>
      </div>
    </div>
  );
}
