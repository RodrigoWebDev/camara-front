import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IFormData } from '../model';

const useLoginHook = () => {
  const formSchema = z.object({
    CPF: z.string(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CPF: '',
      password: '',
    },
  });

  const CPF = form.watch('CPF');
  const password = form.watch('password');

  const isAllFilled = CPF?.trim() !== '' && password?.trim() !== '';

  const onSubmit = (data: IFormData) => {
    console.log('data: ', data);
  };

  return { form, isAllFilled, onSubmit };
};

export default useLoginHook;
