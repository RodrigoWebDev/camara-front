import CustomAlert from '@/common/components/CustomAlert';
import DynamicInput from '@/common/components/DynamicInput/DynamicInput';
import { Button } from '@/common/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/common/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { AddedField } from '@/features/newService/services';
import useDynamicForm from '@/hooks/useDynamicForm';
import { format, isValid } from 'date-fns';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { ServiceResponse } from '../services';

type InfosTabProps = {
  addedFields: AddedField[];
  handleNext: () => void;
  handleBack: () => void;
  setService: Dispatch<SetStateAction<ServiceResponse | null>>;
};

const InfosTab = ({
  addedFields,
  handleBack,
  handleNext,
  setService,
}: InfosTabProps) => {
  const fields = addedFields
    .map((field, i) => ({
      ...field,
      id: field.label + i,
    }))
    .filter((field) => field.type !== 'file');

  const [terms, setTerms] = useState<boolean>(false);

  const { form } = useDynamicForm({ fields });

  const handleSubmit = (data: any) => {
    const addedFieldsMapped = addedFields.map((field, i) => {
      const id = field.label + i;

      if (!data[id]) return { ...field };

      const value = !!field.value ? field.value : data[id];
      const display = fieldDisplay(value);

      return {
        ...field,
        value,
        display,
      };
    });
    setService((service) => ({ ...service!, addedFields: addedFieldsMapped }));
    handleNext();
  };

  const fieldDisplay = (value: Date | File | string | number) => {
    if (value instanceof Date && isValid(value)) {
      return format(value, 'dd/MM/yyyy');
    }
    return value ? value.toString() : '';
  };

  return (
    <Card className="p-4 m-4">
      <CardHeader className="px-0 rounded">
        <CardTitle>Informações do Serviço</CardTitle>
        <CardDescription>
          Preencha as informações necessárias para solicitar o serviço
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-4">
        <CustomAlert
          title="Informações importantes"
          description="Preencha todos os campos obrigatórios marcados com *. As informações fornecidas serão utilizadas para a emissão do documento."
          Icon={Info}
          type="outline"
        />
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {fields.map((field, i) => (
              <FormField
                key={i}
                control={form.control}
                name={field.id}
                render={({ field: formField, fieldState }) => (
                  <FormItem className="w-full flex flex-col gap-1.5">
                    <FormLabel className="text-base font-medium leading-none text-foreground">
                      {`${field.label}${field.required ? '*' : ''}`}
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
            <div className="flex gap-2 md:p-4 md:bg-muted rounded-md">
              <Checkbox
                id="terms"
                checked={terms}
                onCheckedChange={(checked) => setTerms(!!checked)}
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium leading-none text-foreground">
                  Declaro que as informações fornecidas são verdadeiras e estou
                  ciente das responsabilidades legais.
                </span>
                <span className="text-sm font-normal leading-5 text-muted-foreground">
                  Você deve aceitar os termos para prosseguir.
                </span>
              </div>
            </div>
            <hr className="my-6 -mx-4" />
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-full md:w-auto"
                type="button"
              >
                <ArrowLeft />
                <span>Cancelar</span>
              </Button>
              <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:w-auto w-full">
                {/* <Button variant="outline" className="w-full md:w-auto">
                  <Save />
                  <span>Salvar rascunho</span>
                </Button> */}
                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={!terms}
                >
                  <ArrowRight />
                  <span>Próximo</span>
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InfosTab;
