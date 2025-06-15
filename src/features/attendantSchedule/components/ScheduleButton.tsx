import { cn } from '@/common/components/lib/utils';
import { useEffect } from 'react';

type ScheduleButtonProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  schedule: string;
};

const ScheduleButton = ({
  selectedDate,
  setSelectedDate,
  schedule,
}: ScheduleButtonProps) => {
  useEffect(() => {
    return () => setDate(new Date(), 0, 0);
  }, []);

  const [hours, minutes] = schedule.split(':').map(Number);

  const isSelected =
    selectedDate.getHours() === hours && selectedDate.getMinutes() === minutes;

  const handleClick = () => {
    const mountedDate = new Date(selectedDate);
    setDate(mountedDate, hours, minutes);
  };

  const setDate = (date: Date, hours: number, minutes: number) => {
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    setSelectedDate(date);
  };

  return (
    <button
      className={cn(
        'rounded-md border w-full py-6 text-center text-sm cursor-pointer',
        isSelected ? 'border-primary bg-secondary' : 'border-border'
      )}
      onClick={handleClick}
    >
      {schedule}
    </button>
  );
};

export default ScheduleButton;
