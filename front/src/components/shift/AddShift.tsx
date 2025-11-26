import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { createShift } from "@/api/shift";
import { useDateStore } from "@/store/day";
import { useModalStore } from "@/store/modal";
import type { Shift } from "@/types/types";
import { getSelectableHours } from "@/utils/hours";
import {
    checkTakenRange,
    checkTakenTime,
    timeStringToNumber,
} from "@/utils/shift";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

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
    const [showHalfHours, setShowHalfHours] = useState(false);

    const takenRanges = checkTakenRange(filteredShifts);

    const formSchema = z
        .object({
            startTime: z.string(),
            endTime: z.string(),
        })
        .superRefine(({ startTime, endTime }, context) => {
            if (!filteredShifts) return;

            const startNum = timeStringToNumber(startTime);
            const endNum = timeStringToNumber(endTime);

            if (startNum >= endNum) {
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
                (shift) => startNum < shift.endTime && endNum > shift.startTime,
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

    async function onSubmit({
        startTime,
        endTime,
    }: z.infer<typeof formSchema>) {
        console.log(selectedDate);

        if (!selectedDate) return console.error("No date found");

        addShiftMutation.mutate({
            stationID,
            date: selectedDate,
            startTime: timeStringToNumber(startTime),
            endTime: timeStringToNumber(endTime),
        });
    }

    const hours = getSelectableHours(showHalfHours, 9, 15);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-fit self-center p-6 flex flex-col gap-1"
            >
                <div className="flex flex-row gap-2">
                    <Button
                        type="button"
                        onClick={() => {
                            form.setValue("startTime", "09:00");
                            form.setValue("endTime", "13:00");
                        }}
                    >
                        משמרת בוקר
                    </Button>
                    <Button
                        type="button"
                        onClick={() => {
                            form.setValue("startTime", "11:00");
                            form.setValue("endTime", "15:00");
                        }}
                    >
                        משמרת צהריים
                    </Button>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="half-hour"
                            defaultChecked={false}
                            checked={showHalfHours}
                            onCheckedChange={(v) =>
                                setShowHalfHours(v as boolean)
                            }
                        ></Checkbox>
                        <Label>הראה חצאי שעה</Label>
                    </div>

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
                                                        disabled={checkTakenTime(
                                                            hour,
                                                            takenRanges,
                                                        )}
                                                    >
                                                        {hour}
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
                                                        disabled={checkTakenTime(
                                                            hour,
                                                            takenRanges,
                                                        )}
                                                    >
                                                        {hour}
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
