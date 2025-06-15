import { Check, Clock3, RefreshCcw, Users } from 'lucide-react';
import PageHeader from '@/common/components/PageHeader';
import AttendantStatusCard from '@/common/components/AttendantStatusCard';
import AttendantServices from '@/common/components/AttendantServices';
import AttendantTab from '@/common/components/AttendantTab';
import BarChartCard from '@/common/components/BarChart';
import PieChartCard from '@/common/components/PieChart';
import { useEffect, useState } from 'react';
import apiClient from '@/services/apiClient';
import { statusMap } from '../attendantServicesPage';

type Nps = {
  id: string;
  ticketId: string;
  clientId: number;
  attendantId: number;
  rating: number;
  feedback: string;
  createdAt: Date;
};

const AttendantDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [npsAverage, setNpsAverage] = useState<number>(0);

  const date = new Date();
  const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'long' });
  const dateActual = date.toLocaleDateString('pt-BR', { dateStyle: 'long' });

  const userId = parseInt(localStorage.getItem('id') ?? '');
  const fullName = localStorage.getItem('name');
  const firstName = fullName?.split(' ')[0] || '';

  useEffect(() => {
    apiClient
      .get('tickets')
      .then((res) => setTickets(filterByUser(res.data)))
      .catch((err) => console.error('Erro ao retornar tickets:', err));
  }, []);

  useEffect(() => {
    apiClient
      .get('nps')
      .then((res) => setNpsAverage(getNpsAverage(res.data.results)))
      .catch((err) => console.error('Erro ao retornar avaliações:', err));
  }, []);

  const getNpsAverage = (nps: Nps[]) => {
    const ratings = nps
      .filter((n) => n.attendantId === userId)
      .map((n) => n.rating);

    if (ratings.length === 0) return 0;

    const total = ratings.reduce((acc, curr) => acc + curr, 0);
    return total / ratings.length;
  };

  const filterByUser = (tickets: any) =>
    tickets.filter((item: { user_id: number }) => item.user_id === userId);

  const getCountStatus = (status: string) =>
    tickets.filter(
      (item: { current_status: string }) => item.current_status === status
    ).length;

  const statusCardContent = [
    {
      title: 'Pendentes',
      cardNumber: getCountStatus('pendente'),
      icon: <Clock3 className="w-8 h-8 shrink-0 text-alert" />,
      iconBg: 'bg-custom-yellow',
    },
    {
      title: 'Em andamento',
      cardNumber: getCountStatus('em_andamento'),
      icon: <RefreshCcw className="w-8 h-8 shrink-0 text-primary" />,
      iconBg: 'bg-sky-50',
    },
    {
      title: 'Concluídos hoje',
      cardNumber: getCountStatus('concluido'),
      icon: <Check className="w-8 h-8 shrink-0 text-success" />,
      iconBg: 'bg-green-50',
    },
    {
      title: 'NPS (30 dias)',
      cardNumber: npsAverage,
      icon: <Users className="w-8 h-8 shrink-0 text-purple-600" />,
      iconBg: 'bg-purple-50',
    },
  ];

  const serviceContent = tickets.reduce(
    (
      acc: { name: string; countPending: number }[],
      ticket: { serviceName: string; current_status: string }
    ) => {
      const serviceIndex = acc.findIndex(
        (item) => item.name === ticket.serviceName
      );

      if (serviceIndex !== -1) {
        if (ticket.current_status === 'pendente') {
          acc[serviceIndex].countPending += 1;
        }
      } else {
        acc.push({ name: ticket.serviceName, countPending: 0 });
      }
      return acc;
    },
    []
  );

  const barChartData = tickets.reduce(
    (
      acc: { name: string; value1: number; value2: number }[],
      ticket: { id: string; serviceName: string; current_status: string }
    ) => {
      const serviceIndex = acc.findIndex(
        (item) => item.name === ticket.serviceName
      );

      if (serviceIndex !== -1) {
        if (ticket.current_status === 'concluido') {
          acc[serviceIndex].value1 += 1;
        }
        if (ticket.current_status === 'pendente') {
          acc[serviceIndex].value2 += 1;
        }
      } else {
        acc.push({ name: ticket.serviceName, value1: 0, value2: 0 });
      }
      return acc;
    },
    []
  );

  const pieChartData = tickets.reduce(
    (
      acc: { name: string; value: number; label: string; fill: string }[],
      ticket: { current_status: string },
      index: number
    ) => {
      const statusIndex = acc.findIndex(
        (item) => item.name === ticket.current_status
      );
      if (statusIndex !== -1) {
        acc[statusIndex].value += 1;
      } else {
        acc.push({
          name: ticket.current_status,
          value: 1,
          label: statusMap[ticket.current_status]?.label,
          fill: `var(--chart-${index + 1})`,
        });
      }
      return acc;
    },
    []
  );

  return (
    <div className="flex flex-col flex-[1_0_0] border-l border-border bg-background">
      <PageHeader
        title={`Bem vindo, ${firstName}!`}
        description={`Hoje é ${dayOfWeek}, ${dateActual}`}
      />
      <div className="flex flex-col items-start p-4 gap-2 self-stretch md:flex-row md:flex-wrap md:items-start md:content-start md:gap-y-4 md:gap-x-4">
        {statusCardContent.map((item, index) => (
          <AttendantStatusCard
            key={index}
            title={item.title}
            icon={item.icon}
            iconBg={item.iconBg}
            number={item.cardNumber}
          />
        ))}
      </div>
      <div className="flex flex-col items-start p-4 gap-4 self-stretch">
        <p className="text-lg font-semibold leading-7 text-foreground font-sans">
          Meus serviços
        </p>
        <div className="grid md:grid-cols-4 gap-2 w-full">
          {serviceContent.map((item, index) => (
            <AttendantServices
              key={index}
              name={item.name}
              countPending={item.countPending}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col p-4 gap-4 self-stretch">
        <AttendantTab tickets={tickets} />
        <div className="flex flex-col items-start gap-2 self-stretch md:flex-row md:items-start md:content-start md:gap-x-4 md:gap-y-4">
          <BarChartCard
            title="Atendimentos por Serviço"
            description=""
            className="w-full md:w-1/2"
            labels={['Concluídos', 'Pendentes']}
            data={barChartData}
            height={21.875}
          />
          <PieChartCard
            title={'Status dos Atendimentos'}
            description={''}
            data={pieChartData}
            height={21.875}
            className="w-full md:w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default AttendantDashboard;
