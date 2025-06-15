import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import FileInput from '@/common/components/FileInput';
import DateInput from '@/common/components/DateInput';
import MultiSelectInput from '@/common/components/MultiSelectInput';
import { Textarea } from '@/components/ui/textarea';
import { FieldType } from '@/features/newService/services';
import { cn } from '../lib/utils';

type DynamicInputProps = {
  type: FieldType;
  value: any;
  onChange: (value: any) => void;
  invalid: boolean;
  hint?: string;
  placeholder?: string;
  options?: string[];
};

const DynamicInput = ({
  type,
  placeholder,
  options,
  value,
  hint,
  onChange,
  invalid,
}: DynamicInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {type === 'text' && (
        <Input
          placeholder={placeholder}
          className="bg-background"
          value={value ?? ''}
          onChange={onChange}
          aria-invalid={invalid}
        />
      )}
      {type === 'textarea' && (
        <Textarea
          placeholder={placeholder}
          className="bg-background"
          value={value}
          onChange={onChange}
          aria-invalid={invalid}
        />
      )}
      {type === 'select' && options && options?.length > 0 && (
        <Select value={value ?? ''} onValueChange={onChange}>
          <SelectTrigger
            className={cn(
              'w-full',
              invalid && 'border-destructive ring-destructive'
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, i) => (
              <SelectItem key={`${option}-${i}`} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {type === 'date' && (
        <DateInput
          onChange={onChange}
          value={value}
          placeholder={placeholder ?? ''}
          invalid={invalid}
        />
      )}
      {type === 'file' && (
        <FileInput
          onChange={onChange}
          placeholder={placeholder ?? ''}
          value={value}
          invalid={invalid}
        />
      )}
      {type === 'multiSelect' && options && options.length > 0 && (
        <MultiSelectInput value={value} onChange={onChange} options={options} />
      )}
      {!!hint && (
        <span className="text-sm font-normal leading-5 text-muted-foreground">
          {hint}
        </span>
      )}
    </div>
  );
};

export default DynamicInput;
