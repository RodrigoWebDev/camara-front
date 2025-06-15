import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useNavigate } from 'react-router';

const NewServiceCard = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col p-6 items-start gap-6 flex-[1_0_0] self-stretch rounded-lg border border-border bg-white shadow-sm">
      <CardHeader className="flex flex-col p-0 items-start gap-0 self-stretch ">
        <div className="flex flex-col items-start gap-[6px] self-stretch">
          <CardTitle className="flex items-center gap-2 self-stretch justify-between text-lg font-semibold leading-7 text-card-foreground font-sans">
            Novo Serviço
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col p-0 items-start gap-[2px] flex-[1_0_0] self-stretch text-base font-medium leading-6 text-foreground font-sans">
        Solicite um novo serviço ou documento da Câmara de Vereadores
      </CardContent>

      <CardFooter className="flex p-0 justify-between items-start self-stretch">
        <Button
          className={`flex h-[40px] px-4 py-2 justify-center items-center gap-2 flex-[1_0_0]`}
          variant={`default`}
          onClick={() => navigate('/catalogo-servicos')}
        >
          Solicitar agora
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewServiceCard;
