import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ICPFFormData } from '../model';
import { useMask } from '@react-input/mask';
import { sendEmail } from '../services';

const useCPFHook = () => {
  const schema = z.object({
    CPF: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { CPF: '' },
  });

  const CPF = form.watch('CPF');
  const isCPFFilled = CPF?.trim() !== '';

  const inputRef = useMask({
    mask: '___.___.___-__',
    replacement: { _: /\d/ },
  });

  const onSubmit = async (data: ICPFFormData, handleNext: () => void) => {
    try {
      await sendEmail({
        type: 'cpf',
        value: data.CPF,
      });
      handleNext();
    } catch (error: any) {
      alert(`Erro ao enviar email -> ${error}`);
    }
  };

  return { form, isCPFFilled, onSubmit, inputRef };
};

export default useCPFHook;
