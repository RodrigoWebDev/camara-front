import { Badge } from '@/common/components/ui/badge';
import { cn } from '../../lib/utils';

type StatusType = 'confirmed' | 'pending' | 'completed' | 'canceled';

type ScheduleContentProps = {
  title: string;
  date: string;
  status: StatusType;
};

const statusMap = {
  confirmed: 'Confirmado',
  pending: 'Pendente',
  completed: 'Concluído',
  canceled: 'Cancelado',
};

const ScheduleContent = ({ title, date, status }: ScheduleContentProps) => {
  return (
    <div className="flex justify-center items-center self-stretch">
      <div className="flex flex-col items-start flex-[1_0_0]">
        <p className="self-stretch text-base font-medium leading-6 text-foreground font-sans">
          {title}
        </p>
        <p className="self-stretch text-sm font-normal leading-none text-muted-foreground font-sans">
          {date}
        </p>
      </div>
      <div>
        <Badge
          className={cn(
            'flex items-center justify-center px-[10px] py-[2px] gap-[10px] rounded-full border border-transparent text-xs font-semibold leading-4 font-sans',
            status === 'pending' && 'bg-background-yellow text-alert',
            status === 'confirmed' && 'bg-background-blue text-primary',
            status === 'completed' && 'bg-background-green text-success',
            status === 'canceled' && 'bg-background-red text-destructive'
          )}
        >
          {statusMap[status]}
        </Badge>
      </div>
    </div>
  );
};

export default ScheduleContent;
