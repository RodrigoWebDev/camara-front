import { Button } from '@/components/ui/button';
// import Notification from '../Notification';
import { Menu, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router';

const ManageHeader = () => {
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <header className="h-20 flex justify-between items-center px-4 border-b border-border gap-4">
      {isMobile && (
        <Button
          variant="outline"
          className="px-4 py-2"
          onClick={() => setOpenMobile(true)}
        >
          <Menu />
        </Button>
      )}
      <div className="relative w-full">
        {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar atendimento, cidadão ou protocolo"
          className="pl-10 w-full sm:w-[332px] h-11"
        /> */}
      </div>
      {!isMobile && (
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => navigate('/agenda')}>
            <Calendar className="text-primary" />
          </Button>
        </div>
      )}
      {isMobile && (
        <Avatar className="w-10 h-10">
          <AvatarImage src="" alt="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </header>
  );
};

export default ManageHeader;
