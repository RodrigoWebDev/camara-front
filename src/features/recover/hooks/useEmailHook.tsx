import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IEmailFormData } from '../model';
import { sendEmail } from '../services';

const useEmailHook = () => {
  const schema = z.object({
    email: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const email = form.watch('email');
  const isEmailFilled = email?.trim() !== '';

  const onSubmit = async (data: IEmailFormData, handleNext: () => void) => {
    try {
      await sendEmail({
        type: 'email',
        value: data.email,
      });
      handleNext();
    } catch (error: any) {
      alert(`Erro ao enviar email -> ${error}`);
    }
  };

  return { form, isEmailFilled, onSubmit };
};

export default useEmailHook;
