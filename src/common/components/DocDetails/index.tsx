import { FileText, CircleCheck, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import CustomAlert from '../CustomAlert';

const SuccessItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 px-[0.625rem] py-0 w-full">
    <CircleCheck className="w-5 h-5 text-success shrink-0" />
    <p className="text-[1rem] leading-6 font-normal text-foreground">{text}</p>
  </div>
);

type DocDetailsProps = {
  title: string;
  description: string;
  badgeLabel: string;
  estimatedTime: string;
  targetAudience: string;
  cost: string;
  validity: string;
  documents: string[];
  requirements: string[];
  steps: string[];
  legislation: string;
  alertTitle: string;
  alertDescription: string;
  isManager?: boolean;
};

const DocDetails = ({
  title,
  description,
  badgeLabel,
  estimatedTime,
  targetAudience,
  cost,
  validity,
  documents,
  requirements,
  steps,
  legislation,
  alertTitle,
  alertDescription,
  isManager = false,
}: DocDetailsProps) => {
  return (
    <div>
      <div className="flex flex-col items-start gap-6 p-4 pl-0 w-full rounded-md border border-border bg-card shadow-sm">
        {/* heading */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 px-4 w-full">
          <div className="flex items-center gap-2 flex-1">
            <FileText className="w-10 h-10 text-primary shrink-0" />
            <div className="flex flex-col justify-center items-start flex-1">
              <p className="text-lg font-semibold text-popover-foreground">
                {title}
              </p>
            </div>
            <Badge
              variant="outline"
              className="flex items-center justify-center gap-2.5 px-[0.625rem] py-[0.125rem] rounded-full border border-transparent bg-secondary"
            >
              <p className="text-[0.75rem] leading-4 font-semibold text-secondary-foreground">
                {badgeLabel}
              </p>
            </Badge>
          </div>
        </div>

        {/* descrição */}
        <div className="px-4 w-full">
          <p className="text-[1rem] leading-6 font-normal text-muted-foreground">
            {description}
          </p>
        </div>

        {/* informações principais */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col sm:flex-row gap-4 w-full px-4">
            <div className="flex flex-1 items-start gap-2">
              <div className="flex flex-col items-start flex-1">
                <dt className="text-[0.875rem] leading-5 font-normal text-muted-foreground">
                  Tempo estimado
                </dt>
                <dd className="text-[0.875rem] leading-5 font-medium text-foreground">
                  {estimatedTime}
                </dd>
              </div>
            </div>
            <div className="flex flex-1 items-start gap-2">
              <div className="flex flex-col items-start flex-1">
                <dt className="text-[0.875rem] leading-5 font-normal text-muted-foreground">
                  Público-alvo
                </dt>
                <dd className="text-[0.875rem] leading-5 font-medium text-foreground">
                  {targetAudience}
                </dd>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full px-4">
            <div className="flex flex-1 items-start gap-2">
              <div className="flex flex-col items-start flex-1">
                <dt className="text-[0.875rem] leading-5 font-normal text-muted-foreground">
                  Custo
                </dt>
                <dd className="text-[0.875rem] leading-5 font-medium text-foreground">
                  {cost}
                </dd>
              </div>
            </div>
            <div className="flex flex-1 items-start gap-2">
              <div className="flex flex-col items-start flex-1">
                <dt className="text-[0.875rem] leading-5 font-normal text-muted-foreground">
                  Validade
                </dt>
                <dd className="text-[0.875rem] leading-5 font-medium text-foreground">
                  {validity}
                </dd>
              </div>
            </div>
          </div>
        </div>

        {/* separator */}
        <div className="w-full px-4">
          <Separator className="h-px bg-transparent" />
        </div>

        {/* documentos e requisitos */}
        <div className="flex flex-col justify-center items-start gap-4 px-4 w-full">
          <div className="flex flex-col items-start gap-2 w-full">
            <p className="w-full text-[1.125rem] leading-7 font-medium text-popover-foreground">
              {documents.length === 0 && 'Sem '} Documentos Necessários
            </p>
            {documents.map((item, index) => (
              <SuccessItem key={index} text={item} />
            ))}
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <p className="w-full text-[1.125rem] leading-7 font-medium text-popover-foreground">
              Requisitos
            </p>
            {requirements.map((item, index) => (
              <SuccessItem key={index} text={item} />
            ))}
          </div>
        </div>

        {/* etapas do processo */}
        <div className="flex flex-col gap-4 px-4 w-full">
          <p className="w-full text-[1.125rem] leading-7 font-medium text-popover-foreground">
            Etapas do Processo
          </p>
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="flex w-6 h-6 justify-center items-center rounded-full bg-primary">
                <span className="text-[0.75rem] leading-4 font-semibold text-primary-foreground">
                  {index + 1}
                </span>
              </div>
              <p className="text-[1rem] leading-6 font-medium text-foreground">
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* legislação */}
        <div className="flex w-full px-4">
          <div className="flex flex-col items-start flex-1">
            <dt className="text-[0.875rem] leading-5 font-normal text-muted-foreground">
              Legislação
            </dt>
            <dd className="text-[0.875rem] leading-5 font-medium text-foreground">
              {legislation}
            </dd>
          </div>
        </div>

        {/* alerta */}
        <div className="flex flex-col items-start gap-2 px-4 self-stretch">
          <CustomAlert
            title={alertTitle}
            description={alertDescription}
            Icon={'symbol'}
          />
        </div>

        {/* separator */}
        <div className="w-full px-4">
          <Separator className="h-px bg-transparent" />
        </div>

        {/* actions */}
        <div className="flex items-start gap-2 px-4 py-0 self-stretch">
          <Button className="flex h-10 px-4 py-2 justify-center items-center gap-2 flex-1 rounded-md bg-secondary">
            <Share2 className="text-black w-4 h-4" />
            <p className="text-base leading-6 font-medium text-secondary-foreground font-sans">
              Compartilhar
            </p>
          </Button>
          {isManager && (
            <Button className="flex h-10 px-4 py-2 justify-center items-center gap-2 flex-1 rounded-md bg-primary">
              <p className="text-primary-foreground text-base leading-6 font-medium font-sans">
                Solicitar Serviço
              </p>
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-start gap-4 p-0 w-full rounded-[6px] shadow-sm"></div>
    </div>
  );
};

export default DocDetails;
