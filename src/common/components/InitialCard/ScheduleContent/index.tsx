import { Badge } from '@/common/components/ui/badge';

type StatusType = `Pendente` | `Confirmado` | `Cancelado`;

type ScheduleContentProps = {
  title: string;
  date: string;
  status: string | StatusType;
};

const pending =
  'flex justify-center items-center px-[10px] py-[2px] gap-[10px] rounded-full border border-transparent bg-secondary text-xs font-semibold leading-4 text-foreground font-sans';
const success =
  'flex items-center justify-center px-[10px] py-[2px] gap-[10px] rounded-full border border-transparent bg-success text-xs font-semibold leading-4 font-sans';

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
        <Badge className={status === 'Pendente' ? pending : success}>
          {status}
        </Badge>
      </div>
    </div>
  );
};

export default ScheduleContent;
