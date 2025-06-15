/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { IFormData } from '../model';
import { loginUser } from '../services';

const formSchema = z.object({
  login: z.string().min(3, 'CPF ou Email obrigatório'),
  password: z.string().min(3, 'Senha obrigatória'),
});

type FormValues = z.infer<typeof formSchema>;

const useLoginHook = () => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const login = form.watch('login');
  const password = form.watch('password');
  const isAllFilled = login.trim() !== '' && password.trim() !== '';

  const onSubmit = async (data: IFormData) => {
    const isManager = localStorage.getItem('roleName') === 'administrador';
    const isAttendant = localStorage.getItem('roleName') === 'atendente';
    try {
      await loginUser({
        login: data.login,
        password: data.password,
      });
      if (isManager) {
        navigate('/dashboards');
      } else if (isAttendant) {
        navigate('/dashboard');
      } else {
        navigate('/inicio');
      }
    } catch (err: any) {
      alert('Erro no login');
    }
  };

  return { form, isAllFilled, onSubmit };
};

export default useLoginHook;
