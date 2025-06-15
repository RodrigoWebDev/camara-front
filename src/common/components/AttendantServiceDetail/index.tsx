import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserResponse } from '@/features/serviceSolicitation/services';
import {
  HistoryDataProps,
  statusMap,
  TicketsData,
} from '@/pages/attendantServicesPage';
import apiClient from '@/services/apiClient';
import { Separator } from '@radix-ui/react-separator';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  CalendarDays,
  CircleCheck,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type AttendantServiceDetailProps = {
  onClose: () => void;
  ticket: TicketsData;
  statusStyle: string;
  historyData?: HistoryDataProps[];
  statusLabel: string;
  setRefresh: (value: boolean) => void;
};

export const statusArray = [
  'em_andamento',
  'pendente',
  'aguardando_documentos',
  'concluido',
  'agendado',
  'cancelado',
  'pronto_para_retirar',
] as const;

export type TicketStatus = (typeof statusArray)[number];

const AttendantServiceDetail = ({
  onClose,
  ticket,
  statusStyle,
  historyData,
  statusLabel,
  setRefresh,
}: AttendantServiceDetailProps) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
  const [status, setStatus] = useState<TicketStatus>(
    ticket.current_status as TicketStatus
  );

  useEffect(() => {
    apiClient
      .get(`users/${ticket.user_id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Erro ao retornar usuário:', err));
  }, []);

  const handleUpdate = async () => {
    try {
      await apiClient.put(`tickets/${ticket.id}`, {
        current_status: status,
        fields: ticket.fields,
      });
      onClose();
      setRefresh(true);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Erro ao tentar atualizar ticket.'
      );
    }
  };

  return (
    <>
      <Dialog open={!!ticket} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>Detalhes do Atendimento</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Separator className="w-full h-px bg-border" />
            <div className="flex flex-col items-start gap-2">
              <Badge className={statusStyle}>
                <p className="text-xs font-semibold leading-4 font-sans">
                  {statusLabel}
                </p>
              </Badge>
              <div className="flex flex-col items-start gap-0">
                <p className="text-popover-foreground text-base font-medium leading-normal font-sans">
                  {ticket.userName}
                </p>
                <p className="text-muted-foreground text-sm font-normal leading-normal font-sans">
                  #{ticket.protocol} - {ticket.serviceName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <p className="text-foreground text-sm font-normal leading-normal font-sans">
                  {format(
                    parseISO(ticket.created_at),
                    "d 'de' MMMM 'de' yyyy 'às' HH:mm",
                    { locale: ptBR }
                  )}
                </p>
              </div>
            </div>
            <Separator className="w-full h-px bg-border" />
            <div className="flex flex-col items-start gap-2 w-full">
              <p className="text-popover-foreground text-base font-medium leading-normal font-sans">
                Informações de Contato
              </p>
              <div className="flex flex-col items-start gap-1 w-full">
                <div className="flex w-full items-center gap-2">
                  <User className="w-4 h-4 shrink-0" />
                  <p className="flex-1 text-foreground text-base font-normal">
                    {ticket.userName}
                  </p>
                </div>
                {user?.phone && (
                  <div className="flex w-full items-center gap-2">
                    <Phone className="w-4 h-4 shrink-0" />
                    <p className="flex-1 text-foreground text-base font-normal">
                      {user.phone}
                    </p>
                  </div>
                )}
                <div className="flex w-full items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  <p className="flex-1 text-foreground text-base font-normal">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
            {historyData && historyData.length > 0 && (
              <>
                <Separator className="w-full h-px bg-border" />
                <div className="flex flex-col items-start gap-2 w-full">
                  <p className="text-popover-foreground text-base font-medium leading-normal font-sans">
                    Histórico
                  </p>
                  {historyData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 w-full">
                      <div className="flex h-9 items-start gap-2">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col items-start gap-0">
                        <p className="text-foreground text-base font-normal">
                          {item.action}
                        </p>
                        <p className="text-muted-foreground text-sm font-normal">
                          {format(item.created_at, 'dd/MM/yyyy HH:mm')} -{' '}
                          {item.performedByName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <Separator className="w-full h-px bg-border" />
            <div className="flex flex-col justify-end gap-4 w-full md:flex-row">
              {ticket.chatId && (
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://app.manychat.com/fb2880579/chat/${ticket.chatId}`,
                      '_blank'
                    )
                  }
                >
                  <MessageSquare />
                  <span>WhatsApp</span>
                </Button>
              )}
              <Button
                onClick={() => {
                  setUpdateDialog(true);
                  //onClose();
                }}
              >
                <CircleCheck />
                <span>Atualizar status</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={updateDialog} onOpenChange={() => setUpdateDialog(false)}>
        <DialogContent>
          <DialogHeader className="text-left">
            <DialogTitle>Atualizar status</DialogTitle>
          </DialogHeader>
          <Select
            onValueChange={(value) => setStatus(value as TicketStatus)}
            value={status}
          >
            <SelectTrigger className="flex h-10 px-3 py-2 justify-between items-center self-stretch rounded-md border border-input bg-white w-full">
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {statusArray.map((status) => (
                  <SelectItem value={status}>
                    {statusMap[status]?.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={handleUpdate}>Atualizar</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AttendantServiceDetail;
