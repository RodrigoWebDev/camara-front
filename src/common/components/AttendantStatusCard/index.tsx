import { ReactNode } from 'react';

type attendantStatusCardProps = {
  title: string;
  number: number;
  icon: ReactNode;
  iconBg: string;
};

const AttendantStatusCard = ({
  number,
  title,
  icon,
  iconBg,
}: attendantStatusCardProps) => {
  return (
    <div className="flex items-start gap-4 p-6 self-stretch md:flex-1 rounded-lg border border-border bg-white shadow-sm">
      <div
        className={`flex w-14 h-14 p-4 justify-center items-center gap-2 aspect-square rounded-lg ${iconBg}`}
      >
        {icon}
      </div>
      <div className="flex flex-col items-start gap-2 flex-[1_0_0]">
        <div className="flex items-center gap-[10px] self-stretch">
          <p className="text-sm font-medium leading-5 text-card-foreground font-sans">
            {title}
          </p>
        </div>
        <div className="flex justify-between items-end self-stretch">
          <p className="text-2xl font-bold leading-8 text-card-foreground font-sans">
            {number}
          </p>
          {/* <div className="flex h-4 justify-center items-center gap-1 text-success">
            {arrow}
            <p
              className={`text-xs font-normal leading-4 ${'text-success'} font-sans`}
            >
              {statistic}%
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AttendantStatusCard;
