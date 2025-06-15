import { Button } from '@/common/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import FieldItem from '@/features/newService/components/FieldItem';
import useServiceHook, {
  FormValues,
} from '@/features/newService/hooks/useServiceHook';
import { Plus, ArrowRight, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useFieldArray } from 'react-hook-form';
import { AddedField } from '../services';
import PageHeader from '@/common/components/PageHeader';

export type NewServiceTabProps = {
  handleNext: () => void;
  setFields: Dispatch<SetStateAction<AddedField[]>>;
  setService: Dispatch<SetStateAction<FormValues>>;
  service: FormValues;
  fields: AddedField[];
};

const NewServiceTab = ({
  handleNext,
  setFields,
  setService,
  service,
  fields,
}: NewServiceTabProps) => {
  const {
    form,
    isServiceAllFilled,
    isFieldAllFilled,
    showPlaceholder,
    showOptions,
  } = useServiceHook({ service });

  const categoriesOptions = [
    { name: 'Documentos', value: 'documents' },
    { name: 'Certidões', value: 'certificates' },
    { name: 'Reclamações', value: 'complaints' },
    { name: 'Sugestões', value: 'suggestions' },
    { name: 'Outros', value: 'others' },
  ];

  const typesOptions = [
    { name: 'Texto', value: 'text' },
    { name: 'Area de texto', value: 'textarea' },
    { name: 'Seleção', value: 'select' },
    { name: 'Seleção multipla', value: 'multiSelect' },
    { name: 'Arquivo', value: 'file' },
    { name: 'Data', value: 'date' },
  ];

  const {
    fields: optionFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: 'options',
  });

  const handleAddOption = () => {
    const option = form.getValues('newOption');
    const optionExists = form
      .getValues('options')
      .some((op) => op.value === option);

    if (option && !optionExists) {
      append({ value: option });
      form.resetField('newOption');
    }
  };

  const handleRemoveOption = (index: number) => remove(index);

  const dragField = useRef<number>(0);
  const draggedOverField = useRef<number>(0);

  const handleFieldSort = () => {
    const fieldsClone = [...fields];
    const temp = fieldsClone[dragField.current];
    fieldsClone[dragField.current] = fieldsClone[draggedOverField.current];
    fieldsClone[draggedOverField.current] = temp;
    setFields(fieldsClone);
  };

  const onSubmit = (data: FormValues) => {
    setService(data);
    handleNext();
  };

  const handleAddField = () => {
    const { placeholder, label, required, type, hint } = form.watch();
    const options = optionFields.map((option) => option.value);

    const newField = {
      id: label + fields.length + 1,
      placeholder,
      label,
      required,
      type,
      options,
      hint,
    };

    setFields((fields) => [...fields, newField]);
    resetField();
  };

  const handleRemoveField = (index: number) =>
    setFields((fields) => fields.filter((_, i) => i !== index));

  const resetField = () => {
    form.resetField('options');
    form.resetField('label');
    form.resetField('placeholder');
    form.resetField('required');
    form.resetField('type');
    form.resetField('newOption');
    form.resetField('hint');
  };

  const { type } = form.watch();

  return (
    <div className="flex flex-col w-full min-h-screen border-l bg-background">
      <PageHeader title="Novo serviço" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4"
        >
          <Card className="p-4">
            <CardHeader className="px-0 rounded">
              <CardTitle>Informações do Serviço</CardTitle>
              <CardDescription>
                Preencha as informações básicas sobre o serviço que será
                oferecido.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1.5">
                    <FormLabel>Nome do serviço</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Solicitação de certidão"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1.5">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o serviço e suas finalidades"
                        className="h-[96px] bg-background"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col gap-1.5">
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full" id="category">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent>
                            {categoriesOptions.map((category, i) => (
                              <SelectItem key={i} value={category.value}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estimatedTime"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col gap-1.5">
                      <FormLabel>Tempo estimado em dias úteis</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o número de dias úteis estimados"
                          className="bg-background"
                          type="number"
                          min={1}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-1.5">
                        <FormLabel>Disponibilidade</FormLabel>
                        <span className="text-base font-normal leading-6 text-left text-muted-foreground">
                          Tornar este serviço disponível para os cidadãos.
                        </span>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardHeader className="px-0">
              <CardTitle>Campos do Formulário</CardTitle>
              <CardDescription>
                Configure os campos que serão exibidos no formulário de
                solicitação.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col gap-1.5">
                      <FormLabel>Tipo de campo</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue="text"
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {typesOptions.map((type, i) => (
                              <SelectItem key={i} value={type.value}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col gap-1.5">
                      <FormLabel>Rótulo do campo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Nome completo"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                {showPlaceholder && (
                  <FormField
                    control={form.control}
                    name="placeholder"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col gap-1.5">
                        <FormLabel>
                          {type === 'file' ? 'Tipo de arquivo' : 'Placeholder'}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              type === 'file'
                                ? 'Ex: Formatos aceitos: PDF, JPG, PNG (Máx. 5MB)'
                                : 'Ex: Digite seu nome completo'
                            }
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="hint"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col gap-1.5">
                      <FormLabel>Dica</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Digite seu nome completo como no documento"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {showOptions && (
                <div className="flex flex-col gap-1.5">
                  {optionFields.map((option, i) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name={`options.${i}.value`}
                      render={({ field }) => (
                        <FormItem className="w-full w-[50%] flex gap-1.5">
                          <FormControl>
                            <Input
                              type="text"
                              className="bg-background"
                              disabled={true}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleRemoveOption(i)}
                          >
                            <Trash2 />
                          </Button>
                        </FormItem>
                      )}
                    />
                  ))}
                  <FormField
                    control={form.control}
                    name="newOption"
                    render={({ field }) => (
                      <FormItem className="w-[50%] flex gap-1.5">
                        <FormControl>
                          <Input
                            placeholder="Nova opção"
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          variant="ghost"
                          onClick={handleAddOption}
                          type="button"
                        >
                          <Plus />
                        </Button>
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                  <FormItem className="w-full flex gap-1.5">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Campo obrigatório</FormLabel>
                  </FormItem>
                )}
              />
              <Button
                onClick={handleAddField}
                type="button"
                disabled={!isFieldAllFilled}
              >
                <Plus />
                <span>Adicionar campo</span>
              </Button>
              <Card className="p-4">
                <CardHeader className="px-0">
                  <CardTitle>Campos adicionados</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 px-0">
                  {fields.map((field, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => (dragField.current = i)}
                      onDragEnter={() => (draggedOverField.current = i)}
                      onDragEnd={handleFieldSort}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <FieldItem
                        label={field.label}
                        type={
                          typesOptions.find((t) => t.value === field.type)
                            ?.name ?? ''
                        }
                        required={field.required}
                        onDelete={() => handleRemoveField(i)}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setFields([])}
                  disabled={fields.length === 0}
                >
                  Limpar campos
                </Button>
                <Button
                  className="flex-1"
                  type="submit"
                  disabled={!isServiceAllFilled}
                >
                  <ArrowRight />
                  <span>Continuar</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default NewServiceTab;
