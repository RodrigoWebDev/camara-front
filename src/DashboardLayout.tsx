import { Outlet } from 'react-router';
import DashboardSidebar from './common/components/DashboardSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex">
      <DashboardSidebar avatarImage={''} userName={''} />
      <div className="content flex w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
