import CustomAlert from '@/common/components/CustomAlert';
import MultiSelectInput from '@/common/components/MultiSelectInput';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { UserResponse } from '@/features/register/services';
import {
  Bell,
  CircleCheck,
  Copy,
  FileText,
  Mail,
  Printer,
  Send,
  UserPlus,
} from 'lucide-react';
import { ServiceResponse } from '../services';
import { useEffect, useState } from 'react';
import {
  CreateTicketResponse,
  getUser,
} from '@/features/serviceSolicitation/services';
import { addMinutes, format, parseISO } from 'date-fns';

type SuccessTabProps = {
  client: UserResponse;
  service: ServiceResponse;
  ticket: CreateTicketResponse;
};

const SuccessTab = ({ client, service, ticket }: SuccessTabProps) => {
  const [attendent, setAttendent] = useState<UserResponse | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const storageUserId = localStorage.getItem('id');
    const userId = parseInt(storageUserId ?? '');
    const user = await getUser(userId);
    setAttendent(user);
  };

  const infos = [
    { label: 'Serviço solicitado', value: service.name },
    {
      label: 'Data e hora',
      value: format(ticket.created_at, 'dd/MM/yyyy, HH:mm'),
    },
    { label: 'Cidadão', value: client.full_name },
    { label: 'Atendente', value: attendent?.full_name },
  ];

  const protocolo = 'CMF-12355';

  const options = ['WhatsApp', 'E-mail'];

  const sendPlus30 = () => {
    const date = parseISO(ticket.created_at);
    const datePlus30 = addMinutes(date, 30);
    const formatted = format(datePlus30, 'dd/MM/yyyy, HH:mm');
    return formatted;
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <section className="flex flex-col items-center w-full">
        <div className="p-4 rounded-full bg-background-green mb-4">
          <CircleCheck className="text-success" size={32} />
        </div>
        <h1 className="text-2xl font-semibold leading-8 text-card-foreground text-center">
          Atendimento Finalizado com Sucesso
        </h1>
        <p className="text-base font-normal leading-6 text-muted-foreground mb-4">
          Os dados foram registrados no sistema
        </p>
      </section>
      <Card className="rounded">
        <CardHeader className="gap-0">
          <CardTitle className="text-lg font-medium leading-7 text-card-foreground">
            Informações do Atendimento
          </CardTitle>
          <CardDescription className="text-base font-normal leading-6 text-muted-foreground">
            Detalhes do atendimento realizado
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
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
                {protocolo}
              </span>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 flex-1 md:w-auto"
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
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 flex-1 md:w-auto"
              >
                <Mail />
                <span className="hidden md:inline">E-mail</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <CustomAlert
        type="alert"
        Icon={Bell}
        title="Lembre-se da Pesquisa de Satisfação"
        description="Informe ao cidadão que ele receberá uma pesquisa de satisfação via WhatsApp/Email para avaliar o atendimento recebido. A avaliação é importante para melhorarmos nossos serviços."
      />
      <Card className="rounded">
        <CardHeader className="gap-0">
          <CardTitle className="text-lg font-medium leading-7 text-card-foreground">
            Detalhes do Envio da Pesquisa
          </CardTitle>
          <CardDescription className="text-base font-normal leading-6 text-muted-foreground">
            Configure como a pesquisa será enviada ao cidadão
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <span className="text-base font-medium leading-none text-card-foreground">
            Contato para envio
          </span>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full">
              <label className="text-base font-medium leading-none text-foreground">
                WhatsApp
              </label>
              <Input
                placeholder="(48) 99999-9999"
                className="bg-background mt-2"
                value={client.phone ?? ''}
              />
            </div>
            <div className="w-full">
              <label className="text-base font-medium leading-none text-foreground">
                E-mail
              </label>
              <Input
                placeholder="maria.silva@email.com"
                className="bg-background mt-2"
                value={client.email}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-medium leading-6 text-muted-foreground">
              Horário programado
            </span>
            <span className="text-base font-medium leading-6 text-foreground">
              Envio previsto para: {sendPlus30()}
            </span>
            <span className="text-sm font-normal leading-5 text-muted-foreground">
              (30 minutos após o atendimento)
            </span>
          </div>
          <div>
            <label className="text-base font-medium leading-none text-foreground">
              Método de envio
            </label>
            <MultiSelectInput
              options={options}
              onChange={() => {}}
              value={[]}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Switch className="data-[state=checked]:bg-success" />
            <span className="text-base font-medium leading-none text-foreground">
              Confirmar envio da pesquisa
            </span>
          </div>
        </CardContent>
      </Card>
      <div className="rounded-lg border border-border p-4 flex flex-col gap-2">
        <span className="text-base font-medium leading-6 text-foreground">
          Script Sugerido para o Atendente
        </span>
        <span className="text-sm italic font-normal leading-5 text-foreground">
          "Sr(a). {client.full_name}, seu atendimento foi registrado com sucesso
          sob o protocolo {protocolo}. Em breve você receberá uma mensagem no
          seu WhatsApp com uma breve pesquisa sobre o atendimento de hoje. Sua
          opinião é muito importante para nós."
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between pt-4 gap-2">
        <div className="flex flex-col md:flex-row gap-2">
          <Button variant="secondary">
            <Printer />
            <span>Imprimir comprovante</span>
          </Button>
          <Button variant="outline">
            <FileText />
            <span>Visualizar detalhes</span>
          </Button>
        </div>
        <Button onClick={() => window.location.reload()}>
          <UserPlus />
          <span>Novo atendimento</span>
        </Button>
      </div>
    </div>
  );
};

export default SuccessTab;
