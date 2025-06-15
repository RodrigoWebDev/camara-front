import { Progress } from '@/components/ui/progress';
import { CircleCheck } from 'lucide-react';
import { cn } from '../lib/utils';

type Step = {
  id: number;
  title: string;
  show?: boolean;
};

type StepperProgressProps = {
  steps: Step[];
  current: number;
};

const StepperProgress = ({ steps, current }: StepperProgressProps) => {
  const progress = (current / (steps.length - 1)) * 100;

  return (
    <div className="flex flex-col items-start gap-2 px-6 self-stretch">
      <div className="flex flex-col items-start gap-2 p-0 self-stretch">
        <p className="text-sm font-normal leading-5 text-foreground">
          Progresso
        </p>
        <Progress value={progress} className="w-full" />
      </div>
      <div className="flex flex-row justify-between items-start gap-6 self-stretch">
        {steps.map(
          (step, i) =>
            step.show && (
              <div
                key={i}
                className="flex flex-col justify-center items-center gap-1"
              >
                <div
                  className={cn(
                    'flex flex-col justify-center items-center w-8 h-8 p-0 gap-2 rounded-full border-2 border-muted-foreground bg-transparent',
                    step.id <= current && 'border-primary bg-primary'
                  )}
                >
                  {step.id <= current ? (
                    <CircleCheck className="w-4 h-4 shrink-0 text-white" />
                  ) : (
                    <span className="text-xs font-medium leading-4 text-muted-foreground">
                      {step.id}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium leading-4 text-muted-foreground',
                    step.id <= current && 'text-primary'
                  )}
                >
                  {step.title}
                </span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default StepperProgress;
