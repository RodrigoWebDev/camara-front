import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Button } from '@/common/components/ui/button';
import { ArrowLeft, Aperture } from 'lucide-react';
import Logo from '@/features/register/components/LogoForm';

type LoginCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const LoginCard = ({ title, description, children }: LoginCardProps) => {
  return (
    <div className="flex flex-col items-center h-[100vh] bg-gradient-to-b from-sky-200 to-white">
      <Logo className="my-[25px]" />
      <Card className="min-w-[35%]">
        <CardHeader className="gap-0">
          <div className="flex items-center justify-between">
            <div className="flex">
              <Button variant="ghost">
                <ArrowLeft />
              </Button>
              <CardTitle className="text-2xl">{title}</CardTitle>
            </div>
            <Aperture />
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default LoginCard;
