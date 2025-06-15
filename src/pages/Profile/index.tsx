import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import PageHeader from '@/common/components/PageHeader';
import ProfileCard from '@/common/components/ProfileCard';
import apiClient from '@/services/apiClient';
import InfoContent from '@/common/components/InfoContent';
import { Loader } from 'lucide-react';

type UserInfoType = {
  user_id: number;
  full_name: string;
  email: string;
  phone?: string;
  password_hash: string;
  status: string;
  created_at: string;
  updated_at: string;
  role_id: string;
  document: string;
  birth_date: string;
  gender: string;
  photo?: string;
  cep?: string;
  address?: string;
  state?: string;
  city?: string;
  number?: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserInfoType | null>(null);

  const onLogOut = () => {
    localStorage.removeItem('token');

    navigate('/login');
  };

  const onAccountValidation = () => {
    navigate('/verificacao-conta');
  };

  useEffect(() => {
    const userId = localStorage.getItem('id');

    apiClient
      .get(`/users/${userId}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error('Erro ao buscar usuário:', err));
  }, []);

  if (userData)
    return (
      <div className="flex flex-col h-screen w-full">
        <PageHeader
          title="Perfil"
          description="Gerencie suas informações pessoais"
        />
        <article className="flex flex-col items-start gap-6 p-4 self-stretch md:flex-row md:items-start md:gap-4 md:flex-1">
          <div className="flex w-full md:flex-col gap-2 md:w-1/3">
            <ProfileCard
              avatar={''}
              name={userData.full_name}
              email={userData.email}
              memberDate={format(parseISO(userData.created_at), 'dd/MM/yyyy', {
                locale: ptBR,
              })}
              lastAccess={format(parseISO(userData.updated_at), 'dd/MM/yyyy', {
                locale: ptBR,
              })}
              isVerified={true}
              onLogOut={onLogOut}
              onAccountValidation={onAccountValidation}
            />
          </div>

          <div className="flex flex-col gap-6 w-full md:gap-4 md:flex-1">
            <InfoContent
              name={userData.full_name}
              birth_date={format(parseISO(userData.birth_date), 'dd/MM/yyyy', {
                locale: ptBR,
              })}
              number={userData.number}
              email={userData.email}
              phone={userData.phone || ''}
              document={userData.document}
              photo={userData.photo}
              cep={userData.cep}
              address={userData.address}
              city={userData.city}
              state={userData.state}
            />
          </div>
        </article>
      </div>
    );

  return (
    <>
      <Loader />
    </>
  );
};

export default Profile;
