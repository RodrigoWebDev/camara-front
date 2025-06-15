import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/common/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useScheduleHook, { FormValues } from '../hooks/useScheduleHook';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import MultiSelectInput from '@/common/components/MultiSelectInput';
import { useEffect, useState } from 'react';
import apiClient from '@/services/apiClient';
import { ScheduleData, Service } from '../services';

type DetailsTabProps = {
  handleBack: () => void;
  mountSchedule: (data: Partial<ScheduleData>) => void;
  schedule?: Partial<ScheduleData> | null;
};

const DetailsTab = ({
  handleBack,
  mountSchedule,
  schedule,
}: DetailsTabProps) => {
  const [services, setServices] = useState<Service[]>([]);

  const defaultValues = {
    observations: schedule?.observations,
    location: schedule?.location,
    service: schedule?.serviceId,
    reminder: schedule?.reminder ?? ['Enviar lembrete por E-mail'],
  };

  const { form, isLocationFilled } = useScheduleHook(defaultValues);

  const handleSubmit = (data: FormValues) =>
    mountSchedule({
      observations: data.observations,
      location: data.location,
      serviceId: data.service,
      reminder: data.reminder,
    });

  const reminderOptions = [
    'Enviar lembrete por E-mail',
    'Enviar lembrete por WhatsApp (requer telefone cadastrado)',
  ];

  useEffect(() => {
    apiClient
      .get('/services')
      .then((res) => setServices(res.data.results))
      .catch((err) => console.error('Erro ao buscar serviços:', err));
  }, []);

  return (
    <div className="px-4">
      <Card>
        <CardHeader>
          <CardTitle>Local e Detalhes</CardTitle>
          <CardDescription>
            Complete as informações do agendamento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Local de atendimento</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value ?? ''}
                          type="text"
                          placeholder="Digite o local de atendimento"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Serviço (opcional)</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ''}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um serviço" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações (opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Informe detalhes adicionais ou necessidades específicas"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reminder"
                render={({ field }) => (
                  <FormItem className="p-4 rounded-lg bg-secondary">
                    <FormLabel>Lembretes</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Como deseja receber lembretes sobre este agendamento?
                    </p>
                    <FormControl>
                      <MultiSelectInput
                        onChange={field.onChange}
                        options={reminderOptions}
                        value={field.value ?? []}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="w-full md:w-auto"
                  type="button"
                >
                  <ArrowLeft />
                  <span>Voltar</span>
                </Button>
                <Button
                  className="w-full md:w-auto"
                  type="submit"
                  disabled={!isLocationFilled}
                >
                  <ArrowRight />
                  <span>Próximo</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsTab;
