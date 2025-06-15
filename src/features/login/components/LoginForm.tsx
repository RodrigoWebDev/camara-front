import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useLoginHook from '../hooks';

const LoginForm = () => {
  const { form, isAllFilled, onSubmit } = useLoginHook();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-5"
      >
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>CPF ou Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu login" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex justify-between relative">
                <FormLabel>Senha</FormLabel>
                <a
                  href="/recuperacao"
                  className="absolute right-0 text-sm font-normal leading-none underline text-right text-muted-foreground"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <FormControl>
                <Input
                  placeholder="Digite sua senha"
                  type="password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex w-full items-center gap-2">
          <Checkbox
            id="keepLogged"
            className="rounded-xs border border-primary bg-background w-4 h-4 shrink-0"
          />
          <label
            htmlFor="keepLogged"
            className="text-sm font-medium leading-none text-foreground"
          >
            Manter logado
          </label>
        </div>
        <Button
          disabled={!isAllFilled}
          className="w-full bg-primary"
          type="submit"
        >
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
