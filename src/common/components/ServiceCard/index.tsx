import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { CircleCheckBig, Clock, FileText } from 'lucide-react';
import StarRating from '../StarRating';

type ServiceCardProps = {
  id: string;
  title: string;
  description: string;
  schedule: number;
  documents: number;
  rate: number;
  reviews: number;
  onRequest: (id: string, title: string) => void;
  onSolicit: (id: string) => void;
};

const ServiceCard = ({
  id,
  title,
  description,
  schedule,
  documents,
  rate,
  reviews,
  onRequest,
  onSolicit,
}: ServiceCardProps) => {
  return (
    <Card className="flex flex-col justify-between items-start p-6 flex-[1_0_0] self-stretch rounded-md border border-input bg-white shadow-sm">
      {/* Cabeçalho */}
      <CardHeader className="flex flex-col p-0 items-start gap-0 self-stretch">
        <div className="flex flex-col items-start gap-[6px] self-stretch">
          <CardTitle className="flex items-center gap-2 self-stretch">
            <FileText className="w-[18px] h-[18px]" />
            <p className="flex-[1_0_0] text-lg font-semibold leading-7 text-card-foreground font-sans">
              {title}
            </p>
          </CardTitle>
          <CardDescription className="self-stretch text-base font-normal leading-6 text-muted-foreground font-sans">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      {/* Conteúdo */}
      <CardContent className="flex p-0 justify-center items-start gap-2 self-stretch">
        <div className="flex flex-col items-start gap-1 flex-[1_0_0]">
          <div className="flex justify-center items-center gap-2 self-stretch">
            <Clock className="w-4 h-4" />
            <p className="flex-[1_0_0] text-sm font-normal leading-none text-foreground font-sans">
              {schedule}
              {schedule > 1 ? ' dias úteis' : ' dia útil'}
            </p>
          </div>
          <div className="flex justify-center items-center gap-2 self-stretch">
            <CircleCheckBig className="w-4 h-4 text-success" />
            <p className="flex-[1_0_0] text-sm font-normal leading-none text-foreground font-sans">
              {documents}
              {documents > 1
                ? ` Documetos necessários`
                : ' Documento necessário'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StarRating rating={rate} />
          <p className="text-xs font-medium leading-none text-muted-foreground font-sans">
            ({reviews})
          </p>
        </div>
      </CardContent>

      {/* Rodapé */}
      <CardFooter className="flex p-0 justify-between items-center self-stretch gap-2">
        {/* Botão Ver detalhes */}
        <Button
          variant="outline"
          className="flex h-10 px-4 py-2 justify-center items-center gap-2 cursor-pointer flex-1" // <- flex-1 aqui
          onClick={() => onRequest(id, title)}
        >
          Ver detalhes
        </Button>

        {/* Botão Solicitar */}
        <Button
          className="flex h-10 px-4 py-2 justify-center items-center gap-2 cursor-pointer flex-1" // <- flex-1 aqui
          onClick={() => onSolicit(id)}
        >
          Solicitar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
