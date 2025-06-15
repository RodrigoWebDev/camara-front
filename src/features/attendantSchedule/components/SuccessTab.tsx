import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarPlus, CircleCheck, Copy, Send } from 'lucide-react';
import { Info } from '../services';
import { useNavigate } from 'react-router';

type SuccessTabProps = {
  infos: Info[];
  protocol: number;
};

const SuccessTab = ({ infos, protocol }: SuccessTabProps) => {
  const navigate = useNavigate();

  const roleName = localStorage.getItem('roleName');
  const isManager = roleName === 'administrador';

  const handleCopy = () => {
    navigator.clipboard.writeText(`Agendamento-${protocol.toString()}`);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <section className="flex flex-col items-center w-full">
        <div className="p-4 rounded-full bg-background-green mb-4">
          <CircleCheck className="text-success" size={32} />
        </div>
        <h1 className="text-2xl font-semibold leading-8 text-card-foreground text-center">
          Agendamento Finalizado com Sucesso
        </h1>
        <p className="text-base font-normal leading-6 text-muted-foreground mb-4">
          Os dados foram registrados no sistema
        </p>
      </section>
      <Card className="rounded">
        <CardHeader className="gap-0">
          <CardTitle className="text-lg font-medium leading-7 text-card-foreground">
            Informações do Agendamento
          </CardTitle>
          <CardDescription className="text-base font-normal leading-6 text-muted-foreground">
            Detalhes do agendamento realizado
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            {infos.map((info, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-sm font-normal leading-5 text-muted-foreground">
                  {info.label}
                </span>
                <span className="text-sm font-medium leading-5 text-foreground">
                  {info.value}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center rounded bg-secondary p-4 gap-4">
            <div className="flex flex-col">
              <span className="text-base font-medium leading-6 text-muted-foreground">
                Número de Protocolo
              </span>
              <span className="text-lg font-semibold leading-7 text-foreground">
                Agendamento-{protocol}
              </span>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 flex-1 md:w-auto"
                onClick={handleCopy}
              >
                <Copy />
                <span className="hidden md:inline">Copiar</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 flex-1 md:w-auto"
              >
                <Send />
                <span className="hidden md:inline">WhatsApp</span>
              </Button>
            </div>
          </div>
          <hr />
          <div className="w-full flex justify-end flex-col md:flex-row gap-4">
            <Button variant="secondary" onClick={() => navigate('/agenda')}>
              Retornar para agenda
            </Button>
            <Button onClick={() => window.location.reload()}>
              <CalendarPlus />
              <span>Novo agendamento</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessTab;
