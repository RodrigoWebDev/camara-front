import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateScheduleDto } from '../services';

const schema = z.object({
  location: z.string().min(1),
  service: z.string().optional(),
  observations: z.string().optional(),
  reminder: z.array(z.string()).optional(),
});

export type FormValues = z.infer<typeof schema>;

const useScheduleHook = (defaultValues: Partial<CreateScheduleDto>) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { location } = form.watch();
  const isLocationFilled = location?.trim() !== '';

  return {
    form,
    isLocationFilled,
  };
};

export default useScheduleHook;
