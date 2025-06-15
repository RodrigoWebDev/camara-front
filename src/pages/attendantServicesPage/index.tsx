import PageHeader from '@/common/components/PageHeader';
import { Check, Clock3, Plus, RefreshCcw, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { useEffect, useState } from 'react';
import apiClient from '@/services/apiClient';
import AttendantServiceTable from '@/common/components/AttedantServiceTable';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import ManagerCard from '@/features/services/components/ManagerCard';

const textStyle =
  'text-base font-medium leading-6 text-center text-foreground font-sans whitespace-nowrap';

export const statusMap: Record<
  string,
  {
    label: string;
  }
> = {
  pendente: { label: 'Pendente' },
  'em atendimento': { label: 'Em andamento' },
  'aguardando documentos': {
    label: 'Aguardando documentos',
  },
  agendado: { label: 'Agendado' },
  concluido: { label: 'Concluído' },
  cancelado: { label: 'Cancelado' },

  pendentes: { label: 'Pendente' },
  em_andamento: { label: 'Em andamento' },
  aguardando_documentos: {
    label: 'Aguardando documentos',
  },
  pronto_para_retirar: { label: 'Proto para retirar' },
};

export type FieldData = {
  name: string;
  value: any;
};

export type TicketsData = {
  created_at: string;
  current_status: string;
  id: string;
  serviceName: string;
  serviceEstimatedTime: number;
  service_id: string;
  updated_at: string;
  userEmail: string;
  userName: string;
  userPhone: string | null;
  user_id: number;
  whatsapp_number: string | null;
  protocol: number;
  attendantName: string;
  attendantId: number;
  fields: FieldData[];
  chatId?: string;
};

export type HistoryDataProps = {
  history_id: number;
  ticket_id: string;
  action: string;
  message: string;
  attachment?: string;
  performed_by: number;
  performedByName: string;
  created_at: Date;
};

type TabType = 'todos' | 'pendente' | 'em_andamento' | 'concluido';

const AttendantServicesPage = () => {
  const [tab, setTab] = useState<TabType>('todos');
  const [data, setData] = useState<TicketsData[]>([]);
  const [historyData, setHistoryData] = useState<HistoryDataProps[]>([]);
  const [ticket, setTicket] = useState<TicketsData | null>(null);
  const [search, setSearch] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(false);

  const userId = parseInt(localStorage.getItem('id') ?? '');
  const roleName = localStorage.getItem('roleName');

  const isManager = roleName === 'administrador';
  const isMobile = useIsMobile();

  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(`/tickets`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Erro ao buscar usuário:', err));
  }, [refresh]);

  useEffect(() => {
    if (ticket) {
      apiClient
        .get(`/ticket-history/${ticket.id}`)
        .then((res) => setHistoryData(res.data))
        .catch((err) => console.error('Erro ao buscar histórico:', err));
    }
  }, [!!ticket]);

  const getDataFiltered = () =>
    data.filter((ticket) => {
      const isNumber = !isNaN(Number(search));

      const searchMatch =
        !search ||
        (isNumber
          ? ticket.protocol.toString().includes(search)
          : ticket.userName.toLowerCase().includes(search.toLowerCase()));

      const attendantMatch = isManager || ticket.attendantId === userId;
      const statusMatch = tab === 'todos' || ticket.current_status === tab;

      return searchMatch && attendantMatch && statusMatch;
    });

  const countStatus = (status: string) =>
    data.filter((ticket) => ticket.current_status === status).length;

  const managerCards = [
    {
      label: 'Pendentes',
      Icon: Clock3,
      count: countStatus('pendente'),
      bgColor: 'bg-background-yellow',
      color: 'text-alert',
    },
    {
      label: 'Em andamento',
      Icon: RefreshCcw,
      count: countStatus('em_andamento'),
      bgColor: 'bg-background-blue',
      color: 'text-primary',
    },
    {
      label: 'Pronto para retirar',
      Icon: Check,
      count: countStatus('pronto_para_retirar'),
      bgColor: 'bg-background-blue',
      color: 'text-primary',
    },
    {
      label: 'Concluídos',
      Icon: Check,
      count: countStatus('concluido'),
      bgColor: 'bg-background-green',
      color: 'text-success',
    },
  ];

  return (
    <div className="flex flex-col items-start gap-6 flex-1 w-full min-h-screen">
      <PageHeader classNameContainer="px-0" title="Atendimentos">
        <Button onClick={() => navigate('/novo-atendimento')}>
          <Plus />
          <span>Novo atendimento</span>
        </Button>
      </PageHeader>
      <div className="flex flex-col gap-4 w-full px-4">
        <div className="flex items-center gap-4 self-stretch relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por protocolo ou cidadão"
            className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isManager && (
          <div className="flex flex-col md:flex-row gap-4">
            {managerCards.map((card, i) => (
              <ManagerCard
                key={i}
                label={card.label}
                Icon={card.Icon}
                count={card.count}
                bgColor={card.bgColor}
                color={card.color}
              />
            ))}
          </div>
        )}
        {isMobile ? (
          <Select value={tab} onValueChange={(tab) => setTab(tab as TabType)}>
            <SelectTrigger className="flex h-10 px-3 py-2 justify-between items-center self-stretch rounded-md border border-input bg-white w-full">
              <SelectValue placeholder="Selecione um serviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Serviços</SelectLabel>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendente">Pendentes</SelectItem>
                <SelectItem value="em_andamento">Em andamento</SelectItem>
                <SelectItem value="concluido">Concluídos</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <Tabs value={tab} onValueChange={(tab) => setTab(tab as TabType)}>
            <TabsList className="w-full">
              <TabsTrigger value="todos">
                <p className={textStyle}>Todos</p>
              </TabsTrigger>
              <TabsTrigger value="pendente">
                <p className={textStyle}>Pendentes</p>
              </TabsTrigger>
              <TabsTrigger value="em_andamento">
                <p className={textStyle}>Em andamento</p>
              </TabsTrigger>
              <TabsTrigger value="concluido">
                <p className={textStyle}>Concluídos</p>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        <AttendantServiceTable
          data={getDataFiltered()}
          historyData={historyData}
          ticket={ticket}
          setTicket={setTicket}
          isManager={isManager}
          setRefresh={setRefresh}
        />
      </div>
    </div>
  );
};

export default AttendantServicesPage;
