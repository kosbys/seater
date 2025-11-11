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
	type: z.enum(["", "laptop", "computer", "tablet", "monitor"]),
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
			type: "",
			section: "",
		},
	});

	const addStationMutation = useMutation({
		mutationFn: ({
			sectionID,
			type,
			name,
		}: {
			sectionID: number;
			type: "laptop" | "computer" | "tablet" | "monitor" | "";
			name: string;
		}) => createStation(sectionID, type, name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["sections"] });
			form.reset();
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		const { section, type, name } = values;

		// convert ID to number
		addStationMutation.mutate({
			sectionID: +section,
			type,
			name,
		});
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
						name="type"
						render={({ field }) => (
							<FormItem className="" dir="rtl">
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										dir="rtl"
									>
										<SelectTrigger className="w-36">
											<SelectValue placeholder="סוג עמדה" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="computer">מחשב</SelectItem>
												<SelectItem value="monitor">מסך</SelectItem>
												<SelectItem value="laptop">לאפטופ</SelectItem>
												<SelectItem value="tablet">טבלט</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* select type */}

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
