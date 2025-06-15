import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';
import useCPFHook from '../hooks/useCPFHook';

type RecoverCPFFormProps = {
  handleNext: () => void;
};

const RecoverCPFForm = ({ handleNext }: RecoverCPFFormProps) => {
  const { form, isCPFFilled, inputRef, onSubmit } = useCPFHook();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data, handleNext))}
        className="w-full flex flex-col items-center gap-5"
      >
        <FormField
          control={form.control}
          name="CPF"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu CPF" {...field} ref={inputRef} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={!isCPFFilled}
          className="w-full bg-primary"
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Form>
  );
};

export default RecoverCPFForm;
