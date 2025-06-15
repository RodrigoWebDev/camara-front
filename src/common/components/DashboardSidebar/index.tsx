import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/../public/Avatar.jpg';

import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  UserRoundCog,
  FileText,
  Home,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

const items = [
  {
    title: 'Início',
    url: 'inicio',
    icon: Home,
  },
  {
    title: 'Catálogo de Serviços',
    url: 'catalogo-servicos',
    icon: FileText,
  },
  {
    title: 'Minhas Solicitações',
    url: 'minhas-solicitacoes',
    icon: ClipboardList,
  },
  {
    title: 'Agendamentos',
    url: 'agendamentos',
    icon: CalendarDays,
  },
];

type SideBarProps = {
  avatarImage: string;
  userName: string;
};

const DashboardSidebar = ({ avatarImage, userName }: SideBarProps) => {
  const location = useLocation();
  const pathname = location.pathname.replace(/^\//, '');

  const navigate = useNavigate();

  return (
    <Sidebar className="flex flex-col w-64 items-start shrink-0">
      <SidebarHeader className="flex flex-col p-2 items-start gap-2 self-stretch bg-sidebar-background">
        <SidebarMenuButton className="flex p-2 mt-2 items-center gap-2 self-stretch active:bg-transparent hover:bg-transparent">
          <div className="w-8 h-8 overflow-hidden rounded-lg bg-sidebar-primary flex justify-center items-center">
            <img
              src={Logo}
              className="w-full h-full object-cover object-center"
              alt="Logo"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-[2px] flex-[1_0_0]">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sidebar-foreground font-sans text-base font-semibold leading-none">
              Portal do cidadão
            </p>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sidebar-foreground font-sans text-xs font-normal leading-none">
              Câmara Municipal de Florianópolis
            </p>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent className="flex flex-col items-start gap-2 flex-[1_0_0] self-stretch bg-sidebar-background text-sidebar-foreground">
        <SidebarGroup className="flex flex-col p-2 items-start self-stretch">
          <SidebarMenu className="flex flex-col items-start gap-3 self-stretch">
            {items.map((item) => (
              <SidebarMenuItem
                className="flex flex-col items-center self-stretch"
                key={item.title}
              >
                <SidebarMenuButton
                  isActive={pathname === item.url}
                  className="flex h-8 p-2 items-center gap-2 self-stretch"
                  asChild
                >
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="flex flex-col p-2 items-start gap-2 bg-sidebar-background">
        <SidebarMenuButton
          onClick={() => navigate('/dados-pessoais')}
          className="flex p-2 items-center gap-2 self-stretch active:bg-transparent hover:bg-transparent"
        >
          <Avatar className="rounded-md">
            <AvatarImage src={avatarImage} />
            <AvatarFallback>
              <Skeleton className="h-12 w-12 rounded-md" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center items-start gap-[2px] flex-[1_0_0]">
            <p className="line-clamp-1 self-stretch overflow-hidden text-ellipsis text-sidebar-foreground font-sans text-base font-semibold leading-none">
              {userName}
            </p>
            <p className="line-clamp-1 self-stretch overflow-hidden text-ellipsis whitespace-nowrap text-sidebar-foreground font-sans text-xs font-normal leading-tight">
              Ver perfil
            </p>
          </div>
          <ChevronRight className="ml-auto" />
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
