import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ServiceFilter from '@/common/components/ServiceFilter';
import ManagerServiceCard from '@/common/components/ManagerServiceCard';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import apiClient from '@/services/apiClient';
import { Service } from '@/features/attendantSchedule/services';
import { Filter } from '../serviceCatalog';

import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ServicesManagement = () => {
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState<Service[]>([]);
  const [filter, setFilter] = useState<Filter>({
    search: '',
    recent: false,
  });

  useEffect(() => {
    apiClient
      .get(`/services`)
      .then((res) => setServiceData(res.data.results || []))
      .catch((err) => console.error('Erro ao buscar serviços:', err));
  }, []);

  const servicesFiltered = serviceData
    .filter((service) => service.availability)
    .filter((service) =>
      service.name.toLowerCase().includes(filter.search.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return filter.recent ? dateB - dateA : dateA - dateB;
    });

  const handleDetailsClick = (id: string) => {
    navigate(`/detalhes-servicos`, { state: { id } });
  };

  return (
    <section className="flex flex-col p-4 items-start gap-8 self-stretch">
      <div className="flex flex-col justify-center items-start gap-4 px-0 self-stretch md:flex-row md:items-center">
        <div className="flex flex-col items-start flex-[1_0_0]">
          <p className="text-2xl font-semibold leading-8 text-card-foreground font-sans">
            Gerenciamento de Serviços
          </p>
        </div>
        <div className="flex items-start gap-4">
          <Button
            className="flex h-10 px-4 py-2 justify-center items-center gap-2"
            onClick={() => navigate('/novo-servico')}
          >
            <Plus className="w-4 h-4" />
            <p className="text-base font-medium leading-6 text-primary-foreground font-sans">
              Criar novo serviço
            </p>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 self-stretch">
        <ServiceFilter setFilter={setFilter} />

        <div className="flex flex-wrap items-start content-start gap-y-4 gap-x-4 self-stretch">
          {servicesFiltered?.map((param, index) => (
            <ManagerServiceCard
              key={index}
              id={param.id}
              title={param.name}
              description={param.description}
              enabledCategory={param.availability}
              fields={param.addedFields.length}
              creation={format(parseISO(param.createdAt), 'dd/MM/yyyy', {
                locale: ptBR,
              })}
              onRequest={handleDetailsClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesManagement;
