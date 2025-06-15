import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  createSchedule,
  CreateScheduleDto,
  Info,
  ScheduleData,
} from '../services';
import ReviewField from '@/features/serviceSolicitation/components/ReviewField';
import MultiSelectInput from '@/common/components/MultiSelectInput';
import CustomAlert from '@/common/components/CustomAlert';
import { ArrowLeft, Info as InfoIcon, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ReviewTabProps = {
  schedule: ScheduleData;
  infos: Info[];
  handleBack: () => void;
  clientName: string;
  clientId: number;
  mountSchedule: (data: Partial<ScheduleData>) => void;
};

const ReviewTab = ({
  schedule,
  infos,
  handleBack,
  clientName,
  clientId,
  mountSchedule,
}: ReviewTabProps) => {
  const reminderOptions = [
    'Enviar lembrete por E-mail',
    'Enviar lembrete por WhatsApp (requer telefone cadastrado)',
  ];

  const handleSubmit = async () => {
    const attendantId = parseInt(localStorage.getItem('id') ?? '');
    const reminderEmail = schedule.reminder.some(
      (item) => item === reminderOptions[0]
    );
    const reminderWpp = schedule.reminder.some(
      (item) => item === reminderOptions[1]
    );

    const data: CreateScheduleDto = {
      name: schedule.name,
      description: schedule.description,
      observations: schedule.observations,
      status: 'confirmed',
      date: schedule.date,
      location: schedule.location,
      userName: clientName,
      userId: clientId,
      serviceId: schedule.serviceId,
      attendantId,
      reminderEmail,
      reminderWpp,
    };
    const response = await createSchedule(data);

    if (response) {
      mountSchedule({ finished: true, protocol: response.protocol });
    }
  };

  return (
    <Card className="p-4 m-4">
      <CardHeader className="px-0 rounded">
        <CardTitle>Confirmar Agendamento</CardTitle>
        <CardDescription>
          Verifique os detalhes e confirme o agendamento.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-4">
        <span className="text-base font-medium leading-6 text-popover-foreground">
          Resumo do Agendamento
        </span>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          {infos.map((item, i) => (
            <ReviewField
              key={i}
              isFile={false}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
        <div className="p-4 rounded-lg border border-border">
          <span className="text-sm font-medium">Lembretes</span>
          <MultiSelectInput
            onChange={() => {}}
            options={reminderOptions}
            value={schedule.reminder}
            disabled={true}
          />
        </div>
        <CustomAlert
          Icon={InfoIcon}
          title="Ao confirmar este agendamento, ele será registrado no sistema e o cidadão será notificado por e-mail com os detalhes. Certifique-se de que todas as informações estão corretas."
        />
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="w-full md:w-auto"
          >
            <ArrowLeft />
            <span>Voltar</span>
          </Button>
          <Button className="w-full md:w-auto" onClick={handleSubmit}>
            <Save />
            <span>Finalizar atendimento</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewTab;
