import { cn } from '@/common/components/lib/utils';

type ManagerCardProps = {
  label: string;
  Icon: React.ElementType;
  count: number;
  bgColor: string;
  color: string;
};

const ManagerCard = ({
  label,
  Icon,
  count,
  bgColor,
  color,
}: ManagerCardProps) => {
  return (
    <div className="p-6 rounded-lg border border-border bg-card flex gap-4 flex-1">
      <div className={cn('p-4 rounded-lg', bgColor, color)}>
        <Icon size={32} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-card-foreground">
          {label}
        </span>
        <span className="text-2xl font-bold text-card-foreground">{count}</span>
      </div>
    </div>
  );
};

export default ManagerCard;
