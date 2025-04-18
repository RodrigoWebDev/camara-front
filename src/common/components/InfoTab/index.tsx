import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const InfoTab = () => {
  const textStyle =
    'text-base font-medium leading-6 text-center text-foreground font-sans';

  return (
    <Tabs className="">
      <TabsList className="flex h-10 p-1 mb-4 justify-center items-center self-stretch rounded-md bg-muted">
        <TabsTrigger
          value="Informações pessoais"
          className="flex px-3 py-[6px] justify-center items-center gap-2 flex-[1_0_0] self-stretch rounded-sm focus:bg-card focus:shadow-sm"
        >
          <p className={textStyle}>Informações pessoais</p>
        </TabsTrigger>
        <TabsTrigger
          value="Preferências"
          className="flex px-3 py-[6px] justify-center items-center gap-2 flex-[1_0_0] self-stretch rounded-sm focus:bg-card focus:shadow-sm"
        >
          <p className={textStyle}>Preferências</p>
        </TabsTrigger>
        <TabsTrigger
          value="Segurança"
          className="flex px-3 py-[6px] justify-center items-center gap-2 flex-[1_0_0] self-stretch rounded-sm focus:bg-card focus:shadow-sm"
        >
          <p className={textStyle}>Segurança</p>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="Informações pessoais" className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Informações pessoais</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="Preferências">
        <Card>
          <CardHeader>
            <CardTitle>Preferências</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="Segurança">
        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InfoTab;
