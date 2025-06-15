import CustomAlert from '@/common/components/CustomAlert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, CircleCheck, ThumbsUp } from 'lucide-react';
import RatingInput from './RatingInput';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/common/components/ui/form';
import useFeedbackHook from '../hooks/useFeedbackHook';

type FeedbackTabProps = {
  ticketId: string;
  protocol: number;
  handleNext: (formFilled: boolean) => void;
};

const FeedbackTab = ({ handleNext, ticketId, protocol }: FeedbackTabProps) => {
  const { form, onSubmit } = useFeedbackHook();

  return (
    <Card className="w-auto mx-4 md:w-[70%] md:mx-auto">
      <CardHeader className="flex flex-col gap-4 items-center px-0">
        <div className="rounded-full bg-background-blue p-4">
          <ThumbsUp size={32} strokeWidth={1.5} className="text-primary" />
        </div>
        <div>
          <h1 className="text-center text-card-foreground font-sans text-xl font-semibold leading-normal">
            Sua opinião é importante para nós
          </h1>
          <p className="text-center text-muted-foreground font-sans text-base font-normal leading-normal">
            Ajude-nos a melhorar nossos serviços digitais
          </p>
        </div>
        <hr className="mt-2 mb-2 w-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <CustomAlert
          Icon={CircleCheck}
          title="Sua solicitação de serviço foi registrada com sucesso"
          description={`Protocolo: ${protocol}`}
          type="success"
        />
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit((data) => {
              onSubmit(data, ticketId, () => handleNext(true));
            })}
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field, fieldState }) => (
                <FormItem>
                  <span className="text-center text-foreground font-sans text-lg font-medium leading-normal mb-4">
                    Como você avalia a facilidade de uso do sistema?
                  </span>
                  <FormControl>
                    <RatingInput
                      value={field.value}
                      onChange={field.onChange}
                      invalid={fieldState.invalid}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base-foreground text-base font-medium leading-normal">
                    Conte-nos mais sobre sua experiência (opcional)
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Textarea
                        placeholder="O que poderia ser melhorado?"
                        className="bg-background"
                        value={field.value}
                        onChange={field.onChange}
                        maxLength={500}
                      />
                      <p className="text-muted-foreground text-sm leading-normal mt-1">
                        {field.value?.length ?? 0}/500 caracteres
                      </p>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <hr className="my-2 -mx-6" />
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                type="button"
                className="flex-1 sm:flex-initial"
                onClick={() => handleNext(false)}
              >
                Pular esta etapa
              </Button>
              <Button type="submit" className="flex-1 sm:flex-initial">
                <span>Enviar avaliação</span>
                <ArrowRight />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FeedbackTab;
