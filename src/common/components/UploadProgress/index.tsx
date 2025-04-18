import { CircleCheck } from 'lucide-react';

type UploadProgressProps = {
  progress: number;
};

const UploadProgress = ({ progress }: UploadProgressProps) => {
  const isStep1Active = progress >= 25;
  const isStep2Active = progress >= 50;
  const isStep3Active = progress >= 100;

  return (
    <div className="flex flex-col items-start gap-2 px-6 self-stretch">
      {/* progress title + percentage */}
      <div className="flex flex-col items-start gap-2 p-0 self-stretch">
        <div className="flex justify-between items-start self-stretch">
          <p className="text-sm font-normal leading-5 text-foreground">
            Progresso
          </p>
          <p className="text-sm font-normal leading-5 text-foreground">
            {Math.round(progress)}%
          </p>
        </div>

        {/* progress bar */}
        <div className="w-full h-2 bg-muted rounded-full">
          <div
            className="h-2 bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* labels */}
      <div className="flex flex-row justify-between items-start gap-6 self-stretch">
        <StepItem active={isStep1Active} label="Documento" stepNumber={1} />
        <StepItem active={isStep2Active} label="Selfie" stepNumber={2} />
        <StepItem active={isStep3Active} label="E-mail" stepNumber={3} />
      </div>
    </div>
  );
};

type StepItemProps = {
  active: boolean;
  label: string;
  stepNumber: number;
};

const StepItem = ({ active, label, stepNumber }: StepItemProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div
        className={`flex flex-col justify-center items-center w-8 h-8 p-0 gap-2 rounded-full border-2 ${
          active
            ? 'border-primary bg-primary'
            : 'border-muted-foreground bg-transparent'
        }`}
      >
        {active ? (
          <CircleCheck className="w-4 h-4 shrink-0 text-white" />
        ) : (
          <span className="text-xs font-medium leading-4 text-muted-foreground">
            {stepNumber}
          </span>
        )}
      </div>
      <span
        className={`text-xs font-medium leading-4 ${
          active ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        {label}
      </span>
    </div>
  );
};

export default UploadProgress;
