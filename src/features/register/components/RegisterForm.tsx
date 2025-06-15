import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { Button } from '@/common/components/ui/button';
import useRegisterHook from '../hooks';
import { FirstStepForm } from '../model';

type RegisterFormProps = {
  onSubmit: (data: FirstStepForm) => void;
};

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const { form, inputBirthRef, inputCPFRef, isAllFilled } = useRegisterHook();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full items-center"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome completo" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu melhor e-mail" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="CPF"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu CPF"
                  {...field}
                  ref={inputCPFRef}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Data de nascimento</FormLabel>
              <FormControl>
                <Input
                  placeholder="DD/MM/AAAA"
                  {...field}
                  ref={inputBirthRef}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Gênero</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu gênero" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Feminino</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                  <SelectItem value="notAnswer">
                    Prefiro não informar
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button
          disabled={!isAllFilled}
          className="w-full bg-primary"
          type="submit"
        >
          Avançar
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
