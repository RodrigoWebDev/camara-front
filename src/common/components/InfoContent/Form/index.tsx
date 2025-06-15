/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardContent, CardFooter, cn } from '../../ui/card';
import { Form, FormField } from '@/common/components/ui/form';
import PersonalInput from '../PersonalInput';
import { Button } from '@/components/ui/button';
import { Loader } from '../../Loader';

type InfoTabProps = {
  form: any;
  onSubmit: any;
  userInfo: any[];
  isLoadingCep: any;
};

const FormInfoContent = ({
  form,
  onSubmit,
  userInfo,
  isLoadingCep,
}: InfoTabProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <CardContent className="flex flex-col items-start gap-5 flex-[1_0_0] self-stretch px-0 md:px-6">
          <div className="grid md:grid-cols-6 w-full gap-x-2 gap-y-5">
            {userInfo.map((item, index) => {
              return (
                <div
                  className={cn(
                    'flex-1 col-span-6',
                    index < 6 ? 'md:col-span-2' : 'md:col-span-3'
                  )}
                  key={index}
                >
                  <FormField
                    control={form.control}
                    name={item.name}
                    render={({ field }) => {
                      return (
                        <div className="w-full">
                          <PersonalInput
                            htmlFor={item.label}
                            id={item.name}
                            label={item.label}
                            type={item.type}
                            placeholder={item.placeholder}
                            mask={item.mask}
                            readOnly={item.readOnly}
                            isLoading={item.name === 'cep' && isLoadingCep}
                            {...field}
                          />
                          {item.name === 'cep' && isLoadingCep && (
                            <div className="my-2">
                              {' '}
                              <Loader />{' '}
                            </div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-end items-center mt-6 gap-4 w-full px-0 md:px-6">
          <Button className="flex h-10 px-4 py-2 justify-center items-center gap-2 bg-transparent w-full md:w-auto">
            <p className="text-base font-medium leading-6 text-foreground font-sans">
              Cancelar
            </p>
          </Button>
          <Button
            type="submit"
            className="flex h-10 px-4 py-2 justify-center items-center gap-2 w-full md:w-auto"
          >
            <p>Salvar alterações</p>
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default FormInfoContent;
