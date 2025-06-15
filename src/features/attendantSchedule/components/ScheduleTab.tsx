import { cn } from '@/common/components/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ptBR } from 'date-fns/locale';
import ScheduleButton from './ScheduleButton';
import { ScheduleData } from '../services';

type ScheduleTabProps = {
  mountSchedule: (data: Partial<ScheduleData>) => void;
  handleBack: () => void;
};

const ScheduleTab = ({ mountSchedule, handleBack }: ScheduleTabProps) => {
  const schedules = [
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
  ];
  const isMobile = useIsMobile();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const capitalizeFirstLetter = (str: string) =>
    str
      .split(' ')
      .map((word) => {
        if (word === 'de') return word;
        return word.charAt(0).toLocaleUpperCase('pt-BR') + word.slice(1);
      })
      .join(' ');

  const dateFormatted = format(selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  const disabledNextButton =
    selectedDate.getHours() === 0 && selectedDate.getMinutes() === 0;

  return (
    <div className="px-4">
      <Card className="gap-5">
        <CardHeader className="gap-0">
          <CardTitle className="text-lg font-medium leading-7 text-card-foreground">
            Selecione a data e a hora
          </CardTitle>
          <CardDescription className="text-base font-normal leading-6 text-muted-foreground">
            Escolha quando o atendimento deve ocorrer.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-4">
            <Calendar
              mode="single"
              className={cn(
                'border rounded-md',
                isMobile && '[&_th]:flex-1 [&_td]:flex-1'
              )}
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              locale={ptBR}
            />
            <Card className="w-full border rounded-md">
              <CardHeader className="gap-0">
                <CardTitle className="text-lg font-medium leading-7 text-card-foreground">
                  {capitalizeFirstLetter(dateFormatted)}
                </CardTitle>
              </CardHeader>
              <CardContent
                className={cn(
                  'grid md:grid-cols-2 gap-2',
                  !isMobile && 'h-[200px] overflow-auto'
                )}
              >
                {schedules.map((schedule, i) => (
                  <ScheduleButton
                    key={i}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    schedule={schedule}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              className="w-full md:w-auto"
            >
              <ArrowLeft />
              <span>Voltar</span>
            </Button>
            <Button
              disabled={disabledNextButton}
              className="w-full md:w-auto"
              onClick={() => mountSchedule({ date: selectedDate })}
            >
              <ArrowRight />
              <span>Próximo</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleTab;
