import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { X } from 'lucide-react';
import { IModal } from './interface';

const Modal = ({
  children,
  button,
  tittle,
  description,
  classNameButtonX,
  classNameTittle,
  classNameContent,
  classNameDescription,
  classNameHeader,
  onOpenChange,
  open,
}: IModal) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <button type="button" className={`${classNameButtonX}`}>
        {button}
      </button>
      <AlertDialogContent className={`${classNameContent}`}>
        <AlertDialogCancel className="border-none shadow-none" asChild>
          <button className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </button>
        </AlertDialogCancel>
        <AlertDialogHeader className={`${classNameHeader}`}>
          <AlertDialogTitle className={`${classNameTittle}`}>
            {tittle}
          </AlertDialogTitle>
          <AlertDialogDescription className={`${classNameDescription}`}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
