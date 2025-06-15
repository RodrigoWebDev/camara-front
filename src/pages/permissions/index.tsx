import { useIsMobile } from '@/hooks/use-mobile';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PermissionsTab from './components/PermissionsTab';
import { useEffect, useState } from 'react';
import {
  IDataActivityLog,
  IDataServices,
  IDataUser,
  PermissionsStatus,
} from './interface';
import { getAllUser } from '@/features/serviceSolicitation/services';
import Title from './components/tittle';
import { activityLog, mockServiceTab } from './mock';

const PermissionsPage = () => {
  const isMobile = useIsMobile();
  const [status, setStatus] = useState<PermissionsStatus>('users');
  const [dataUser, setDataUser] = useState<IDataUser[]>([]);
  const [dataServices, setDataServices] = useState<IDataServices[]>([]);
  const [dataActivityLog, setDataActivityLog] = useState<IDataActivityLog[]>(
    []
  );

  const handleFilterChange = (value: string) => {
    setStatus(value as PermissionsStatus);
  };

  useEffect(() => {
    if (status === 'users') {
      /* const fetchUsers = async () => {
        try {
          const response = await getAllUser();

          const formattedData = response.map((user) => {
            return {
              ...user,
              name: user.full_name,
              profile: user.roleName,
            };
          });

          setDataUser(formattedData);
        } catch (error) {
          console.error('Erro ao buscar:', error);
        }
      };

      fetchUsers(); */
    }

    if (status === 'service') {
      const fetchService = async () => {
        try {
          //const response = await getAllServices();

          const response = mockServiceTab;

          const formattedData = response.map((service) => {
            return {
              serviceId: service.id,
              service: service.name,
              permissions: service.permissions,
            };
          });

          setDataServices(formattedData);
        } catch (error) {
          console.error('Erro ao buscar:', error);
        }
      };

      fetchService();
    }

    if (status === 'activityLog') {
      const fetchActivityLog = async () => {
        try {
          //const response = await getAllActivityLog();

          const response = activityLog;

          const formattedData = response.map(
            ({ date, email, browser, action, user, ip, os }) => {
              return {
                date: date,
                email: email,
                action: action,
                browser: browser,
                user: user,
                os: os,
                ip: ip,
              };
            }
          );

          setDataActivityLog(formattedData);
        } catch (error) {
          console.error('Erro ao buscar:', error);
        }
      };

      fetchActivityLog();
    }
  }, [status]);

  return (
    <div className="flex flex-col w-full min-h-screen border-l bg-background">
      <Title
        classNameContainer="text-2xl px-4 pt-4 pb-[0px] mb-8"
        text="Gestão de Permissões"
      />
      {/* {isMobile ? (
        <div className="px-4 mt-3 flex flex-col gap-4 flex-grow pb-4">
          <Select value={status} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="users">Usuários</SelectItem>
              <SelectItem value="groups">Grupos de Acesso</SelectItem>
              <SelectItem value="service">Permissões por Serviço</SelectItem>
              <SelectItem value="activityLog">Log de Atividades</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <Tabs className="p-4" value={status} onValueChange={handleFilterChange}>
          <TabsList className="w-full">
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="groups">Grupos de Acesso</TabsTrigger>
            <TabsTrigger value="service">Permissões por Serviço</TabsTrigger>
            <TabsTrigger value="activityLog">Log de Atividades</TabsTrigger>
          </TabsList>
        </Tabs>
      )} */}
      <PermissionsTab
        dataActivityLog={dataActivityLog}
        dataService={dataServices}
        dataUser={dataUser}
        status={status}
      />
    </div>
  );
};

export default PermissionsPage;
