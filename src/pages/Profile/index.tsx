import InfoTab from '@/common/components/InfoTab';
import PageHeader from '@/common/components/PageHeader';
import ProfileCard from '@/common/components/ProfileCard';

const Profile = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <PageHeader
        pageHeaderTitle={'Perfil'}
        pageHeaderText={'Gerencie suas informações pessoais'}
      />

      <article className="flex flex-1 p-4 gap-4 w-full">
        <div className="flex flex-col gap-2 w-1/2">
          <ProfileCard
            avatar={''}
            name={''}
            email={''}
            memberDate={''}
            lastAccess={''}
            isVerified={true}
          />
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <InfoTab />
        </div>
      </article>
    </div>
  );
};

export default Profile;
