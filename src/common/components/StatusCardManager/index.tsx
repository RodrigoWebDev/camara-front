import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

type StatusCardManagerProps = {
  title: string;
  number: number;
  statistic: number;
  Icon: React.ElementType;
  days?: boolean;
  percentage?: boolean;
};

const StatusCardManager = ({
  title,
  number,
  statistic,
  days,
  percentage,
  Icon,
}: StatusCardManagerProps) => {
  return (
    <Card className="flex-1 flex flex-col gap-2 p-8">
      <CardHeader className="flex justify-between p-0">
        <CardTitle className="text-[var(--card-foreground)] font-sans text-sm font-medium leading-5">
          {title}
        </CardTitle>
        <Icon className="text-muted-foreground h-[20px]" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex justify-between items-end">
          <span className="text-2xl font-bold font-sans leading-8">
            {number.toLocaleString('en-US')}
            {days && ' dias'}
            {percentage && '%'}
          </span>
          <div className="flex gap-1 items-center">
            {statistic > 0 ? (
              <ArrowUpRight className="text-[var(--success)] h-[12px] w-[12px]" />
            ) : (
              <ArrowDownRight className="text-[var(--destructive)] h-[12px] w-[12px]" />
            )}
            {statistic >= 0 && (
              <span className="text-[var(--success)] text-xs leading-4 font-normal">
                +{statistic}
              </span>
            )}
            {statistic < 0 && (
              <span className="text-[var(--destructive)] text-xs leading-4 font-normal">
                {statistic}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCardManager;
