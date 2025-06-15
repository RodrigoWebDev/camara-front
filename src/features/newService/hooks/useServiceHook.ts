import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddedField, createService } from '../services';
import { format } from 'date-fns';

const CategoryEnum = z.enum([
  'documents',
  'certificates',
  'complaints',
  'suggestions',
  'others',
]);

const FieldTypeEnum = z.enum([
  'text',
  'textarea',
  'select',
  'multiSelect',
  'file',
]);

const schema = z.object({
  name: z.string(),
  description: z.string(),
  category: CategoryEnum,
  estimatedTime: z.number().min(1),
  availability: z.boolean(),
  label: z.string(),
  placeholder: z.string(),
  type: FieldTypeEnum,
  required: z.boolean(),
  hint: z.string(),
  options: z.array(z.object({ value: z.string() })),
  newOption: z.string(),
});

export type FormValues = z.infer<typeof schema>;

type useServiceHookProps = {
  service: FormValues;
};

const useServiceHook = ({ service }: useServiceHookProps) => {
  const defaultValues: FormValues = {
    name: service.name ?? '',
    description: service.description ?? '',
    category: service.category ?? 'documents',
    estimatedTime: service.estimatedTime ?? 1,
    availability: service.availability ?? true,
    label: '',
    placeholder: '',
    type: 'text',
    hint: '',
    required: true,
    options: [],
    newOption: '',
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    name,
    description,
    category,
    estimatedTime,
    availability,
    label,
    placeholder,
    type,
    options,
  } = form.watch();

  const showPlaceholder = ['text', 'textarea', 'file', 'select'].includes(type);
  const showOptions = ['select', 'multiSelect'].includes(type);

  const isServiceAllFilled = [
    name,
    description,
    category,
    estimatedTime,
    availability,
  ].every((v) => v?.toString().trim() !== '');

  const isPlaceholderFilled = !showPlaceholder || placeholder.trim() !== '';
  const isOptionFilled = !showOptions || options.length > 0;

  const isFieldAllFilled =
    label.trim() !== '' && isPlaceholderFilled && isOptionFilled;

  const onSubmit = async (
    data: FormValues,
    fields: AddedField[],
    handleClear: () => void
  ) => {
    try {
      const documents = fields.filter((field) => field.type === 'file').length;
      const lastUpdate = format(new Date(), 'yyyy-MM-dd');
      const addedFields = fields.map(({ id, ...rest }) => rest);

      await createService({
        name: data.name,
        documents,
        description: data.description,
        estimatedTime: data.estimatedTime,
        lastUpdate,
        category: data.category,
        availability: data.availability,
        addedFields,
      });
      alert('Serviço criado com sucesso.');
      handleClear();
    } catch (error: any) {
      alert(`Erro ao criar serviço -> ${error}`);
    }
  };

  return {
    form,
    isServiceAllFilled,
    isFieldAllFilled,
    onSubmit,
    showPlaceholder,
    showOptions,
  };
};

export default useServiceHook;
