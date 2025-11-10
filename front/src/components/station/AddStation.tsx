import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
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

const formSchema = z.object({
  section: z.string(),
  computer: z.boolean(),
  monitor: z.boolean(),
});

function AddStation() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      computer: false,
      monitor: false,
      section: "",
    },
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
        <div className="flex flex-col items-start gap-12">
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
                        <SelectLabel>סקשנים</SelectLabel>
                        <SelectItem value="apple">שמש</SelectItem>
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
