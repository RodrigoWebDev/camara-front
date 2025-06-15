import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/common/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useServiceHook, { RegisterFormValues } from '../hooks/useServiceHook';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import FileInput from '@/common/components/FileInput';
import { NewUserResponse } from '@/features/serviceSolicitation/services';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '@/common/components/Loader';

type RegisterFormProps = {
  setClient: (client: NewUserResponse) => void;
  handleNext: () => void;
  handleBack: () => void;
};

const RegisterForm = ({
  setClient,
  handleNext,
  handleBack,
}: RegisterFormProps) => {
  const [isLoadingCep, setIsLoadingCep] = useState<boolean>(false);

  const {
    registerForm,
    inputBirthRef,
    inputCEPRef,
    inputCPFRef,
    inputPhoneRef,
    inputNumberRef,
    isRegisterAllFilled,
    onRegisterSubmit,
    onSearchSubmit,
  } = useServiceHook();

  const handleSubmit = async (data: RegisterFormValues) => {
    const success = await onRegisterSubmit(data);
    if (!success) return;

    const user = await onSearchSubmit({ cpf: data.cpf });
    if (!user) return;

    setClient({ ...user, isNew: true });
    handleNext();
  };

  const { watch, setValue } = registerForm;
  const cepValue = watch('cep');

  useEffect(() => {
    getViaCep(cepValue);
  }, [cepValue]);

  const getViaCep = async (cep: string) => {
    if (cep && cep.length === 9) {
      try {
        setIsLoadingCep(true);
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        setValue('address', data?.logradouro || '');
        setValue('city', data?.localidade || '');
        setValue('state', data?.uf || '');
      } catch (e) {
        alert('Ocorreu um erro na consulta do CEP.');
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(handleSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={registerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Seu nome" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="exemplo123@gmail.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="tel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="(48) 99999-9999"
                    ref={inputPhoneRef}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="cpf"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="123.456.789-00"
                    ref={inputCPFRef}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="DD/MM/AAAA"
                    ref={inputBirthRef}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="cep"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center">
                    <Input
                      {...field}
                      type="text"
                      placeholder="00000-000"
                      ref={inputCEPRef}
                    />
                    {isLoadingCep && <Loader />}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Rodovia Baldicero Filomeno"
                    readOnly={true}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="number"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="00000"
                    ref={inputNumberRef}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Florianópolis"
                    readOnly={true}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Santa Catarina"
                    readOnly={true}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="p-4 rounded border border-border bg-secondary shadow-sm flex flex-col">
          <span className="text-base font-medium leading-6 text-foreground">
            Documentos para verificação
          </span>
          <span className="text-sm font-normal leading-5 text-foreground mb-5">
            Para verificarmos a identidade do cidadão, anexe os seguintes
            documentos:
          </span>
          <ul className="list-disc pl-5 text-sm text-foreground mb-5">
            <li>Documento de identidade (RG ou CNH)</li>
            <li>CPF</li>
            <li>Comprovante de residência</li>
          </ul>
          <FormField
            control={registerForm.control}
            name="document"
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FileInput
                    onChange={field.onChange}
                    placeholder="Formatos permitidos: ..."
                    value={field.value}
                    invalid={fieldState.invalid}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Button type="button" onClick={handleBack} variant="outline">
            <ArrowLeft />
            <span>Voltar</span>
          </Button>
          <Button type="submit" disabled={!isRegisterAllFilled}>
            <span>Continuar</span>
            <ArrowRight />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
