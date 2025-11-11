import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

import { getSections } from "@/api/section";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Section } from "@/types/types";
import { createStation } from "@/api/station";
import { Input } from "../ui/input";

const formSchema = z.object({
  name: z.string("בבקשה לבחור שם").min(1, {
    message: "בבקשה לבחור שם",
  }),
  section: z.string().min(1, {
    message: "בבקשה לבחור סקשן",
  }),
  computer: z.boolean(),
  monitor: z.boolean(),
});

function AddStation() {
  const { data: sections, isLoading } = useQuery({
    queryKey: ["sections"],
    queryFn: getSections,
  });
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      computer: false,
      monitor: false,
      section: "",
    },
  });

  const addStationMutation = useMutation({
    mutationFn: ({
      sectionID,
      computer,
      monitor,
      name,
    }: {
      sectionID: number;
      computer: boolean;
      monitor: boolean;
      name: string;
    }) => createStation(sectionID, computer, monitor, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      form.reset();
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const { section, computer, monitor, name } = values;

    // convert ID to number
    addStationMutation.mutate({ sectionID: +section, computer, monitor, name });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-2 p-6"
      >
        <div className="flex flex-col items-start gap-12">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שם עמדה</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="monitor"
            render={({ field }) => (
              <FormItem className="flex flex-row-reverse">
                <FormLabel className="text-lg">מסך</FormLabel>
                <FormControl>
                  <Checkbox
                    className="w-6 h-6"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="computer"
            render={({ field }) => (
              <FormItem className="flex flex-row-reverse">
                <FormLabel className="text-lg">מחשב</FormLabel>
                <FormControl>
                  <Checkbox
                    className="w-6 h-6"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem className="" dir="rtl">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    dir="rtl"
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="בחירת סקשן" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {!isLoading &&
                          sections?.map((section: Section) => (
                            <SelectItem
                              value={section.id.toString()}
                              key={section.id}
                            >
                              {section.name}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">הוספת עמדה</Button>
      </form>
    </Form>
  );
}

export { AddStation };
