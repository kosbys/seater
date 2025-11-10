import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { createSection } from "@/api/section";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "לפחות 2 תווים",
  }),
});

function AddSection() {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const addSectionMutation = useMutation({
    mutationFn: ({ name }: { name: string }) => createSection(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      form.reset();
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    addSectionMutation.mutate({ name: values.name });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border-2 p-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>שם סקשן</FormLabel>
              <FormControl>
                <Input placeholder="שמש" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">הוספת סקשן</Button>
      </form>
    </Form>
  );
}

export { AddSection };
