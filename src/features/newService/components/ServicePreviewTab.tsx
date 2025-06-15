import PageHeader from '@/common/components/PageHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DynamicInput from '../../../common/components/DynamicInput/DynamicInput';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AddedField } from '../services';
import { FormValues } from '../hooks/useServiceHook';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/common/components/ui/form';
import useDynamicForm from '@/hooks/useDynamicForm';

type ServicePreviewTabProps = {
  handleNext: () => void;
  handleBack: () => void;
  service: FormValues;
  fields: AddedField[];
};

const ServicePreviewTab = ({
  handleNext,
  handleBack,
  service,
  fields,
}: ServicePreviewTabProps) => {
  const { form } = useDynamicForm({ fields });

  return (
    <div className="flex flex-col w-full min-h-screen border-l bg-background gap-4">
      <PageHeader
        title="Prévia do Serviço"
        description="Verifique como o serviço será exibido para os cidadãos."
        handleBack={handleBack}
      />
      <Card className="gap-0 mx-4 mb-4">
        <CardHeader className="rounded px-4">
          <CardTitle>{service.name}</CardTitle>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
        <hr className="my-4" />
        <div className="flex px-4">
          <div className="pl-4 flex flex-col w-1/2">
            <span className="text-sm font-normal leading-5 text-muted-foreground">
              Categoria
            </span>
            <span className="text-sm font-medium leading-5 text-foreground">
              {service.category}
            </span>
          </div>
          <div className="flex flex-col w-1/2">
            <span className="text-sm font-normal leading-5 text-muted-foreground">
              Tempo estimado
            </span>
            <span className="text-sm font-medium leading-5 text-foreground">
              {service.estimatedTime}
              {service.estimatedTime === 1 ? ' dia útil' : ' dias úteis'}
            </span>
          </div>
        </div>
        <hr className="my-4" />
        <CardContent className="px-4 flex flex-col gap-4">
          <Card className="p-4">
            <CardHeader className="px-0 rounded">
              <CardTitle>Formulário de Solicitação</CardTitle>
            </CardHeader>
            <CardContent className="px-0 flex flex-col gap-4">
              <Form {...form}>
                <form className="flex flex-col gap-5">
                  {fields.map((field) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={field.id}
                      render={({ field: formField, fieldState }) => (
                        <FormItem className="w-full flex flex-col gap-1.5">
                          <FormLabel className="text-base font-medium leading-none text-foreground">
                            {field.label}
                          </FormLabel>
                          <FormControl>
                            <DynamicInput
                              placeholder={field.placeholder}
                              type={field.type}
                              options={field.options}
                              hint={field.hint}
                              value={formField.value}
                              onChange={formField.onChange}
                              invalid={fieldState.invalid}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </form>
              </Form>
              <Button disabled={true}>
                <ArrowRight />
                <span>Enviar solicitação</span>
              </Button>
            </CardContent>
          </Card>
          <div className="flex gap-4 ">
            <Button className="flex-1" variant="outline" onClick={handleBack}>
              Voltar
            </Button>
            <Button className="flex-1" onClick={handleNext}>
              <ArrowRight />
              <span>Continuar</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicePreviewTab;
