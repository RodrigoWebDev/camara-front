import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Eye, Settings, SquarePen } from 'lucide-react';

type managerServiceCardProps = {
  id: string;
  title: string;
  description: string;
  enabledCategory: boolean;
  fields: number;
  creation: string;
  onRequest: (id: string, title: string) => void;
};

const ManagerServiceCard = ({
  id,
  title,
  description,
  enabledCategory,
  fields,
  creation,
  onRequest,
}: managerServiceCardProps) => {
  return (
    <Card className="flex flex-col justify-between gap-5 border-l border-l-input bg-background w-full min-w-[280px] max-w-[402px] md:w-[400px] md:min-w-[400px] md:min-h-[284px]">
      <CardHeader className="flex flex-col items-start gap-0 self-stretch">
        <div className="flex flex-col items-start gap-[6px] self-stretch">
          <CardTitle className="flex items-center gap-2 self-stretch">
            <p className="flex-[1_0_0] text-lg font-semibold leading-7 text-card-foreground font-sans">
              {title}
            </p>
            <Badge className="flex justify-center items-center px-[10px] py-[2px] gap-[7.5px] rounded-full border-[0.75px] border-transparent bg-primary">
              Ativo
            </Badge>
          </CardTitle>

          <CardDescription className="self-stretch text-base font-normal leading-6 text-muted-foreground font-sans">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-start gap-0 self-stretch">
        <div className="flex justify-between items-start self-stretch">
          <p className="text-base font-normal leading-6 text-muted-foreground font-san">
            Habilitado:
          </p>
          <p className="text-base font-medium leading-6 text-foreground font-sans">
            {enabledCategory ? 'Sim' : 'Não'}
          </p>
        </div>
        <div className="flex justify-between items-start self-stretch">
          <p className="text-base font-normal leading-6 text-muted-foreground font-san">
            Campos:
          </p>
          <p className="text-base font-medium leading-6 text-foreground font-sans">
            {fields}
          </p>
        </div>
        <div className="flex justify-between items-start self-stretch">
          <p className="text-base font-normal leading-6 text-muted-foreground font-san">
            Criado em:
          </p>
          <p className="text-base font-medium leading-6 text-foreground font-sans">
            {creation}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-start self-stretch">
        <Button
          onClick={() => onRequest(id, title)}
          className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md border border-input bg-background"
        >
          <Eye className="w-4 h-4 text-foreground" />
          <p className="text-base font-medium leading-6 text-foreground font-sans">
            Visualizar
          </p>
        </Button>
        <div className="flex items-center gap-2">
          <Button className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md border border-input bg-background">
            <SquarePen className="w-4 h-4 text-foreground" />
          </Button>
          <Button className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md border border-input bg-background">
            <Settings className="w-4 h-4 text-foreground" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ManagerServiceCard;
