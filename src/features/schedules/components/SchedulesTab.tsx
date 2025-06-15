import { PaginationType } from '@/common/utils/types';
import { useEffect, useState } from 'react';
import { getSchedules, Schedule, ScheduleStatus } from '../services';
import ScheduleCard from '@/common/components/ScheduleCard';
import Pagination from '@/common/components/Pagination';
import { updateSchedule } from '@/features/attendantSchedule/services';

type ScheduleTabProps = {
  status: ScheduleStatus;
  page: number;
  setPage: (page: number) => void;
  setRefresh: (value: boolean) => void;
  refresh: boolean;
};

const SchedulesTab = ({
  status,
  page,
  setPage,
  setRefresh,
  refresh,
}: ScheduleTabProps) => {
  const [schedule, setSchedule] = useState<PaginationType<Schedule>>({
    pages: 0,
    results: [],
  });

  const limit = 3;

  useEffect(() => {
    fecthData();
    setRefresh(false);
  }, [page, status, refresh]);

  const fecthData = async () => {
    const userId = parseInt(localStorage.getItem('id') ?? '');
    const data = await getSchedules(userId, page, limit, status);
    setSchedule(data);
  };

  const onCancelSchedule = async (id: string) => {
    await updateSchedule(id, { status: 'canceled' });
    setRefresh(true);
  };

  const countResults = schedule.results.length;
  const showPagination =
    countResults === limit || (countResults < limit && page > 1);

  return (
    <div className="flex flex-col justify-between h-full px-4 pb-4">
      <div className="flex gap-4 flex-col mb-4">
        {schedule.results.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            onCancel={onCancelSchedule}
          />
        ))}
      </div>
      {showPagination && (
        <Pagination page={page} setPage={setPage} total={schedule.pages} />
      )}
    </div>
  );
};

export default SchedulesTab;
