import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

const MobileHeader = () => {
  const { setOpenMobile } = useSidebar();

  return (
    <header className="h-16 flex justify-between items-center px-4 w-full border border-border md:hidden">
      <Button
        variant="outline"
        className="px-4 py-2"
        onClick={() => setOpenMobile(true)}
      >
        <Menu />
      </Button>
      <Avatar className="w-10 h-10">
        <AvatarImage src="" alt="" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default MobileHeader;
