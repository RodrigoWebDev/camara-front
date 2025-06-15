import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMask } from '@react-input/mask';
import { GenderEnum, registerUser } from '@/features/register/services';
import { getUserByDocument } from '../services';
import { uploadFile } from '@/features/serviceSolicitation/services';
import {
  isValidCEP,
  isValidCPF,
  isValidPhone,
} from '@brazilian-utils/brazilian-utils';
import { mask } from '@/common/utils/masks';

const searchSchema = z.object({
  cpf: z.string(),
});

const errorsMessage = {
  require: 'Esse campo é obrigatório',
  invalid: 'O valor preenchido é inválido',
};

const registerSchema = z.object({
  name: z.string().nonempty(errorsMessage.require).max(80),
  email: z.string().nonempty(errorsMessage.require).email(),
  tel: z
    .string()
    .nonempty(errorsMessage.require)
    .refine((val) => isValidPhone(val), {
      message: errorsMessage.invalid,
    }),
  cpf: z
    .string()
    .nonempty(errorsMessage.require)
    .refine((val) => isValidCPF(val), {
      message: errorsMessage.invalid,
    }),
  date: z.string().nonempty(errorsMessage.require).min(10).max(10),
  cep: z
    .string()
    .nonempty(errorsMessage.require)
    .refine((val) => isValidCEP(val), {
      message: errorsMessage.invalid,
    }),
  number: z.string().nonempty(errorsMessage.require).max(5),
  address: z.string().nonempty(errorsMessage.require).max(100),
  city: z.string().nonempty(errorsMessage.require).max(40),
  state: z.string().nonempty(errorsMessage.require).max(40),
  document: z.instanceof(File),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;

const useServiceHook = () => {
  const searchForm = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { cpf: '' },
  });

  const { cpf: searchCpf } = searchForm.watch();
  const isCPFFilled = searchCpf.trim() !== '';

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      tel: '',
      cpf: '',
      date: '',
      cep: '',
      number: '',
      address: '',
      city: '',
      state: '',
    },
  });

  const inputBirthRef = useMask({
    mask: mask.date,
    replacement: { _: /\d/ },
  });
  const inputCPFRef = useMask({
    mask: mask.cpf,
    replacement: { _: /\d/ },
  });
  const inputCEPRef = useMask({
    mask: mask.cep,
    replacement: { _: /\d/ },
  });
  const inputPhoneRef = useMask({
    mask: mask.tel,
    replacement: { _: /\d/ },
  });
  const inputNumberRef = useMask({
    mask: mask.number,
    replacement: { _: /\d/ },
  });

  const {
    name,
    cep,
    cpf,
    address,
    date,
    city,
    email,
    tel,
    state,
    document,
    number,
  } = registerForm.watch();

  const isRegisterAllFilled =
    [name, cep, cpf, address, date, city, email, tel, state, number].every(
      (v) => v?.toString().trim() !== ''
    ) && !!document;

  const passwordHash = () =>
    crypto
      .getRandomValues(new Uint8Array(8))
      .reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')
      .slice(0, 8);

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await uploadFile(data.document);

      const documentFile = response.url;
      const password = passwordHash();
      const gender: GenderEnum = 'notAnswer';
      const regexOnlyNumber = /[^0-9]/g;

      const formattedData = {
        email: data.email,
        full_name: data.name,
        phone: data.tel.replace(regexOnlyNumber, ''),
        cep: data.cep.replace(regexOnlyNumber, ''),
        address: data.address,
        city: data.city,
        state: data.state,
        number: data.number,
        birth_date: new Date(data.date).toISOString(),
        updated_at: new Date().toISOString(),
        document: data.cpf.replace(regexOnlyNumber, ''),
        documentFile,
        password,
        gender,
      };

      await registerUser(formattedData);
      return true;
    } catch (error: any) {
      alert(`Erro no cadastro -> ${error}`);
      return false;
    }
  };

  const onSearchSubmit = async (data: SearchFormValues) =>
    await getUserByDocument(data.cpf.replace(/[.-]/g, ''));

  return {
    searchForm,
    registerForm,
    isCPFFilled,
    isRegisterAllFilled,
    inputBirthRef,
    inputCPFRef,
    inputCEPRef,
    inputPhoneRef,
    inputNumberRef,
    onRegisterSubmit,
    onSearchSubmit,
  };
};

export default useServiceHook;
