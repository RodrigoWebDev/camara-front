export type PermissionsStatus = 'users' | 'groups' | 'service' | 'activityLog';

export interface IDataUser {
  name: string;
  email: string;
  status: string;
  profile: string;
  user_id: number;
  role_id: string;
}

export interface IDataServices {
  serviceId: string;
  service: string;
  permissions: {
    name: string;
    value: string;
  }[];
}

export interface IDataActivityLog {
  date: string;
  email: string;
  action: string;
  browser: string;
  user: string;
  os: string;
  ip: string;
}

export interface PermissionsTabProps {
  dataActivityLog: IDataActivityLog[];
  status: PermissionsStatus;
  dataUser: IDataUser[];
  dataService: IDataServices[];
}

export interface UsersTabProps {
  data: IDataUser[];
}

export interface ServiceTabProps {
  data: IDataServices[];
}

export interface ActivityLogTabProps {
  data: IDataActivityLog[];
}
