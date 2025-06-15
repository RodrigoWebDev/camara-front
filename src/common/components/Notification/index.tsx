import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

type NotificationProps = {
  hasNotification: boolean;
};

const Notification = ({ hasNotification }: NotificationProps) => {
  return (
    <Button variant="ghost" className="relative">
      <Bell />
      {hasNotification && (
        <span className="w-[6px] h-[6px] rounded-full bg-destructive absolute top-2 right-2"></span>
      )}
    </Button>
  );
};

export default Notification;
