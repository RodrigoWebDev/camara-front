import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IPasswordFormData } from '../model';
import { updatePassword } from '../services';

const usePasswordHook = () => {
  const schema = z
    .object({
      password: z
        .string()
        .min(8, 'Pelo menos 8 caracteres')
        .regex(/[A-Z]/, 'Pelo menos uma letra maiúscula')
        .regex(/[0-9]/, 'Pelo menos um número')
        .regex(/[^A-Za-z0-9]/, 'Pelo menos um caractere especial'),
      confirmPassword: z.string(),
      terms: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As duas senhas devem coincidir.',
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '', terms: false },
  });

  const password = form.watch('password');
  const confirmPassword = form.watch('confirmPassword');

  const isAllFilled = password?.trim() !== '' && confirmPassword?.trim() !== '';
  const matchPassword = password === confirmPassword;

  const onPasswordSubmit = async (
    data: IPasswordFormData,
    token: string,
    handleNext: () => void
  ) => {
    try {
      await updatePassword({
        password: data.password,
        token,
      });
      handleNext();
    } catch (error: any) {
      alert(`Erro ao alterar senha -> ${error}`);
    }
  };

  return { form, isAllFilled, matchPassword, onPasswordSubmit };
};

export default usePasswordHook;
