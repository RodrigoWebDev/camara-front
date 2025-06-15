/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { AddedField } from '@/features/newService/services';
import useDynamicForm from '@/hooks/useDynamicForm';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { ServiceResponse } from '../services';

type DocumentsTabProps = {
  addedFields: AddedField[];
  handleNext: () => void;
  handleBack: () => void;
  setService: Dispatch<SetStateAction<ServiceResponse | null>>;
};

const DocumentsTab = ({
  addedFields,
  handleBack,
  handleNext,
  setService,
}: DocumentsTabProps) => {
  const fields = addedFields
    .map((field, i) => ({
      ...field,
      id: field.label + i,
    }))
    .filter((field) => field.type === 'file');

  const { form } = useDynamicForm({ fields });

  const handleSubmit = (data: any) => {
    const addedFieldsMapped = addedFields.map((field, i) => {
      const id = field.label + i;

      if (!data[id]) return { ...field };

      const value = field.value ? field.value : data[id];
      const display = value.name;

      return {
        ...field,
        value,
        display,
      };
    });
    setService((service) => ({ ...service!, addedFields: addedFieldsMapped }));
    handleNext();
  };

  return (
    <Card className="p-4 m-4">
      <CardHeader className="px-0 rounded">
        <CardTitle>Documentos Necessários</CardTitle>
        <CardDescription>
          Envie os documentos necessários para análise
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
            <hr className="my-6 -mx-4" />
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-full md:w-auto"
                type="button"
              >
                <ArrowLeft />
                <span>Voltar</span>
              </Button>
              <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:w-auto w-full">
                {/* <Button variant="outline" className="w-full md:w-auto">
                  <Save />
                  <span>Salvar rascunho</span>
                </Button> */}
                <Button type="submit" className="w-full md:w-auto">
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

export default DocumentsTab;
