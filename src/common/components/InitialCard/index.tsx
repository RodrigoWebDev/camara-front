import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/common/components/ui/button';

import { CalendarDays, FileText } from 'lucide-react';
import SolicitationContent from './SolicitationContent';
import ScheduleContent from './ScheduleContent';

type SolicitationCardProps = {
  isSchedule?: boolean;
  inProgress?: string;
  completed?: string;
};

const mockSchedule = [
  {
    title: 'Audiencia',
    date: '23/05 as 09:30',
    status: 'Pendente',
  },
  {
    title: 'Retirada de RD PET',
    date: '23/05 as 20:30',
    status: 'Confirmado',
  },
];

// Initial Card Main

const InitialCard = ({
  isSchedule = false,
  inProgress,
  completed,
}: SolicitationCardProps) => {
  return (
    <Card
      className={`flex flex-col p-6 items-start gap-6 flex-[1_0_0] self-stretch rounded-lg border ${!isSchedule && `border-sidebar-border`} ${!isSchedule && `bg-sidebar-foreground shadow-sm`}`}
    >
      <CardHeader className="flex flex-col p-0 items-start gap-0 self-stretch">
        <div className="flex flex-col items-start gap-[6px] self-stretch">
          <CardTitle className="flex items-center gap-2 self-stretch justify-between text-lg font-semibold leading-7 text-card-foreground font-sans">
            {isSchedule ? `Meus agendamentos` : `Minhas solicitações`}
            {isSchedule ? (
              <CalendarDays className="w-[18px] h-[18px]" />
            ) : (
              <FileText className="w-[18px] h-[18px]" />
            )}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-start gap-[2px] flex-[1_0_0] self-stretch p-0">
        {isSchedule ? (
          mockSchedule.map((e) => (
            <ScheduleContent title={e.title} date={e.date} status={e.status} />
          ))
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
        >
          {isSchedule ? `Ver todas` : `Ver agenda`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InitialCard;
