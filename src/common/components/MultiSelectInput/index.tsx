import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '../lib/utils';

type MultiSelectInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  disabled?: boolean;
};

const MultiSelectInput = ({
  value,
  onChange,
  options,
  disabled = false,
}: MultiSelectInputProps) => {
  const formValue = value ?? [];
  const isChecked = (option: string) => formValue?.includes(option);

  const handleChange = (checked: string | boolean, option: string) => {
    const updated = checked
      ? [...formValue, option]
      : formValue.filter((v) => v !== option);
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-2 pt-2">
      {options.map((option, i) => {
        return (
          <div key={`${option}-${i}`} className="flex items-center gap-2">
            <Checkbox
              checked={isChecked(option)}
              onCheckedChange={(checked) => handleChange(checked, option)}
              disabled={disabled}
            />
            <span
              className={cn(
                'text-sm font-medium leading-none text-foreground',
                disabled && 'opacity-70'
              )}
            >
              {option}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MultiSelectInput;
