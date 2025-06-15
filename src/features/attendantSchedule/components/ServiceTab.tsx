import ServiceCard from '@/features/attendantService/components/ServiceCard';
import { ScheduleData } from '../services';

type ServiceTabProps = {
  mountSchedule: (data: Partial<ScheduleData>) => void;
};

const ServiceTab = ({ mountSchedule }: ServiceTabProps) => {
  const services = [
    {
      name: 'Atendimento Presencial',
      description: 'Agendamento para atendimento presencial',
    },
    {
      name: 'Retirada de Documentos',
      description: 'Agendamento para retirada de documentos prontos',
    },
    {
      name: 'Audiência',
      description: 'Agendamento de audiência com vereadores',
    },
  ];

  return (
    <div className="px-4">
      <h1 className="text-lg font-medium leading-7 text-card-foreground">
        Selecione o Serviço
      </h1>
      <p className="text-base font-normal leading-6 text-muted-foreground">
        Escolha o tipo de serviço para este agendamento.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {services.map((service, i) => (
          <ServiceCard
            key={i}
            estimatedTime="30 minutos"
            onClick={() =>
              mountSchedule({
                name: service.name,
                description: service.description,
              })
            }
            name={service.name}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceTab;
