import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '@/common/components/PageHeader';
import ActionCard from '@/common/components/ActionCard';
import SolicitacionDocsStatus from '@/common/components/SolicitacionDocsStatus';
import SolicitacionDocsDetails from '@/common/components/SolicitacionDocsDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import apiClient from '@/services/apiClient';
import { TicketsData } from '../attendantServicesPage';
import { format, parseISO } from 'date-fns';
import StatusSolicitacion from '@/common/components/StatusSolicitacion';

const SolicitacionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const [ticket, setTicket] = useState<TicketsData | null>(null);

  useEffect(() => {
    apiClient
      .get(`tickets/${id}`)
      .then((res) => setTicket(res.data))
      .catch((err) => console.error('Erro ao retornar ticket:', err));
  }, []);

  const formatDateBR = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch {
      return '';
    }
  };

  // retornar do backend
  const isFile = (value: string) => value.includes('/bucket-camara-files');

  return (
    <div className="flex items-center w-full min-h-screen bg-[--elevation-surface]">
      <div className="flex flex-col items-start flex-1 min-h-screen border-l border-border bg-background">
        <PageHeader
          title={ticket?.serviceName ?? ''}
          description={`Protocolo: #${ticket?.protocol} • Solicitado em: ${formatDateBR(ticket?.created_at)}`}
          handleBack={() => navigate('/minhas-solicitacoes')}
        />

        <div className="flex flex-col md:flex-row items-start gap-4 p-4 flex-1 self-stretch">
          <div className="flex flex-col gap-4 w-full md:max-w-[45.125rem]">
            {ticket && (
              <StatusSolicitacion
                status={ticket?.current_status}
                createdAt={ticket?.created_at}
                updatedAt={ticket?.updated_at}
                estimatedTime={ticket.serviceEstimatedTime}
              />
            )}
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="w-full">
                {/* <TabsTrigger value="timeline">Timeline</TabsTrigger> */}
                <TabsTrigger value="documents">Documentos</TabsTrigger>
                <TabsTrigger value="details">Detalhes</TabsTrigger>
              </TabsList>
              {/* <TabsContent value="timeline"></TabsContent> */}
              <TabsContent value="documents">
                {ticket && (
                  <SolicitacionDocsStatus
                    documents={ticket?.fields
                      .filter((field) => isFile(field.value))
                      .map((field) => ({
                        name: field.value.split('bucket-camara-files/')[1],
                        file: field.value,
                      }))}
                  />
                )}
              </TabsContent>
              <TabsContent value="details">
                {ticket && (
                  <SolicitacionDocsDetails
                    items={ticket?.fields.filter(
                      (field) => !isFile(field.value)
                    )}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex flex-col items-start gap-2 flex-1 self-stretch">
            {/* <div className="flex flex-col items-start gap-4 p-4 self-stretch">
              <ActionCard isAction={true} />
            </div>

            <div className="flex flex-col items-start gap-4 p-4 self-stretch">
              <MessageCard
                name="Ana Silva"
                date="24/05/2023"
                receivedMsg="Seus documentos foram recebidos e estão em análise. Entraremos em contato caso seja necessário algum ajuste."
              />
            </div> */}
            <div className="flex flex-col items-start gap-4 self-stretch">
              <ActionCard isAction={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolicitacionDetails;
