import type React from "react";
import { create } from "zustand";

type ModalType = "addShift" | "deleteShift" | null;

type ModalState = {
	isOpen: boolean;
	type: ModalType;
	element: React.ReactElement | null;
	openModal: (type: ModalType, element: React.ReactElement) => void;
	closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	type: null,
	element: null,
	openModal: (type, element) => set({ type, element }),
	closeModal: () => set({ type: null, element: null }),
}));
