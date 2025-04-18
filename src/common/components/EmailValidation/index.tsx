import { Dot } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

interface EmailValidationProps {
  email: string;
  onValidated: () => void;
}

type FormData = {
  code: string;
};

const EmailValidation = ({ email, onValidated }: EmailValidationProps) => {
  const { control, watch } = useForm<FormData>({
    defaultValues: {
      code: '',
    },
  });

  const code = watch('code');

  const onSubmit = () => {
    console.log('Código atual:', code);
    if (code.length === 6) {
      console.log('Código válido! Disparando onValidated...');
      onValidated();
    } else {
      console.warn('Código inválido ou incompleto');
    }
  };

  const isCodeValid = code.length === 6;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col justify-center items-center gap-2 px-6 flex-1 self-stretch"
    >
      <div className="flex flex-col justify-center items-center gap-4 p-4 flex-1 self-stretch rounded-lg border border-dashed border-border">
        <div className="flex flex-col items-center gap-2 self-stretch text-center">
          <span className="text-lg font-medium leading-7 text-foreground">
            Confirme seu e-mail
          </span>
          <span className="max-w-[40rem] text-base font-normal leading-6 text-muted-foreground">
            Para finalizar a verificação, precisamos confirmar que você tem
            acesso ao e-mail cadastrado. Enviamos um código de 6 dígitos para
            <span className="text-foreground font-medium"> {email}</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Controller
            name="code"
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field: { value, onChange } }) => (
              <InputOTP
                value={value}
                onChange={(val) => onChange(val.replace(/\D/g, ''))}
                maxLength={6}
                className="flex items-center gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    inputMode="numeric"
                    className="flex w-10 h-10 py-[0.625rem] px-0 justify-center items-center rounded-l-md border border-border bg-background"
                  />
                  <InputOTPSlot
                    index={1}
                    inputMode="numeric"
                    className="flex w-10 h-10 py-[0.625rem] px-0 justify-center items-center border border-border bg-background"
                  />
                  <Dot className="w-6 h-6" />
                  <InputOTPSlot
                    index={2}
                    inputMode="numeric"
                    className="flex w-10 h-10 py-[0.625rem] px-0 justify-center items-center border border-border bg-background"
                  />
                  <InputOTPSlot
                    index={3}
                    inputMode="numeric"
                    className="flex w-10 h-10 py-[0.625rem] px-0 justify-center items-center border border-border bg-background"
                  />
                  <Dot className="w-6 h-6" />
                  <InputOTPSlot
                    index={4}
                    inputMode="numeric"
                    className="flex w-10 h-10 py-[0.625rem] px-0 justify-center items-center border border-border bg-background"
                  />
                  <InputOTPSlot
                    index={5}
                    inputMode="numeric"
                    className="flex w-10 h-10 py-[0.625rem] px-0 justify-center items-center rounded-r-md border border-border bg-background"
                  />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          <Button
            type="submit"
            disabled={!isCodeValid}
            className={`flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md ${
              isCodeValid
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Verificar
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-base font-normal leading-6 text-muted-foreground">
            Não recebeu o código?
          </span>
          <Button
            type="button"
            variant="link"
            className="flex h-10 px-4 pr-0 py-2 justify-center items-center gap-2 bg-transparent text-primary hover:bg-transparent"
            onClick={() => console.log('Reenviar código')}
          >
            Reenviar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmailValidation;
