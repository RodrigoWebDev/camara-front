import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/common/components/ui/alert';
import { Button } from '@/common/components/ui/button';
import { AlertCircle } from 'lucide-react';

type CustomAlertProps = {
  title?: string;
  description?: string;
  Icon?: React.ElementType;
  isVerify?: boolean;
  isDestructive?: boolean;
};

const verifyTitle = 'Verifique sua conta';
const verifyDescription =
  'Para garantir a segurança e ter acesso a todos os serviços do portal, verifique sua identidade.';
const serviceTitle = 'Como solicitar um serviço';
const serviceDescription =
  'Navegue pelos serviços disponíveis, clique em "Ver detalhes" para mais informações ou "Solicitar" para iniciar um pedido. Você pode filtrar por categoria ou usar a busca para encontrar serviços específicos.';

const CustomAlert = ({
  isVerify,
  title,
  description,
  Icon,
  isDestructive,
}: CustomAlertProps) => {
  const _title = title ? title : isVerify ? verifyTitle : serviceTitle;
  const _description = description
    ? description
    : isVerify
      ? verifyDescription
      : serviceDescription;

  return (
    <Alert
      className={`
      flex flex-col p-4 items-start gap-4 self-stretch rounded-lg bg-[var(--primary-foreground)]
      ${isVerify && 'border-alert bg-background'}
      ${isDestructive && 'border border-[var(--destructive)] bg-[var(--destructive-foreground)]'}
    `}
      variant={isDestructive ? 'destructive' : 'default'}
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
            className={`font-sans text-base not-italic font-medium leading-6 ${
              isVerify && 'text-alert'
            }`}
          >
            {_title}
          </AlertTitle>

          <AlertDescription
            className={`
              flex-[1_0_0] font-sans text-sm not-italic font-normal leading-5 text-color-[var(--foreground)] 
              ${isVerify && 'text-alert'}
              ${isDestructive && 'text-color-[var(--destructive)]'}
            `}
          >
            {_description}
          </AlertDescription>
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

// Example:
// <CustomAlert isVerify={true} ></CustomAlert>
