import { create } from "zustand";

interface DateState {
	currentDate: string | null;
	setCurrentDate: (date: string) => void;
}

export const useDateStore = create<DateState>((set) => ({
	currentDate: null,
	setCurrentDate: (date) => set({ currentDate: date }),
}));
