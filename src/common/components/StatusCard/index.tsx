import React from "react";

type StatusCardProps = {
  title: string;
  number: number;
  Icon?: React.ElementType;
};
const StatusCard = ({ title, number, Icon }: StatusCardProps) => {
  return (
    <div className="flex justify-between items-center flex-1 p-6 rounded-lg border border-zinc-200 bg-zinc-100">
      <div className="flex flex-col items-start gap-1 flex-1">
        <span className="self-stretch text-zinc-500 text-xs leading-none font-normal font-sans">
          {title}
        </span>
        <span className="self-stretch text-zinc-950 text-2xl leading-none font-bold font-sans">
          {number}
        </span>
      </div>
      {Icon && <Icon className="w-6 h-6 text-muted-foreground" />}
    </div>
  );
};

export default StatusCard;