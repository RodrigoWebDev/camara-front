import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/common/components/ui/alert';

import { AlertCircle } from 'lucide-react';

type CustomAlertProps = {
  title?: string;
  description?: string;
  Icon?: React.ElementType;
};

const PreferenceCard = ({ title, description, Icon }: CustomAlertProps) => {
  return (
    <Alert
      className={`
        flex flex-col p-4 items-start gap-4 self-stretch rounded-lg border-border bg-background
      `}
    >
      <div className="flex flex-row items-start gap-3 self-stretch">
        <div className="pt-1">
          {Icon ? (
            <Icon className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <AlertTitle
            className={`text-base font-medium leading-6 text-foreground font-sans`}
          >
            {title}
          </AlertTitle>

          <AlertDescription
            className={`
                 text-sm font-normal leading-5 text-foreground font-sans

              `}
          >
            {description}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default PreferenceCard;
