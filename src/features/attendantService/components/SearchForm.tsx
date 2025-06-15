import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/common/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import useServiceHook, { SearchFormValues } from '../hooks/useServiceHook';
import { cn } from '@/common/components/lib/utils';
import { UserResponse } from '@/features/register/services';
import { NewUserResponse } from '@/features/serviceSolicitation/services';
import { useState } from 'react';

type SearchFormProps = {
  client: UserResponse | null;
  setClient: (user: NewUserResponse | null) => void;
  handleNext: () => void;
  handleBack: () => void;
};

const SearchForm = ({
  client,
  setClient,
  handleNext,
  handleBack,
}: SearchFormProps) => {
  const { searchForm, isCPFFilled, inputCPFRef, onSearchSubmit } =
    useServiceHook();

  const [notFound, setNotFound] = useState<boolean>(false);

  const handleSubmit = async (data: SearchFormValues) => {
    const user = await onSearchSubmit(data);
    setClient(user ? { ...user, isNew: false } : null);
    setNotFound(!user);
  };

  return (
    <Form {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-2 items-end">
          <FormField
            control={searchForm.control}
            name="cpf"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="mb-2">CPF</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Digite o CPF do cidadão"
                    ref={inputCPFRef}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isCPFFilled}>
            <Search />
            <span>Buscar</span>
          </Button>
        </div>
        <div
          className={cn(
            'rounded-md border border-border p-4 flex flex-col ',
            client
              ? 'justify-start items-start gap-4'
              : 'justify-center items-center min-h-[128px]'
          )}
        >
          {client ? (
            <>
              <span className="text-lg font-medium leading-7 text-card-foreground">
                Cidadão encontrado
              </span>
              <div className="rounded border border-border bg-background-green flex gap-4 p-4 w-full">
                <span className="text-base font-semibold leading-6 text-foreground truncate">
                  {client?.full_name}
                </span>
                <span className="text-base font-normal leading-6 text-foreground truncate">
                  CPF: {client?.document}
                </span>
              </div>
            </>
          ) : (
            <span className="text-base font-medium leading-6 text-muted-foreground">
              {notFound
                ? 'Cidadão não encontrado'
                : 'Digite o CPF do cidadão para buscar'}
            </span>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Button variant="outline" type="button" onClick={handleBack}>
            <ArrowLeft />
            <span>Voltar</span>
          </Button>
          <Button type="button" onClick={handleNext} disabled={!client}>
            <span>Continuar</span>
            <ArrowRight />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchForm;
