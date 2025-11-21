import z from "zod";

export type StationType = "laptop" | "computer" | "tablet" | "monitor" | "";

export type Station = {
    id: number;
    name: string;
    type: StationType;
};

export type Section = {
    id: number;
    name: string;
    stations: Station[];
};

export type Shift = {
    id: number;
    username: string;
    userID: number;
    stationID: number;
    sectionName: string;
    stationName: string;
    date: Date;
    startTime: number;
    endTime: number;
};

export const shiftSchema = z.object({
    id: z.number().int().nonnegative(),
    username: z.string(),
    userID: z.number().int().nonnegative(),
    stationID: z.number().int().nonnegative(),
    sectionName: z.string(),
    stationName: z.string(),
    date: z.coerce.date(),
    startTime: z.number().int().nonnegative(),
    endTime: z.number().int().nonnegative(),
});

export const shiftsResponseSchema = z.object({
    shifts: z.array(shiftSchema).nullable(),
});

// make section schema?
