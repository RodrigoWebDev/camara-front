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
import { ILoginForm } from '../model';
import Logo from '@/../public/Logo.png';

const LoginForm = ({ form, isAllFilled, onSubmit }: ILoginForm) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-5"
      >
        <FormField
          control={form.control}
          name="CPF"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>CPF ou Matrícula</FormLabel>
              <FormControl>
                <Input placeholder="Digite apenas números" {...field} />
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
                <a className="absolute right-0 text-sm font-normal leading-none underline text-right text-muted-foreground">
                  Esqueceu a senha?
                </a>
              </div>
              <FormControl>
                <Input placeholder="Digite sua senha" {...field} />
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
          className="w-full bg-[var(--primary)] "
          type="submit"
        >
          Entrar
        </Button>
        <div className="flex items-center justify-center text-center">
          <p className="text-sm mr-2">Não tem uma conta?</p>
          <a className="text-[var(--primary)] font-medium">Cadastre-se</a>
        </div>
        <hr className="mt-3 mb-5 w-full" />
        <img className="w-56 h-12" src={Logo} />
        <Button variant="ghost">
          <span className="text-base font-medium leading-6 text-foreground">
            Política de Privacidade
          </span>
        </Button>
        <p className="text-center text-[var(--muted-foreground)] text-sm">
          © 2025 Câmara de Vereadores de Florianópolis
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
