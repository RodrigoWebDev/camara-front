import { cn } from '@/common/components/lib/utils';

interface Step {
  id: number;
  title: string;
}

interface StepperProps {
  steps: Step[];
  current: number;
}

const Stepper = ({ steps, current }: StepperProps) => {
  return (
    <div className="flex items-center px-8 w-full">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center flex-1">
          <div className="flex items-center w-full">
            {index !== 0 && <div className="h-px bg-border w-full" />}
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold leading-none aspect-square',
                current === step.id
                  ? 'text-primary-foreground bg-primary'
                  : 'text-muted-foreground bg-muted'
              )}
            >
              {step.id}
            </div>
            {index < steps.length - 1 && (
              <div className="h-px bg-border w-full" />
            )}
          </div>
          <span
            className={cn(
              'text-sm font-medium mt-1',
              current === step.id ? 'text-primary' : 'text-muted-foreground',
              index === 0 && 'text-left w-full',
              index === steps.length - 1 && 'text-right w-full',
              index !== 0 && index !== steps.length - 1 && 'text-center w-full'
            )}
          >
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
