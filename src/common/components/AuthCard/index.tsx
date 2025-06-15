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
import { CardFooter } from '@/components/ui/card';
import Logo2 from '@/../public/Logo.png';
import { useNavigate } from 'react-router-dom';

type LoginCardProps = {
  title: string;
  description: string | null;
  children: React.ReactNode;
  isLogin?: boolean;
  isRegister?: boolean;
  showCopyright?: boolean;
  showLoginButton?: boolean;
  handleBack?: () => void;
};

const AuthCard = ({
  title,
  description,
  children,
  isLogin = false,
  isRegister = false,
  showCopyright = false,
  showLoginButton = false,
  handleBack,
}: LoginCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gradient-to-b from-sky-200 to-white px-6">
      <Logo className="mb-[25px]" />
      <Card className="w-full md:w-[35%] gap-0">
        <CardHeader className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex">
              {!!handleBack && (
                <Button variant="ghost" onClick={handleBack}>
                  <ArrowLeft />
                </Button>
              )}
              <CardTitle className="text-2xl">{title}</CardTitle>
            </div>
            <Aperture />
          </div>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex flex-col">
          {isLogin && (
            <div className="flex flex-col items-center w-full mt-5">
              <div className="flex items-center justify-center text-center">
                <p className="text-sm font-medium leading-none text-foreground">
                  Não tem uma conta?
                </p>
                <Button
                  variant="ghost"
                  className="text-base font-medium leading-6 text-primary hover:text-primary"
                  onClick={() => navigate('/cadastro')}
                >
                  Cadastre-se
                </Button>
              </div>
              <hr className="mt-8 my-5 w-full" />
              <img className="w-56 h-12" src={Logo2} />
              <Button variant="ghost" className="my-3">
                <span className="text-base font-medium leading-6 text-foreground">
                  Política de Privacidade
                </span>
              </Button>
              <p className="text-center text-muted-foreground text-sm">
                © 2025 Câmara de Vereadores de Florianópolis
              </p>
            </div>
          )}
          {showLoginButton && (
            <div className="flex flex-col  w-full">
              <hr className="mt-8 my-5" />
              <div className="flex justify-center items-center mt-2">
                <p className="text-sm font-medium leading-none text-foreground">
                  {isRegister ? 'Já possui uma conta?' : 'Lembrou sua senha?'}
                </p>
                <Button
                  variant="ghost"
                  className="text-base font-medium leading-6 text-primary hover:text-primary"
                  onClick={() => navigate('/login')}
                >
                  Faça login
                </Button>
              </div>
            </div>
          )}
          {showCopyright && (
            <>
              <div className="flex items-center mt-2">
                <p className="text-sm font-medium leading-none text-foreground">
                  {isRegister ? 'Já possui uma conta?' : 'Lembrou sua senha?'}
                </p>
                <Button
                  variant="ghost"
                  className="text-base font-medium leading-6 text-primary hover:text-primary"
                  onClick={() => navigate('/login')}
                >
                  Faça login
                </Button>
                <p className="text-sm mr-2"></p>
              </div>
              <hr className="mt-8 my-5 w-full" />
              <p className="text-center text-muted-foreground text-sm">
                © 2025 Câmara de Vereadores de Florianópolis
              </p>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthCard;
