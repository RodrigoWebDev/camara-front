import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/common/components/ui/alert';
import { Button } from '@/common/components/ui/button';
import { cn } from '../lib/utils';

type CustomAlertType = 'alert' | 'destructive' | 'outline' | 'info' | 'success';

type CustomAlertProps = {
  title: string;
  description?: string;
  Icon: React.ElementType;
  type?: CustomAlertType;
  isVerify?: boolean;
};

const CustomAlert = ({
  title,
  description,
  Icon,
  type = 'info',
  isVerify = false,
}: CustomAlertProps) => {
  return (
    <Alert
      className={cn(
        'flex flex-col p-4 items-start gap-4 self-stretch rounded-lg border-primary bg-custom-alert-background',
        type === 'alert' && 'border-alert bg-yellow-50',
        type === 'destructive' &&
          'border border-destructive bg-destructive-foreground',
        type === 'outline' && 'bg-background border-border',
        type === 'success' && 'bg-background-green border-none'
      )}
    >
      <div className="flex flex-row items-start gap-3 self-stretch">
        <div className="pt-1">
          <Icon
            className={cn(
              'h-4 w-4',
              type === 'info' && 'text-primary',
              type === 'alert' && 'text-alert',
              type === 'destructive' && 'text-destructive',
              type === 'outline' && 'text-foreground',
              type === 'success' && 'text-success'
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <AlertTitle
            className={cn(
              'font-sans text-base not-italic font-medium leading-6 text-primary',
              type === 'alert' && 'text-alert',
              type === 'destructive' && 'text-destructive',
              type === 'outline' && 'text-foreground',
              type === 'success' && 'text-success'
            )}
          >
            {title}
          </AlertTitle>
          {description && (
            <AlertDescription
              className={cn(
                'flex-[1_0_0] font-sans text-sm not-italic font-normal leading-5 text-primary',
                type === 'alert' && 'text-alert',
                type === 'destructive' && 'text-destructive',
                type === 'outline' && 'text-foreground',
                type === 'success' && 'text-success'
              )}
            >
              {description}
            </AlertDescription>
          )}
        </div>
      </div>
      {isVerify && (
        <div className="flex pl-7 items-center self-stretch">
          <Button
            className="text-base/foreground"
            variant={'outline'}
            size={'sm'}
          >
            Verificar agora
          </Button>
        </div>
      )}
    </Alert>
  );
};

export default CustomAlert;
