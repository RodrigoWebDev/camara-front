import PageHeader from '@/common/components/PageHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SchedulesTab from '@/features/schedules/components/SchedulesTab';
import {
  getStatusCount,
  ScheduleStatus,
  StatusCount,
} from '@/features/schedules/services';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

const SchedulesPage = () => {
  const isMobile = useIsMobile();

  const [refresh, setRefresh] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<ScheduleStatus>('confirmed');
  const [statusCount, setStatusCount] = useState<StatusCount>({
    pending: 0,
    confirmed: 0,
    completed: 0,
    canceled: 0,
  });

  useEffect(() => {
    fecthData();
    setRefresh(false);
  }, [refresh]);

  const fecthData = async () => {
    const userId = parseInt(localStorage.getItem('id') ?? '');
    const data = await getStatusCount(userId);
    setStatusCount(data);
  };

  const handleFilterChange = (value: string) => {
    setPage(1);
    setStatus(value as ScheduleStatus);
  };

  return (
    <div className="flex flex-col w-full min-h-screen border-l bg-background">
      <PageHeader
        title="Agendamentos"
        description="Gerencie seus agendamentos e compromissos"
      />
      {isMobile ? (
        <div className="px-4 flex flex-col gap-4 flex-grow pb-4">
          <Select value={status} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirmed">
                Confirmados ({statusCount.confirmed})
              </SelectItem>
              <SelectItem value="pending">
                Pendentes ({statusCount.pending})
              </SelectItem>
              <SelectItem value="completed">
                Concluídos ({statusCount.completed})
              </SelectItem>
              <SelectItem value="completed">
                Cancelados ({statusCount.canceled})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <Tabs className="p-4" value={status} onValueChange={handleFilterChange}>
          <TabsList className="w-full">
            <TabsTrigger value="confirmed">
              Confirmados ({statusCount.confirmed})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pendentes ({statusCount.pending})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Concluídos ({statusCount.completed})
            </TabsTrigger>
            <TabsTrigger value="canceled">
              Cancelados ({statusCount.canceled})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      <SchedulesTab
        status={status}
        page={page}
        setPage={setPage}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </div>
  );
};

export default SchedulesPage;
