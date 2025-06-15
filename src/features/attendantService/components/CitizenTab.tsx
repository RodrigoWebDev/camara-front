import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchForm from './SearchForm';
import RegisterForm from './RegisterForm';
import { UserResponse } from '@/features/register/services';
import { NewUserResponse } from '@/features/serviceSolicitation/services';

type CitizenTabProps = {
  serviceName: string;
  serviceDescription: string;
  handleBack: () => void;
  handleNext: () => void;
  client: UserResponse | null;
  setClient: (user: NewUserResponse | null) => void;
};

const CitizenTab = ({
  client,
  setClient,
  serviceName,
  serviceDescription,
  handleBack,
  handleNext,
}: CitizenTabProps) => {
  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <Card>
        <CardHeader className="gap-0">
          <CardTitle className="text-lg font-medium leading-7 text-card-foreground">
            Serviço Selecionado: {serviceName}
          </CardTitle>
          <CardDescription className="text-base font-normal leading-6 text-muted-foreground">
            {serviceDescription}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="gap-5">
        <CardHeader className="gap-0">
          <CardTitle className="text-lg font-medium leading-7 text-card-foreground">
            Identificação do Cidadão
          </CardTitle>
          <CardDescription className="text-base font-normal leading-6 text-muted-foreground">
            Busque o cidadão pelo CPF ou cadastre um novo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="search">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="search">Buscar cidadão</TabsTrigger>
              <TabsTrigger value="register">Cadastrar novo</TabsTrigger>
            </TabsList>
            <TabsContent value="search">
              <SearchForm
                client={client}
                setClient={setClient}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm
                setClient={setClient}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CitizenTab;
