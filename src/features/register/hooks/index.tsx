import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { parse, format, isValid } from 'date-fns';
import { useMask } from '@react-input/mask';
import { z } from 'zod';
import { registerUser } from '../services';
import { cpf } from 'cpf-cnpj-validator';

const formSchema = z.object({
  username: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  CPF: z.string().refine((v) => cpf.isValid(v), { message: 'CPF inválido' }),
  birth: z.string().refine(
    (v) => {
      const parsed = parse(v, 'dd/MM/yyyy', new Date());
      return isValid(parsed);
    },
    { message: 'Data de nascimento inválida' }
  ),
  gender: z
    .string()
    .refine((v) => ['male', 'female', 'other', 'notAnswer'].includes(v), {
      message: 'Gênero inválido',
    }),
});

type FirstStepFormValues = z.infer<typeof formSchema>;
type FormValues = FirstStepFormValues & {
  password: string;
};

export default function useRegisterHook() {
  const form = useForm<FirstStepFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      CPF: '',
      birth: '',
      gender: '',
    },
  });

  const username = form.watch('username');
  const email = form.watch('email');
  const CPF = form.watch('CPF');
  const birth = form.watch('birth');
  const gender = form.watch('gender');

  const isAllFilled = [username, email, CPF, birth, gender].every(
    (v) => v?.toString().trim() !== ''
  );

  const inputBirthRef = useMask({
    mask: '__/__/____',
    replacement: { _: /\d/ },
  });
  const inputCPFRef = useMask({
    mask: '___.___.___-__',
    replacement: { _: /\d/ },
  });

  const onSubmit = async (data: FormValues, handleNext: () => void) => {
    try {
      const parsed = parse(data.birth, 'dd/MM/yyyy', new Date());
      const birth_date = format(parsed, 'yyyy-MM-dd');

      await registerUser({
        full_name: data.username,
        email: data.email,
        password: data.password,
        document: data.CPF.replace(/[.-]/g, ''),
        birth_date,
        gender: data.gender as 'male' | 'female' | 'other' | 'notAnswer',
      });
      handleNext();
    } catch (error: any) {
      alert(`Erro no cadastro -> ${error}`);
    }
  };

  return { form, isAllFilled, inputBirthRef, inputCPFRef, onSubmit };
}
