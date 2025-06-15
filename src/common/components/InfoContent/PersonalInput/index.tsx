import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useMask } from '@react-input/mask';
import { forwardRef } from 'react';

interface PersonalInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  htmlFor: string;
  isAddress?: boolean;
  mask?: string;
  isLoading?: boolean;
}

const PersonalInput = forwardRef<HTMLInputElement, PersonalInputProps>(
  ({ label, htmlFor, isAddress, mask, className, ...rest }, ref) => {
    const inputDivStyle = 'flex flex-col items-start gap-2 self-stretch';
    const inputStyle =
      'flex h-10 px-3 py-2 items-center gap-1 self-stretch rounded-md border border-input bg-background';
    const contentStyle =
      'flex flex-col min-w-48 items-start gap-2 flex-[1_0_0] w-full';
    const addressStyle =
      'flex flex-col min-w-96 items-start gap-2 flex-[1_0_0]';
    const labelStyle =
      'self-stretch text-base font-medium leading-none text-foreground font-sans';

    const maskedRef = mask
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useMask({ mask, replacement: { _: /\d/ } })
      : undefined;

    return (
      <div className={isAddress ? addressStyle : contentStyle}>
        <Label htmlFor={htmlFor} className={labelStyle}>
          {label}
        </Label>
        <div className={inputDivStyle}>
          <Input
            {...rest}
            ref={maskedRef || ref}
            className={`${inputStyle} ${className ?? ''}`}
          />
        </div>
      </div>
    );
  }
);

PersonalInput.displayName = 'PersonalInput';

export default PersonalInput;
