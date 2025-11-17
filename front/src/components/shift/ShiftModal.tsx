import { useModalStore } from "@/store/modal";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

function ShiftModal() {
	const { isOpen, element, closeModal } = useModalStore();

	if (!isOpen) return null;

	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			<DialogContent className="transition-none w-fit">
				<DialogHeader>
					<DialogTitle>Modal</DialogTitle>
					<DialogDescription></DialogDescription>
					{element}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export { ShiftModal };
