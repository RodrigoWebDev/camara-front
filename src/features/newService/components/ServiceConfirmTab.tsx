import PageHeader from '@/common/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ListPlus } from 'lucide-react';
import useServiceHook, { FormValues } from '../hooks/useServiceHook';
import { AddedField } from '../services';

type ServiceConfirmTabProps = {
  handleBack: () => void;
  service: FormValues;
  fields: AddedField[];
  handleClear: () => void;
};

const ServiceConfirmTab = ({
  handleBack,
  service,
  fields,
  handleClear,
}: ServiceConfirmTabProps) => {
  const { onSubmit } = useServiceHook({ service });

  const content = [
    { label: 'Nome', value: service.name },
    { label: 'Categoria', value: service.category },
    { label: 'Tempo Estimado', value: service.estimatedTime },
    { label: 'Status', value: 'Disponível' },
    { label: 'Campos no Formulário', value: fields.length },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen border-l bg-background gap-4">
      <PageHeader
        title="Confirmação"
        description="Revise as informações e confirme a criação do serviço."
        handleBack={handleBack}
      />
      <Card className="py-4 mx-4 mb-4">
        <CardContent className="flex flex-col items-center gap-2">
          <div className="p-4 bg-green-100 rounded-full flex items-center justify-center w-max">
            <Check size={32} className="text-success" />
          </div>
          <h1 className="text-lg font-semibold leading-7 text-center text-foreground">
            Serviço Pronto para Publicação
          </h1>
          <p className="text-sm font-normal leading-5 text-center text-muted-foreground">
            {`O serviço "${service.name}" foi configurado com sucesso e está pronto para ser publicado.`}
          </p>
          <div className="p-4 w-full md:w-1/2 rounded-lg bg-muted my-5">
            <span className="text-base font-medium leading-6 text-foreground">
              Resumo do Serviço
            </span>
            {content.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-base font-normal leading-6 text-muted-foreground">
                  {item.label}
                </span>
                <span className="text-base font-medium leading-6 text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:justify-between w-full md:gap-4">
            <Button
              onClick={handleBack}
              variant="outline"
              className="w-full md:w-auto"
            >
              Voltar
            </Button>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full md:w-auto">
              <Button
                onClick={handleClear}
                variant="outline"
                className="w-full md:w-auto"
              >
                Cancelar
              </Button>
              <Button
                className="w-full md:w-auto"
                onClick={() => onSubmit(service, fields, handleClear)}
              >
                <ListPlus className="mr-2" />
                <span>Publicar serviço</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceConfirmTab;
