import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/common/components/ui/button';
import SolicitationContent from './SolicitationContent';
import ScheduleContent from './ScheduleContent';
import { ScheduleItem } from '@/pages/initial';
import { useNavigate } from 'react-router-dom';

type SolicitationCardProps = {
  isSchedule?: ScheduleItem[];
  inProgress?: string;
  completed?: string;
};

const InitialCard = ({
  isSchedule = undefined,
  inProgress,
  completed,
}: SolicitationCardProps) => {
  const formatDate = (date: string) => {
    const convertedDate = new Date(date);

    const formattedDate = convertedDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });

    const formattedTime = convertedDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${formattedDate} às ${formattedTime}`;
  };

  const navigate = useNavigate();

  const renderSchedules = () =>
    isSchedule?.length
      ? isSchedule
          .slice(0, 2)
          .map((e) => (
            <ScheduleContent
              key={e.id}
              title={e.name}
              date={formatDate(e.date)}
              status={e.status}
            />
          ))
      : 'Você não possui nenhum agendamento.';

  return (
    <Card
      className={`flex flex-col p-6 items-start gap-6 flex-[1_0_0] self-stretch rounded-lg border ${
        !isSchedule && `border-sidebar-border`
      } ${!isSchedule && `bg-sidebar-foreground shadow-sm`}`}
    >
      <CardHeader className="flex flex-col p-0 items-start gap-0 self-stretch">
        <div className="flex flex-col items-start gap-[6px] self-stretch">
          <CardTitle className="flex items-center gap-2 self-stretch justify-between text-lg font-semibold leading-7 text-card-foreground font-sans">
            {isSchedule ? `Meus agendamentos` : `Minhas solicitações`}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-start gap-[2px] flex-[1_0_0] self-stretch p-0">
        {isSchedule ? (
          renderSchedules()
        ) : (
          <SolicitationContent
            inProgress={inProgress!}
            completed={completed!}
          />
        )}
      </CardContent>

      <CardFooter className="flex p-0 justify-between items-start self-stretch">
        <Button
          className={`flex h-[40px] py-2 justify-center items-center gap-2 flex-[1_0_0]`}
          variant={isSchedule ? `outline` : `default`}
          onClick={() =>
            navigate(isSchedule ? '/agendamentos' : '/minhas-solicitacoes')
          }
        >
          {isSchedule ? `Ver agenda` : `Ver todas`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InitialCard;
