import type React from "react";
import { create } from "zustand";

type ModalState = {
	isOpen: boolean;
	element: React.ReactElement | null;
	openModal: (element: React.ReactElement) => void;
	closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
	isOpen: false,
	element: null,
	openModal: (element) => set({ element }),
	closeModal: () => set({ element: null }),
}));
