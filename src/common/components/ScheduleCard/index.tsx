import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { FileText, CalendarDays, MapPin, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/features/schedules/services';
import clsx from 'clsx';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ScheduleDetail from '@/features/schedule/components/ScheduleDetail';
import ConfirmationDialog from '../ConfirmationDialog';

type ScheduleCardProps = {
  schedule: Schedule;
  onCancel: (id: string) => void;
};

const ScheduleCard = ({ schedule, onCancel }: ScheduleCardProps) => {
  const statusLabel = {
    confirmed: 'Confirmado',
    pending: 'Pendente',
    completed: 'Concluído',
    canceled: 'Cancelado',
  };

  const [detailDialog, setDetailDialog] = useState<boolean>(false);
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

  const formatDate = () => {
    const convertedDate = new Date(schedule.date);

    const formattedDate = convertedDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const formattedTime = convertedDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${formattedDate} às ${formattedTime}`;
  };

  const renderBadge = () => (
    <Badge
      className={clsx({
        'bg-primary text-primary-foreground': schedule.status === 'confirmed',
        'bg-base-secondary text-secondary-foreground':
          schedule.status === 'pending',
        'bg-success text-destructive-foreground':
          schedule.status === 'completed',
        'bg-background-red text-destructive': schedule.status === 'canceled',
      })}
    >
      {statusLabel[schedule.status]}
    </Badge>
  );

  return (
    <Card className="py-4 gap-4">
      <CardHeader className="px-4 pb-2 md:pb-4 md:border-b md:border-border">
        <div className="md:hidden mb-4">{renderBadge()}</div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <FileText size={40} strokeWidth={1} stroke="var(--primary)" />
            <div>
              <CardTitle>{schedule.name}</CardTitle>
              <CardDescription>{schedule.description}</CardDescription>
            </div>
          </div>
          <div className="hidden md:block">{renderBadge()}</div>
        </div>
      </CardHeader>
      <CardContent className="px-4">
        <div className="mb-4">
          <div className="flex gap-2 items-center">
            <CalendarDays size={16} stroke="var(--muted-foreground)" />
            <span className="text-base font-normal leading-6 text-foreground">
              {formatDate()}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin size={16} stroke="var(--muted-foreground)" />
            <span className="text-base font-normal leading-6 text-foreground">
              {schedule.location}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <Button
            variant="outline"
            className="text-base font-medium leading-6"
            onClick={() => setDetailDialog(true)}
          >
            Ver detalhes
          </Button>
          {/* <Button variant="outline">
            <Download />
            <span className="text-base font-medium leading-6">Comprovante</span>
          </Button> */}
          {schedule.status !== 'canceled' && (
            <Button
              variant="outline"
              className="border-destructive bg-background"
              onClick={() => setConfirmationDialog(true)}
            >
              <X stroke="var(--destructive)" />
              <span className="text-base font-medium leading-6 text-destructive">
                Cancelar
              </span>
            </Button>
          )}
        </div>
        <Dialog
          open={detailDialog}
          onOpenChange={(open) => setDetailDialog(open)}
        >
          <DialogContent className="min-w-[50%]">
            <DialogHeader>
              <DialogTitle>Detalhes do Agendamento</DialogTitle>
            </DialogHeader>
            <ScheduleDetail schedule={schedule} renderBadge={renderBadge} />
          </DialogContent>
        </Dialog>
      </CardContent>
      <ConfirmationDialog
        onConfirm={() => onCancel(schedule.id)}
        title="Você tem certeza que deseja cancelar?"
        open={confirmationDialog}
        setOpen={setConfirmationDialog}
      />
    </Card>
  );
};

export default ScheduleCard;
