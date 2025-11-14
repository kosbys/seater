import { useModalStore } from "@/store/modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function ShiftModal() {
  const { isOpen, element, closeModal } = useModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
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
