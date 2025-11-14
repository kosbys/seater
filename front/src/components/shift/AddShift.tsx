// range selector?
// check station data before sending?
// form
// get station info via props?
// get date via store

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z, { number } from "zod";
import { createShift, getShiftsByDay } from "@/api/shift";
import { useDateStore } from "@/store/day";
import type { Shift } from "@/types/types";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
});

// prop that selects the station for you if you are in DayPage, if not set then add a form field to quick-select a station?
function AddShift({ stationID }: { stationID: number }) {
  const queryClient = useQueryClient();
  const selectedDate = useDateStore((s) => s.selectedDate);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });

  const { data: shifts, isLoading } = useQuery<Shift[]>({
    queryKey: ["dayShifts", selectedDate],
    queryFn: () => {
      if (!selectedDate) throw new Error("no date selected");
      return getShiftsByDay(selectedDate.toISOString().split("T")[0]);
    },
    enabled: !!selectedDate,
  });

  const addShiftMutation = useMutation({
    mutationFn: ({
      stationID,
      date,
      startTime,
      endTime,
    }: {
      stationID: number;
      date: Date;
      startTime: string;
      endTime: string;
    }) => createShift(stationID, date, startTime, endTime),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dayShifts", selectedDate] });
      form.reset();
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { startTime, endTime } = values;
    console.log(values);
    console.log(selectedDate);

    // check for overlap in shifts and our sent time

    if (!selectedDate) return console.error("No date found");

    addShiftMutation.mutate({
      stationID,
      date: selectedDate,
      startTime,
      endTime,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-2 p-6"
      >
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem className="" dir="rtl">
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  dir="rtl"
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="התחלה" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="9">09:00</SelectItem>
                      <SelectItem value="10">10:00</SelectItem>
                      <SelectItem value="11">11:00</SelectItem>
                      <SelectItem value="12">12:00</SelectItem>
                      <SelectItem value="13">13:00</SelectItem>
                      <SelectItem value="14">14:00</SelectItem>
                      <SelectItem value="15">15:00</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem className="" dir="rtl">
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  dir="rtl"
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="סוף" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="9">09:00</SelectItem>
                      <SelectItem value="10">10:00</SelectItem>
                      <SelectItem value="11">11:00</SelectItem>
                      <SelectItem value="12">12:00</SelectItem>
                      <SelectItem value="13">13:00</SelectItem>
                      <SelectItem value="14">14:00</SelectItem>
                      <SelectItem value="15">15:00</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">הוספה</Button>
      </form>
    </Form>
  );
}

export { AddShift };
