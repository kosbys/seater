import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { createShift } from "@/api/shift";
import { useDateStore } from "@/store/day";
import { useModalStore } from "@/store/modal";
import type { Shift } from "@/types/types";
import { checkTakenRange, checkTakenTime } from "@/utils/shift";
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

const hours = [9, 10, 11, 12, 13, 14, 15];

function AddShift({
	stationID,
	filteredShifts,
}: {
	stationID: number;
	filteredShifts: Shift[];
}) {
	const closeModal = useModalStore((s) => s.closeModal);
	const queryClient = useQueryClient();
	const selectedDate = useDateStore((s) => s.selectedDate);

	const takenRanges = checkTakenRange(filteredShifts);

	const formSchema = z
		.object({
			startTime: z.string(),
			endTime: z.string(),
		})
		.superRefine(({ startTime, endTime }, context) => {
			if (!filteredShifts) return;

			if (+startTime >= +endTime) {
				context.addIssue({
					code: "custom",
					message: "זמן התחלה חייב להיות לפני זמן סיום",
					path: ["startTime"],
				});
				return;
			}

			if (filteredShifts.length === 0) {
				return;
			}

			const overlap = filteredShifts.some(
				(shift) => +startTime < shift.endTime && +endTime > shift.startTime,
			);

			if (overlap) {
				context.addIssue({
					code: "custom",
					message: "לא ניתן להירשם לזמן של משמרת נוכחת",
					path: ["startTime"],
				});
			}
		});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			startTime: "",
			endTime: "",
		},
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
			startTime: number;
			endTime: number;
		}) => createShift(stationID, date, startTime, endTime),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["shifts", "day", selectedDate],
			});
			form.reset();
			closeModal();
		},
	});

	// check overlap
	async function onSubmit({ startTime, endTime }: z.infer<typeof formSchema>) {
		console.log(selectedDate);

		if (!selectedDate) return console.error("No date found");

		addShiftMutation.mutate({
			stationID,
			date: selectedDate,
			startTime: Number(startTime),
			endTime: Number(endTime),
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-fit self-center p-6 flex flex-col gap-1"
			>
				<div className="flex flex-row gap-2">
					<Button
						type="button"
						onClick={() => {
							form.setValue("startTime", 9);
							form.setValue("endTime", 13);
						}}
					>
						משמרת בוקר
					</Button>
					<Button
						type="button"
						onClick={() => {
							form.setValue("startTime", 11);
							form.setValue("endTime", 15);
						}}
					>
						משמרת צהריים
					</Button>
				</div>

				<div className="flex flex-col gap-2">
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
												{hours.map((hour) => (
													<SelectItem
														key={hour}
														value={String(hour)}
														disabled={checkTakenTime(hour, takenRanges)}
													>
														{hour.toString().padStart(2, "0")}:00
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
												{hours.map((hour) => (
													<SelectItem
														key={hour}
														value={String(hour)}
														disabled={checkTakenTime(hour, takenRanges)}
													>
														{hour.toString().padStart(2, "0")}:00
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

				<Button type="submit" className="w-fit self-end">
					הוספה
				</Button>
			</form>
		</Form>
	);
}

export { AddShift };
