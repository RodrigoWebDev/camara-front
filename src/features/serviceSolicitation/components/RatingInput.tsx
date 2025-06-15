import { cn } from '@/common/components/lib/utils';
import { Star } from 'lucide-react';

type RatingInputProps = {
  onChange: (value: number) => void;
  value: number;
  invalid: boolean;
};

const RatingInput = ({ onChange, value, invalid }: RatingInputProps) => {
  const label = ['Muito difícil', 'Difícil', 'Neutro', 'Fácil', 'Muito fácil'];

  return (
    <div className="flex justify-center gap-4 w-full">
      {label.map((item, i) => (
        <button
          key={i}
          className="cursor-pointer flex flex-col gap-2 items-center"
          type="button"
          onClick={() => onChange(i + 1)}
        >
          <Star
            size={40}
            strokeWidth={1}
            className={cn(
              !invalid ? 'text-input' : 'text-destructive',
              value > i && 'fill-yellow-400 text-yellow-400'
            )}
          />
          <span
            className={cn(
              'text-center text-muted-foreground text-xs leading-normal',
              invalid && 'text-destructive'
            )}
          >
            {item}
          </span>
        </button>
      ))}
    </div>
  );
};

export default RatingInput;
