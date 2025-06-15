import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format, parseISO } from 'date-fns';
import AttendantServiceDetail from '../AttendantServiceDetail';
import {
  HistoryDataProps,
  statusMap,
  TicketsData,
} from '@/pages/attendantServicesPage';

const tableHeadStyle =
  'flex-row h-12 min-w-[85px] px-4 items-center self-stretch border-b border-border';
const tableHeadStyleEnd =
  'flex justify-end items-center h-12 min-w-[85px] px-4 self-stretch border-b border-border';
const tableHeadTextStyle =
  'flex flex-col justify-center flex-[1_0_0] self-stretch text-muted-foreground text-sm font-medium leading-normal font-sans';
const tableHeadTextStyleEnd =
  'text-muted-foreground text-sm font-medium leading-normal font-sans';
const tableCellStyle = `flex-row h-[3.25rem] min-w-[5.3125rem] p-4 items-center gap-[10px] self-stretch`;
const tableCellStyleEnd = `flex h-[3.25rem] min-w-[5.3125rem] p-4 justify-end items-center self-stretch`;

type AttendantServiceTableProps = {
  data: TicketsData[];
  historyData?: HistoryDataProps[];
  ticket: TicketsData | null;
  setTicket: (ticket: TicketsData | null) => void;
  setRefresh: (value: boolean) => void;
  isManager: boolean;
};

export const getStatusBadgeClass = (status: string) => {
  const normalized = status.toLowerCase().trim();

  const classMap: Record<string, string> = {
    em_andamento: 'bg-border text-secondary-foreground',
    em_atendimento: 'bg-border text-secondary-foreground',
    pendente: 'bg-custom-alert-background text-alert',
    aguardando_documentos: 'bg-custom-alert-background text-primary',
    concluido: 'bg-',

    // Designer não finalizou
    agendado: '',
    cancelado: '',
    pronto_para_retirar: '',
  };

  return classMap[normalized] || '';
};

const AttendantServiceTable = ({
  data,
  historyData,
  ticket,
  setTicket,
  setRefresh,
  isManager,
}: AttendantServiceTableProps) => {
  return (
    <>
      <Card className="w-full max-w-none p-0 rounded-lg overflow-hidden">
        <Table className="w-full p-4">
          <TableHeader className="bg-secondary ">
            <TableRow>
              <TableHead className={tableHeadStyle}>
                <p className={tableHeadTextStyle}>Protocolo</p>
              </TableHead>
              <TableHead className={tableHeadStyle}>
                <p className={tableHeadTextStyle}>Cidadão</p>
              </TableHead>
              <TableHead className={tableHeadStyle}>
                <p className={tableHeadTextStyle}>Serviço</p>
              </TableHead>
              {isManager && (
                <TableHead className={tableHeadStyle}>
                  <p className={tableHeadTextStyle}>Atendente</p>
                </TableHead>
              )}
              <TableHead className={tableHeadStyle}>
                <p className={tableHeadTextStyle}>Status</p>
              </TableHead>
              <TableHead className={tableHeadStyle}>
                <p className={tableHeadTextStyle}>Data/Hora</p>
              </TableHead>
              <TableHead className={tableHeadStyleEnd}>
                <p className={tableHeadTextStyleEnd}>Ações</p>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => {
              const current = statusMap[item.current_status] || {
                label: item.current_status || 'Desconhecido',
              };
              const createdDate = parseISO(item.created_at);

              return (
                <TableRow key={index}>
                  <TableCell className={tableCellStyle}>
                    #{item.protocol}
                  </TableCell>
                  <TableCell className={tableCellStyle}>
                    {item.userName}
                  </TableCell>
                  <TableCell className={tableCellStyle}>
                    {item.serviceName}
                  </TableCell>
                  {isManager && (
                    <TableCell className={tableCellStyle}>
                      {item.attendantName}
                    </TableCell>
                  )}
                  <TableCell className={tableCellStyle}>
                    <Badge className={getStatusBadgeClass(current.label)}>
                      {current.label}
                    </Badge>
                  </TableCell>
                  <TableCell className={tableCellStyle}>
                    {format(createdDate, 'dd/MM/yyyy HH:mm')}
                  </TableCell>
                  <TableCell className={tableCellStyleEnd}>
                    <Button
                      className="h-[2.25rem] px-3 py-2 border border-input bg-background"
                      onClick={() => setTicket(item)}
                    >
                      <p className="text-foreground text-base font-medium font-sans">
                        Ver detalhes
                      </p>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {ticket && (
        <AttendantServiceDetail
          key={ticket.id}
          onClose={() => setTicket(null)}
          ticket={ticket}
          statusLabel={
            statusMap[ticket.current_status]?.label || 'Em andamento'
          }
          historyData={historyData}
          statusStyle={getStatusBadgeClass(ticket.current_status)}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
};

export default AttendantServiceTable;
