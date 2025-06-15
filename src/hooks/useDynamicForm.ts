import { AddedField, FieldType } from '@/features/newService/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z, ZodTypeAny } from 'zod';

type useDynamicFormProps = {
  fields: AddedField[];
};

const useDynamicForm = ({ fields }: useDynamicFormProps) => {
  const getSchema = (type: FieldType) => {
    switch (type) {
      case 'text':
      case 'textarea':
      case 'select':
        return z.string();
      case 'file':
        return z.instanceof(File);
      case 'date':
        return z.coerce.date();
      case 'multiSelect':
        return z.array(z.string());
      default:
        return z.any();
    }
  };

  const { schema, defaultValues } = fields.reduce<{
    schema: Record<string, ZodTypeAny>;
    defaultValues: Record<string, any>;
  }>(
    (acc, field) => {
      const schema = getSchema(field.type);

      acc.schema[field.id] = field.required ? schema : schema.optional();
      acc.defaultValues[field.id] = field.value;

      return acc;
    },
    { schema: {}, defaultValues: {} }
  );

  const fullSchema = z.object(schema);
  type FormValues = z.infer<typeof fullSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(fullSchema),
    defaultValues,
  });

  return { form };
};

export default useDynamicForm;
