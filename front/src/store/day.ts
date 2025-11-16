import { create } from "zustand";

interface DateState {
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
}

export const useDateStore = create<DateState>((set) => ({
	selectedDate: new Date(0),
	setSelectedDate: (date) => set({ selectedDate: date }),
}));
