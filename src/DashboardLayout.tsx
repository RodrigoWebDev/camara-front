import { Outlet } from 'react-router-dom';

import DashboardSidebar from './common/components/DashboardSidebar';
import ManagerSidebar from './common/components/ManagerSidebar';
import { SidebarProvider } from './components/ui/sidebar';

import MobileHeader from './common/components/MobileHeader';
import ManagerHeader from './common/components/ManagerHeader';

type DashboardLayoutProps = {
  role?: string;
};

const DashboardLayout = ({ role = 'cliente' }: DashboardLayoutProps) => {
  const name = localStorage.getItem('name') ?? '';

  if (role === 'administrador' || role === 'atendente') {
    return (
      <SidebarProvider>
        <ManagerSidebar
          avatarImage=""
          userName={name}
          manager={role === 'administrador'}
        />
        <div className="flex flex-col w-full">
          <ManagerHeader />
          <Outlet />
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <DashboardSidebar avatarImage="" userName={name} />
      <div className="flex flex-col w-full">
        <MobileHeader />
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
