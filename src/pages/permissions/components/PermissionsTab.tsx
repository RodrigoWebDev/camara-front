import { PermissionsTabProps } from '../interface';
import UsersTab from './usersTab';
import GroupsTab from './groupsTab';
import ServiceTab from './serviceTab';
import ActivityLogTab from './activityLogTab';

const PermissionsTab = ({
  status,
  dataUser,
  dataService,
  dataActivityLog,
}: PermissionsTabProps) => {
  return (
    <div className="flex flex-col justify-between h-full px-4 pb-4">
      {status === 'users' && <UsersTab data={dataUser} />}
      {status === 'groups' && <GroupsTab />}
      {status === 'service' && <ServiceTab data={dataService} />}
      {status === 'activityLog' && <ActivityLogTab data={dataActivityLog} />}
    </div>
  );
};

export default PermissionsTab;
