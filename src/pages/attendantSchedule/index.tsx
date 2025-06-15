import PageHeader from '@/common/components/PageHeader';
import StepperProgress from '@/common/components/StepperProgress';
import DetailsTab from '@/features/attendantSchedule/components/DetailsTab';
import ReviewTab from '@/features/attendantSchedule/components/ReviewTab';
import ScheduleTab from '@/features/attendantSchedule/components/ScheduleTab';
import ServiceTab from '@/features/attendantSchedule/components/ServiceTab';
import SuccessTab from '@/features/attendantSchedule/components/SuccessTab';
import { ScheduleData } from '@/features/attendantSchedule/services';
import CitizenTab from '@/features/attendantService/components/CitizenTab';
import { NewUserResponse } from '@/features/serviceSolicitation/services';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const AttendantSchedulePage = () => {
  const [step, setStep] = useState<number>(1);
  const [schedule, setSchedule] = useState<ScheduleData | null>(null);
  const [client, setClient] = useState<NewUserResponse | null>(null);

  const steps = [
    { id: 1, title: 'Serviço', show: true },
    { id: 2, title: 'Cidadão', show: true },
    { id: 3, title: 'Data e Hora', show: true },
    { id: 4, title: 'Detalhes', show: true },
    { id: 5, title: 'Confirmação', show: true },
  ];

  const handleBack = () => setStep((step) => step - 1);
  const handleNext = () => setStep((step) => step + 1);

  const navigate = useNavigate();

  const mountSchedule = (data: Partial<ScheduleData>) => {
    setSchedule((schedule) => ({ ...schedule, ...data }) as ScheduleData);
    handleNext();
  };

  const getInfos = () => {
    if (!schedule || !client?.full_name) return [];

    const formattedDate = format(schedule.date, "d 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    const formatedSchedule = format(schedule.date, 'HH:mm');

    return [
      { label: 'Serviço', value: schedule.name },
      { label: 'Cidadão', value: client?.full_name },
      { label: 'Data', value: formattedDate },
      { label: 'Horário', value: formatedSchedule },
      { label: 'Local', value: schedule.location },
      {
        label: 'Observações',
        value: schedule.observations ?? 'Nenhuma observação',
      },
    ];
  };

  return (
    <div className="flex flex-col w-full min-h-screen border-l bg-background gap-8">
      {!schedule?.finished && (
        <>
          <PageHeader
            title="Novo Agendamento"
            handleBack={() => (step === 1 ? navigate(-1) : handleBack())}
          />
          <StepperProgress current={step - 1} steps={steps} />
        </>
      )}
      {step === 1 && <ServiceTab mountSchedule={mountSchedule} />}
      {step === 2 && schedule?.name && (
        <CitizenTab
          client={client}
          setClient={setClient}
          serviceName={schedule.name}
          serviceDescription={schedule.description}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {step === 3 && (
        <ScheduleTab handleBack={handleBack} mountSchedule={mountSchedule} />
      )}
      {step === 4 && (
        <DetailsTab
          handleBack={handleBack}
          mountSchedule={mountSchedule}
          schedule={schedule}
        />
      )}
      {step === 5 && client && schedule && (
        <ReviewTab
          handleBack={handleBack}
          clientId={client.user_id}
          clientName={client.full_name}
          infos={getInfos()}
          schedule={schedule}
          mountSchedule={mountSchedule}
        />
      )}
      {step === 6 && schedule?.finished && (
        <SuccessTab infos={getInfos()} protocol={schedule.protocol} />
      )}
    </div>
  );
};

export default AttendantSchedulePage;
