/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from '@/common/components/lib/utils';
import { PaginationType } from '@/common/utils/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Schedule } from '@/features/schedules/services';
import ScheduleCard from '@/features/schedule/components/ScheduleCard';
import { useIsMobile } from '@/hooks/use-mobile';
import apiClient from '@/services/apiClient';
import { format, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Loader, Plus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { updateSchedule } from '@/features/attendantSchedule/services';

const SchedulePage = () => {
  const tableHeader = ['Atendente', 'Qtd. dia', 'Ações'];

  const userId = parseInt(localStorage.getItem('id') ?? '');
  const roleName = localStorage.getItem('roleName');
  const isManager = roleName === 'administrador';

  const navigate = useNavigate();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tab, setTab] = useState('all');
  const [openDialogIndex, setOpenDialogIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State to trigger refresh of schedules
  const [refresh, setRefresh] = useState<boolean>(false);

  const isMobile = useIsMobile();

  const dateFormatted = format(selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get<PaginationType<Schedule>>('schedule', {
        params: { status: tab === 'all' ? '' : tab },
      })
      .then((res) => setSchedules(resultsFiltered(res.data.results)))
      .catch((err) => console.error('Erro ao retornar agendamentos:', err))
      .finally(() => setIsLoading(false));

    setRefresh(false);
  }, [tab, refresh]);

  const resultsFiltered = (schedules: Schedule[]) => {
    if (isManager) return schedules;
    return schedules.filter((schedule) => schedule.attendantId === userId);
  };

  const onCancelSchedule = async (id: string) => {
    await updateSchedule(id, { status: 'canceled' });
    setRefresh(true);
  };

  const filteredByDate = () =>
    schedules.filter((schedule) => {
      const parsedDate = parseISO(schedule.date);
      return isSameDay(parsedDate, selectedDate);
    });

  const count = schedules.reduce(
    (acc, schedule) => {
      const parsedDate = parseISO(schedule.date);
      if (!isSameDay(parsedDate, selectedDate)) return acc;

      if (schedule.status === 'pending')
        return { ...acc, pending: acc.pending + 1 };
      if (schedule.status === 'confirmed')
        return { ...acc, confirmed: acc.confirmed + 1 };
      if (schedule.status === 'canceled')
        return { ...acc, canceled: acc.canceled + 1 };

      return acc;
    },
    { pending: 0, confirmed: 0, canceled: 0 }
  );

  const availabilityAttendants = schedules.reduce(
    (acc, schedule) => {
      const parsedDate = parseISO(schedule.date);
      if (!isSameDay(parsedDate, selectedDate)) return acc;

      const { attendantName } = schedule;

      if (!acc[attendantName]) {
        acc[attendantName] = [];
      }

      acc[attendantName] = [...acc[attendantName], schedule];
      return acc;
    },
    {} as Record<string, Schedule[]>
  );

  // Create a set of days that have schedules
  const daysWithSchedules = new Set(
    schedules.map((schedule) => format(parseISO(schedule.date), 'yyyy-MM-dd'))
  );

  const daysWithoutSchedules = (date: Date) => {
    const key = format(date, 'yyyy-MM-dd');
    return !daysWithSchedules.has(key);
  };

  return (
    <div className="flex flex-col w-full border-l bg-background p-4 h-full">
      <div className="flex justify-between mb-4">
        <h1 className="text-card-foreground text-2xl font-semibold">Agenda</h1>
        <Button onClick={() => navigate('/novo-agendamento')}>
          <Plus />
          <span>Novo agendamento</span>
        </Button>
      </div>
      <div
        className={cn(
          'flex flex-col md:flex-row gap-4 mb-4',
          !isManager && 'h-full'
        )}
      >
        <Card className="w-full md:w-[300px] gap-4 h-max">
          <CardHeader>
            <CardTitle className="text-popover-foreground text-lg font-medium">
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-between">
            <div className="h-[350px]">
              <Calendar
                mode="single"
                className={cn(
                  'border rounded-md',
                  isMobile && '[&_th]:flex-1 [&_td]:flex-1'
                )}
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                locale={ptBR}
                modifiers={{ noSchedule: daysWithoutSchedules }}
                modifiersClassNames={{
                  noSchedule: 'bg-muted text-muted-foreground opacity-50',
                }}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2 items-center">
                <div className="h-[12px] w-[12px] rounded-full bg-success"></div>
                <span className="text-foreground text-sm">
                  Confirmados ({count.confirmed})
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-[12px] w-[12px] rounded-full bg-alert"></div>
                <span className="text-foreground text-sm">
                  Pendentes ({count.pending})
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-[12px] w-[12px] rounded-full bg-destructive"></div>
                <span className="text-foreground text-sm">
                  Cancelados ({count.canceled})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full md:w-[80%]">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:justify-between">
            <CardTitle className="text-popover-foreground text-lg font-medium">
              Agendamentos para {dateFormatted}
            </CardTitle>
            {isMobile ? (
              <Select onValueChange={setTab} value={tab}>
                <SelectTrigger className="w-full">
                  <SelectValue defaultValue="all" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="confirmed">Confirmados</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmados</TabsTrigger>
                  <TabsTrigger value="pending">Pendentes</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </CardHeader>
          <CardContent
            className={cn(
              'flex flex-col gap-4',
              !isMobile && 'overflow-auto',
              isManager && 'h-[396px]'
            )}
          >
            {!isLoading &&
              filteredByDate().map((schedule, i) => (
                <ScheduleCard
                  key={i}
                  schedule={schedule}
                  onCancel={onCancelSchedule}
                />
              ))}
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <span className="text-muted-foreground">
                  <Loader />
                </span>
              </div>
            )}
            {!isLoading && filteredByDate().length === 0 && (
              <div className="flex items-center justify-center h-full">
                <span className="text-muted-foreground">
                  Nenhum agendamento encontrado para esta data.
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {isManager && (
        <Card className="gap-4">
          <CardHeader>
            <CardTitle>Agendamento diário dos Atendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary">
                  {tableHeader.map((label, i) => (
                    <TableHead key={i} className="text-muted-foreground">
                      {label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(availabilityAttendants).map(
                  ([attendantName, schedules], i) => (
                    <TableRow key={i}>
                      <TableCell>{attendantName}</TableCell>
                      <TableCell>{schedules.length}</TableCell>
                      <TableCell className="w-[150px]">
                        <Dialog
                          open={openDialogIndex === i}
                          onOpenChange={(open) =>
                            setOpenDialogIndex(open ? i : null)
                          }
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Users />
                              <span>Ver agenda</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                Agendamentos de {attendantName}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-4">
                              {schedules.map((schedule) => (
                                <ScheduleCard
                                  key={i}
                                  schedule={schedule}
                                  onCancel={() => {}}
                                />
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SchedulePage;
