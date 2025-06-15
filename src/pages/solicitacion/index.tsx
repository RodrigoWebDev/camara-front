import { useEffect, useState } from 'react';
import ServiceFilter from '@/common/components/ServiceFilter';
import SolicitacionProgress from '@/common/components/SolicitacionProgress';
import StatusCard from '@/common/components/StatusCard';
import { FileText, Clock, CheckCircle, Archive } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import apiClient from '@/services/apiClient';
import { Filter } from '../serviceCatalog';
import { statusMap } from '../attendantServicesPage';

const Solicitacion = () => {
  const itemsPerPage = 2;
  const userId = parseInt(localStorage.getItem('id') ?? '');

  const [currentPage, setCurrentPage] = useState(1);
  const [tickets, setTickets] = useState<any>([]);
  const [filter, setFilter] = useState<Filter>({
    search: '',
    recent: false,
  });

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data } = await apiClient.get('/tickets');
        console.log('Tickets recebidos:', data);
        setTickets(data);
      } catch (error) {
        console.error('Erro ao buscar tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const getCountStatus = (status: string) =>
    tickets
      .filter((item: { user_id: number }) => item.user_id === userId)
      .filter(
        (item: { current_status: string }) => item.current_status === status
      ).length;

  const statusCards = [
    {
      title: 'Pendentes',
      number: getCountStatus('pendente'),
      Icon: Clock,
    },
    {
      title: 'Em andamento',
      number: getCountStatus('em_andamento'),
      Icon: FileText,
    },
    {
      title: 'Pronto para retirar',
      number: getCountStatus('pronto_para_retirar'),
      Icon: Archive,
    },
    {
      title: 'Concluídos',
      number: getCountStatus('concluido'),
      Icon: CheckCircle,
    },
  ];

  const ticketsFiltered = tickets
    .filter((item: { user_id: number }) => item.user_id === userId)
    .filter((item: { serviceName: string }) =>
      item.serviceName.toLowerCase().includes(filter.search.toLowerCase())
    )
    .sort((a: { created_at: string }, b: { created_at: string }) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return filter.recent ? dateB - dateA : dateA - dateB;
    });

  const totalPages = Math.ceil(tickets.length / itemsPerPage);
  const paginatedData = ticketsFiltered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col flex-1 items-start bg-secondary">
      <div className="flex flex-col w-full h-full items-start border-l border-border bg-background">
        <div className="flex h-20 px-4 items-center gap-4 shrink-0 self-stretch">
          <div className="flex flex-col items-start flex-1">
            <span className="text-card-foreground text-2xl font-semibold leading-8">
              Minhas Solicitações
            </span>
            <span className="text-muted-foreground text-base font-normal leading-6">
              Acompanhe o status de todas as suas solicitações
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 p-4 self-stretch">
          <div className="flex items-start gap-4 self-stretch flex-wrap">
            {statusCards.map((card, index) => (
              <StatusCard key={index} {...card} />
            ))}
          </div>

          <div className="flex items-start gap-2 self-stretch">
            <div className="w-full">
              <ServiceFilter setFilter={setFilter} />
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 self-stretch">
            {paginatedData.map((ticket: any, index: number) => (
              <SolicitacionProgress
                id={ticket.id}
                key={ticket.id || index}
                type={ticket.serviceName || 'Serviço'}
                number={`#${ticket.protocol_number || '00000'}`}
                date={ticket.created_at?.split('T')[0] || 'DD/MM/AAAA'}
                progress={ticket.progress || 0}
                currentStage={
                  statusMap[ticket.current_status]?.label || 'Em andamento'
                }
                nextStage={ticket.next_status?.name || 'Próxima etapa'}
                estimatedTime={
                  ticket.current_status?.estimated_time || 'Sem estimativa'
                }
                lastUpdate={ticket.updated_at?.split('T')[0] || 'DD/MM/AAAA'}
              />
            ))}

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    isDisabled={currentPage === 1}
                    href="#"
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      href="#"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    isDisabled={currentPage === totalPages}
                    href="#"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solicitacion;
