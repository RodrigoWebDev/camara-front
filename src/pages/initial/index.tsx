import InitialCard from '@/common/components/InitialCard';
import PageHeader from '@/common/components/PageHeader';
import NewServiceCard from '@/common/components/NewServiceCard';
import { useEffect, useState } from 'react';
import apiClient from '@/services/apiClient';

export type ScheduleItem = {
  id: string;
  name: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed';
};

const Initial = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
  const [inProgress, setInProgress] = useState<string>('');
  const [completed, setCompleted] = useState<string>('');
  const fullName = localStorage.getItem('name');
  const firstName = fullName?.split(' ')[0] || '';

  const userId = parseInt(localStorage.getItem('id') ?? '');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { data } = await apiClient.get('/schedule', {
          params: { userId },
        });
        setScheduleData(data.results);
      } catch (error) {
        console.error('Erro ao buscar agenda:', error);
      }
    };
    const fetchSolicitation = async () => {
      try {
        const { data } = await apiClient.get('/tickets');
        const dataFilteredByClient = data.filter(
          (item: { user_id: number }) => item.user_id === userId
        );
        setInProgress(
          dataFilteredByClient.filter(
            (item: { current_status: string }) =>
              item.current_status === 'em_andamento'
          ).length
        );
        setCompleted(
          dataFilteredByClient.filter(
            (item: { current_status: string }) =>
              item.current_status === 'concluido'
          ).length
        );
      } catch (error) {
        console.error('Erro ao buscar tickets:', error);
      }
    };
    fetchSchedule();
    fetchSolicitation();
  }, []);

  return (
    <div className="flex items-center h-auto">
      <article className="flex flex-col items-start gap-4  self-stretch md:flex-1">
        <PageHeader
          title={`Olá, ${firstName}!`}
          description="Bem-vindo(a) ao Portal de Serviços da Câmara de Vereadores de Florianópolis"
        />
        <div className="flex flex-col items-start gap-4 p-4 self-stretch md:flex-1">
          {/* <CustomAlert
            title="Verifique sua conta"
            description="Para garantir a segurança e ter acesso a todos os serviços do portal, verifique sua identidade."
            type="alert"
            Icon={ShieldAlert}
            isVerify
          /> */}
          <div className="grid gap-4 md:grid-cols-3">
            <InitialCard completed={completed} inProgress={inProgress} />
            <InitialCard isSchedule={scheduleData} />
            <NewServiceCard />
          </div>
        </div>
      </article>
    </div>
  );
};

export default Initial;
