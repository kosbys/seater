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

<<<<<<< HEAD
	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			<DialogContent className="transition-none w-fit">
				<DialogHeader>
					<DialogTitle>הרשמה למשמרת</DialogTitle>
					<DialogDescription></DialogDescription>
					{element}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
=======
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
>>>>>>> 2e088bbac77e871fce82f3580dff39445ec2ba08
}

export { ShiftModal };
