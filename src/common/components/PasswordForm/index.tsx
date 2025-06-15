import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/common/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, X, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import usePasswordHook from '../../../features/recover/hooks/usePasswordHook';
import { Checkbox } from '@/components/ui/checkbox';
import { IPasswordFormData } from '@/features/recover/model';

type RecoverPasswordFormProps = {
  isRegister: boolean;
  handleBack: () => void;
  onSubmit: (data: IPasswordFormData) => void;
};

const PasswordForm = ({
  isRegister,
  handleBack,
  onSubmit,
}: RecoverPasswordFormProps) => {
  const { form, isAllFilled, matchPassword } = usePasswordHook();

  const password = form.watch('password');
  const confirmPassword = form.watch('confirmPassword');
  const terms = form.watch('terms');

  const strengthTests = {
    length: password.length >= 8,
    capital: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const strength = Object.values(strengthTests).filter(Boolean).length;
  const strengthLabel = ['Muito fraca', 'Fraca', 'Boa', 'Forte', 'Muito forte'];
  const strengthPercentage = Math.floor((strength / 4) * 100);

  const disabledSubmitButton =
    !isAllFilled || !matchPassword || strength < 4 || (isRegister && !terms);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5 items-center"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nova senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite a sua nova senha"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-popover-foreground font-sans text-base font-normal leading-6">
              Força da senha: {strengthLabel[strength]}
            </span>
            <span>{strengthPercentage}%</span>
          </div>
          <Progress value={strengthPercentage} className="bg-secondary" />
          <ul>
            <li
              className={`flex gap-2 items-center text-muted-foreground text-sm font-normal leading-5  ${strengthTests.length && 'text-success'}`}
            >
              {strengthTests.length ? <Check size={16} /> : <X size={16} />}
              Pelo menos 8 caracteres
            </li>
            <li
              className={`flex gap-2 items-center text-muted-foreground text-sm font-normal leading-5  ${strengthTests.capital && 'text-success'}`}
            >
              {strengthTests.capital ? <Check size={16} /> : <X size={16} />}
              Pelo menos uma letra maiúscula
            </li>
            <li
              className={`flex gap-2 items-center text-muted-foreground text-sm font-normal leading-5  ${strengthTests.number && 'text-success'}`}
            >
              {strengthTests.number ? <Check size={16} /> : <X size={16} />}
              Pelo menos um número
            </li>
            <li
              className={`flex gap-2 items-center text-muted-foreground text-sm font-normal leading-5  ${strengthTests.special && 'text-success'}`}
            >
              {strengthTests.special ? <Check size={16} /> : <X size={16} />}
              Pelo menos um caractere especial
            </li>
          </ul>
        </div>
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirme a nova senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirme a sua nova senha"
                  {...field}
                />
              </FormControl>
              {password !== confirmPassword ? (
                <span className="text-sm font-normal leading-5 text-muted-foreground">
                  As duas senha devem coincidir.
                </span>
              ) : (
                <div className="h-5"></div>
              )}
            </FormItem>
          )}
        />
        {isRegister && (
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex items-center gap-1.25 w-full">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <span>
                  Aceito os termos de uso e a política de privacidade.
                </span>
              </FormItem>
            )}
          />
        )}
        <div className="flex justify-between gap-2 w-full">
          <Button variant="outline" onClick={handleBack} className="flex-1">
            <ArrowLeft />
            <span>Voltar</span>
          </Button>
          <Button
            disabled={disabledSubmitButton}
            type="submit"
            className="flex-1"
          >
            {isRegister ? 'Finalizar cadastro' : 'Verificar'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordForm;
