import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { ArrowRightFromLine, BadgeCheck } from 'lucide-react';
import { Button } from '../ui/button';

type ProfileCardProps = {
  avatar: string;
  name: string;
  email: string;
  memberDate: string;
  lastAccess: string;
  isVerified?: boolean;
};

const ProfileCard = ({
  avatar,
  name,
  email,
  memberDate,
  lastAccess,
  isVerified,
}: ProfileCardProps) => {
  return (
    <div className="flex flex-col p-6 items-start gap-6 self-stretch rounded-lg border border-input bg-white shadow-sm">
      <section className="flex flex-col justify-center items-center gap-[6px] self-stretch">
        <Avatar className="w-20 h-20 rounded-full bg-background">
          <AvatarImage src={avatar} />
        </Avatar>
        <p className="text-2xl font-semibold leading-8 text-card-foreground font-sans">
          {name}
        </p>
        <div className="flex justify-center items-center gap-4 self-stretch">
          <p className="text-sm font-normal leading-5 text-muted-foreground font-sans">
            {email}
          </p>

          <div
            className={`flex px-[10px] py-[2px] justify-center items-center gap-1 rounded-full border border-transparent ${isVerified ? `bg-success` : `bg-alert`}`}
          >
            <BadgeCheck className="w-3 h-3 text-primary-foreground" />
            <p className="text-xs font-semibold leading-4 font-sans text-primary-foreground">
              {isVerified ? `Verificado` : `Não verificado`}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center gap-0 self-stretch">
        <p className="text-sm font-normal leading-5 text-muted-foreground font-sans">
          Membro desde: {memberDate}
        </p>
        <p className="text-sm font-normal leading-5 text-muted-foreground font-sans">
          Último acesso: {lastAccess}
        </p>
      </section>

      <section className="flex flex-col items-start gap-2 self-stretch">
        <Button
          variant={'outline'}
          className="flex h-10 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border border-input bg-background"
        >
          <BadgeCheck className="w-4 h-4" />
          <p className="text-base font-medium leading-6 text-foreground font-sans">
            Verificar minha conta
          </p>
        </Button>
        <Button
          variant={'outline'}
          className="flex h-10 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border border-input bg-background text-destructive"
        >
          <ArrowRightFromLine className="w-4 h-4" />
          <p className="text-base font-medium leading-6 font-sans">
            Sair da conta
          </p>
        </Button>
      </section>
    </div>
  );
};

export default ProfileCard;
