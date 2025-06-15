import { Button } from '@/common/components/ui/button';
import { ArrowLeft, CheckCheck, Settings } from 'lucide-react';
import { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;

  description?: string;
  isNotification?: boolean;
  className?: string;
  handleBack?: () => void;
  children?: ReactNode;
  classNameContainer?: string;
  classNameTitle?: string;
  classNameDescription?: string;
};

const PageHeader = ({
  title,
  description,
  handleBack,
  isNotification = false,
  children,
  classNameContainer,
  classNameTitle,
  classNameDescription,
}: PageHeaderProps) => {
  return (
    <div
      className={`flex px-4 pt-4 pb-2 items-center gap-4 flex-shrink-0 self-stretch ${classNameContainer}`}
    >
      {!!handleBack && (
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft size={16} />
        </Button>
      )}

      <div className="flex flex-col items-start flex-[1_0_0]">
        <h1
          className={`text-card-foreground font-sans text-2xl font-semibold leading-8 ${classNameTitle}`}
        >
          {title}
        </h1>
        {!!description && (
          <p
            className={`text-muted-foreground font-sans text-base font-normal leading-6 ${classNameDescription}`}
          >
            {description}
          </p>
        )}
      </div>
      {children ? (
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      ) : isNotification ? (
        <div className="flex flex-wrap gap-2">
          <Button
            className="flex h-10 px-4 py-2 justify-center items-center gap-2 whitespace-nowrap"
            variant="secondary"
          >
            <CheckCheck /> Marcar todas como lidas
          </Button>
          <Button
            className="flex h-10 px-4 py-2 justify-center items-center gap-2 whitespace-nowrap"
            variant="secondary"
          >
            <Settings />
            Configurações
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default PageHeader;
