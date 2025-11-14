// range selector?
// check station data before sending?
// form
// get station info via props?
// get date via store

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useDateStore } from "@/store/day";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  startTime: z.number(),
  endTime: z.number(),
});

function AddShift() {
  const selectedDate = useDateStore((s) => s.selectedDate);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"> </Button>
      </form>
    </Form>
  );
}

export { AddShift };
