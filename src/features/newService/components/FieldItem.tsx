import { Button } from '@/common/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';

type FieldItemProps = {
  label: string;
  type: string;
  required: boolean;
  onDelete: () => void;
};

const FieldItem = ({ label, type, required, onDelete }: FieldItemProps) => {
  return (
    <div className="px-4 py-2 flex justify-between items-center rounded-md bg-muted">
      <div className="flex items-center gap-2">
        <GripVertical size={16} />
        <span className="text-base font-medium leading-6 text-foreground">
          {label}
        </span>
        <span className="text-xs font-normal leading-none text-muted-foreground">
          ({type}
          {required && ', obrigatório'})
        </span>
      </div>
      <Button variant="ghost" onClick={onDelete} type="button">
        <Trash2 className="text-destructive" size={16} />
      </Button>
    </div>
  );
};

export default FieldItem;
