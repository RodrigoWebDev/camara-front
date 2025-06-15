import { Schedule } from '@/features/schedules/services';
import { UserResponse } from '@/features/serviceSolicitation/services';
import apiClient from '@/services/apiClient';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Mail, Phone, User } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';

type ScheduleDetailProps = {
  schedule: Schedule;
  renderBadge: () => JSX.Element;
};

const ScheduleDetail = ({ schedule, renderBadge }: ScheduleDetailProps) => {
  const [user, setUser] = useState<UserResponse>();

  useEffect(() => {
    apiClient
      .get<UserResponse>(`users/${schedule.userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Erro ao retornar usuário:', err));
  }, []);

  const formattedDate = format(schedule.date, "d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
  const formatedSchedule = format(schedule.date, 'HH:mm');

  const infos = [
    { label: 'Serviço', value: schedule.name },
    { label: 'Cidadão', value: schedule.userName },
    { label: 'Data', value: formattedDate },
    { label: 'Horário', value: formatedSchedule },
    { label: 'Local', value: schedule.location },
    {
      label: 'Observações',
      value: schedule.observations ?? 'Nenhuma observação',
    },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-md border border-border p-4">
      {renderBadge()}
      <div className="grid md:grid-cols-2 gap-4">
        {infos.map((item, i) => (
          <div className="flex flex-col" key={i}>
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="text-base font-medium text-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <span className="text-base font-medium text-popover-foreground mb-2">
          Informações de Contato
        </span>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <User size={16} className="text-muted-foreground" />
            <span className="text-base text-foreground">{user?.full_name}</span>
          </div>
          {user?.phone && (
            <div className="flex gap-2 items-center">
              <Phone size={16} className="text-muted-foreground" />
              <span className="text-base text-foreground">{user.phone}</span>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <Mail size={16} className="text-muted-foreground" />
            <span className="text-base text-foreground">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
