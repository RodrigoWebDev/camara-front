import { cn } from '@/common/components/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Schedule } from '@/features/schedules/services';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import ScheduleDetail from './ScheduleDetail';
import { X } from 'lucide-react';
import ConfirmationDialog from '@/common/components/ConfirmationDialog';

type ScheduleCardProps = {
  schedule: Schedule;
  onCancel: (id: string) => void;
};

const ScheduleCard = ({ schedule, onCancel }: ScheduleCardProps) => {
  const [detailDialog, setDetailDialog] = useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);

  const displayStatus = {
    confirmed: 'Marcado',
    pending: 'Pendente',
    completed: 'Concluído',
    canceled: 'Cancelado',
  };

  const renderBadge = () => (
    <Badge
      className={cn(
        schedule.status === 'completed' && 'bg-background-green text-success',
        schedule.status === 'pending' && 'bg-background-yellow text-alert',
        schedule.status === 'canceled' && 'bg-background-red text-destructive',
        schedule.status === 'confirmed' && 'bg-background-blue text-primary'
      )}
    >
      {displayStatus[schedule.status]}
    </Badge>
  );

  const isMobile = useIsMobile();
  const getTime = () => format(parseISO(schedule.date), 'HH:mm');

  return (
    <div className="flex flex-col md:flex-row items-center rounded-[6px] border border-border bg-primary-foreground p-4">
      <div className="flex justify-between w-full sm:w-auto sm:pr-4">
        <span className="overflow-hidden text-primary text-xs font-semibold truncate">
          {getTime()}
        </span>
        {isMobile && renderBadge()}
      </div>
      <div className="flex flex-col gap-1 w-full mb-4 md:mb-0">
        <div>
          <span className="overflow-hidden text-foreground text-sm font-semibold truncate mr-2">
            {schedule.userName}
          </span>
          {!isMobile && renderBadge()}
        </div>
        <div className="flex flex-col">
          <span className="overflow-hidden text-muted-foreground text-xs font-medium truncate">
            {schedule.name}
          </span>
          <span className="overflow-hidden text-muted-foreground text-xs truncate">
            Atendente: {schedule.attendantName}
          </span>
        </div>
      </div>
      <div className="flex justify-end gap-4 w-full">
        {schedule.status !== 'canceled' && (
          <Button
            variant="outline"
            className="border-destructive bg-background"
            onClick={() => setConfirmDialog(true)}
          >
            <X stroke="var(--destructive)" />
            <span className="text-destructive">Cancelar</span>
          </Button>
        )}
        <Dialog
          open={detailDialog}
          onOpenChange={(open) => setDetailDialog(open)}
        >
          <DialogTrigger asChild>
            <Button className="flex-1 sm:flex-none">Ver</Button>
          </DialogTrigger>
          <DialogContent className="min-w-[50%]">
            <DialogHeader>
              <DialogTitle>Detalhes do Agendamento</DialogTitle>
            </DialogHeader>
            <ScheduleDetail schedule={schedule} renderBadge={renderBadge} />
          </DialogContent>
        </Dialog>
      </div>
      <ConfirmationDialog
        open={confirmDialog}
        setOpen={setConfirmDialog}
        onConfirm={() => onCancel(schedule.id)}
        title="Você tem certeza que deseja cancelar?"
      />
    </div>
  );
};

export default ScheduleCard;
