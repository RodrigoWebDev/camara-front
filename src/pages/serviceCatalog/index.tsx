import CustomAlert from '@/common/components/CustomAlert';
import PageHeader from '@/common/components/PageHeader';
import ServiceCard from '@/common/components/ServiceCard';
import ServiceFilter from '@/common/components/ServiceFilter';
import apiClient from '@/services/apiClient';
import { Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Service = {
  id: string;
  requested: boolean;
  name: string;
  schedule: any | null;
  documents: any | null;
  rating: number | null;
  ratingQuantity: number | null;
  description: string;
  category: 'suggestions' | 'certificates' | 'others' | 'documents' | string;
  availability: boolean;
  addedFields: AddedField[];
  createdAt: string;
  updatedAt: string;
  estimatedTime: number;
};

type AddedField = {
  hint: string;
  type:
    | 'text'
    | 'textarea'
    | 'select'
    | 'multiSelect'
    | 'file'
    | 'date'
    | string;
  label: string;
  options: string[];
  required: boolean;
  placeholder: string;
};

export type Filter = { search: string; recent: boolean };

const ServiceCatalog = () => {
  const [serviceData, setServiceData] = useState<Service[]>([]);
  const [filter, setFilter] = useState<Filter>({
    search: '',
    recent: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(`/services`)
      .then((res) => setServiceData(res.data.results || []))
      .catch((err) => console.error('Erro ao buscar serviços:', err));
  }, []);

  // navegar para detalhes do serviço
  const handleDetailsClick = (id: string) => {
    navigate(`/detalhes-servico`, { state: { id } });
  };

  // navegar para solicitar serviço
  const handleSolicitClick = (id: string, title: string) => {
    const formatName = title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '-');
    navigate(`/solicitacao/${formatName}`, { state: { id } });
  };

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

  return (
    <div className="flex flex-col min-h-screen items-start flex-1 border-l border-l-input bg-background">
      <PageHeader
        title="Catálogo de Serviços"
        description="Conheça e solicite os serviços disponíveis na Câmara de Vereadores"
      />

      <article className="flex flex-col p-6 gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <CustomAlert
            title="Como solicitar um serviço"
            description={`Navegue pelos serviços disponíveis, clique em "Ver detalhes" para mais informações ou "Solicitar" para iniciar um pedido. Você pode filtrar por categoria ou usar a busca para encontrar serviços específicos.`}
            Icon={Info}
            type="info"
          />
          <ServiceFilter setFilter={setFilter} />
        </div>
        {filter.search === '' && (
          <section className="flex flex-col gap-4 w-full">
            <h2 className="text-lg font-semibold leading-7 text-foreground font-sans">
              Serviços populares
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {serviceData
                ?.slice(0, 3)
                .map((service, index) => (
                  <ServiceCard
                    key={index}
                    id={service.id}
                    title={service.name}
                    description={service.description}
                    schedule={service.estimatedTime}
                    documents={
                      service.addedFields.filter(
                        (field) => field.type === 'file'
                      ).length
                    }
                    rate={service.rating || 0}
                    reviews={service.ratingQuantity || 0}
                    onRequest={handleDetailsClick}
                    onSolicit={(id) => handleSolicitClick(id, service.name)}
                  />
                ))}
            </div>
          </section>
        )}
        <section className="flex flex-col gap-4 w-full">
          <h2 className="text-lg font-semibold leading-7 text-foreground font-sans">
            Todos os serviços
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {servicesFiltered?.map((service, index) => (
              <ServiceCard
                key={index}
                id={service.id}
                title={service.name}
                description={service.description}
                schedule={service.estimatedTime}
                documents={
                  service.addedFields.filter((field) => field.type === 'file')
                    .length
                }
                rate={service.rating || 0}
                reviews={service.ratingQuantity || 0}
                onRequest={handleDetailsClick}
                onSolicit={(id) => handleSolicitClick(id, service.name)}
              />
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};

export default ServiceCatalog;
