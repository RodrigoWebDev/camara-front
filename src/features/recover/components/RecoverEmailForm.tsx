import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';
import useEmailHook from '../hooks/useEmailHook';

type RecoverEmailFormProps = {
  handleNext: () => void;
};

const RecoverEmailForm = ({ handleNext }: RecoverEmailFormProps) => {
  const { form, isEmailFilled, onSubmit } = useEmailHook();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data, handleNext))}
        className="w-full flex flex-col items-center gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu e-mail"
                  {...field}
                  type="email"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={!isEmailFilled}
          className="w-full bg-primary"
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
};

export default RecoverEmailForm;
