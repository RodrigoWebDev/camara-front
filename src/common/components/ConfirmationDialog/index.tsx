import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

type ConfirmationDialogProps = {
  title: string;
  onConfirm: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ConfirmationDialog = ({
  title,
  onConfirm,
  open,
  setOpen,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="w-full flex gap-4">
          <Button
            variant="secondary"
            className="flex-1 cursor-pointer"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Sim
          </Button>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            className="flex-1 cursor-pointer"
          >
            Não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
