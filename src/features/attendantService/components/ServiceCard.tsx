import { Badge } from '@/components/ui/badge';

type ServiceCardProps = {
  estimatedTime: string;
  name: string;
  description: string;
  onClick: () => void;
};

const ServiceCard = ({
  estimatedTime,
  name,
  description,
  onClick,
}: ServiceCardProps) => {
  return (
    <button
      className="flex flex-col justify-between items-start rounded border border-border bg-card shadow-sm p-6 w-full h-[176px] cursor-pointer hover:border-primary hover:bg-secondary"
      onClick={onClick}
    >
      <Badge className="rounded-full border border-border bg-background text-xs font-semibold leading-4 text-foreground">
        {estimatedTime}
      </Badge>
      <div className="flex flex-col items-start">
        <span className="text-lg font-semibold leading-7 text-card-foreground">
          {name}
        </span>
        <span className="text-sm font-normal leading-5 text-muted-foreground">
          {description}
        </span>
      </div>
    </button>
  );
};

export default ServiceCard;
