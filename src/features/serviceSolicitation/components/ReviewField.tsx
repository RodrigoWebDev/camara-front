import { cn } from '@/common/components/lib/utils';
import { FileText } from 'lucide-react';

type ReviewFieldProps = {
  label: string;
  value: string;
  isFile: boolean;
};

const ReviewField = ({ label, value, isFile }: ReviewFieldProps) => {
  return (
    <div className="rounded-md border border-border p-4 flex gap-2">
      {isFile && <FileText size={24} className="text-primary" />}
      <div className="flex flex-col">
        <span
          className={cn(
            'leading-5 text-muted-foreground',
            isFile ? 'text-xs' : 'text-sm font-normal'
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            'leading-6 text-foreground',
            isFile ? 'text-xs' : 'text-base font-medium'
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default ReviewField;
