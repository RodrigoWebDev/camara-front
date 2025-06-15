import { useEffect, useState } from 'react';
import { getServices, ServiceResponse } from '../services';
import ServiceCard from './ServiceCard';

type ServiceTabProps = {
  selectService: (service: ServiceResponse) => void;
};

const ServiceTab = ({ selectService }: ServiceTabProps) => {
  const [services, setServices] = useState<ServiceResponse[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getServices();
    setServices(data);
  };

  return (
    <div className="px-4">
      <h1 className="text-lg font-medium leading-7 text-card-foreground">
        Iniciar novo atendimento
      </h1>
      <p className="text-base font-normal leading-6 text-muted-foreground">
        Selecione o tipo de serviço para este atendimento.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {services.map((service, i) => (
          <ServiceCard
            key={i}
            name={service.name}
            description={service.description}
            onClick={() => selectService(service)}
            estimatedTime={
              service.estimatedTime > 1
                ? `${service.estimatedTime} dias úteis`
                : `${service.estimatedTime} dia útil`
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceTab;
