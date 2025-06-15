import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { CardContent, CardHeader } from '../ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { statusMap, TicketsData } from '@/pages/attendantServicesPage';
import { format } from 'date-fns';
import { getStatusBadgeClass } from '../AttedantServiceTable';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const tabsTriggerStyle =
  'flex justify-center items-center px-3 py-[6px] gap-2 flex-[1_0_0] self-stretch rounded-sm focus:bg-card focus:shadow-sm data-[state=active]:bg-card data-[state=active]:shadow-sm';
const tableHeadStyle =
  'flex-row h-12 min-w-[85px] px-4 items-center self-stretch border-b border-border';
const tableHeadTextStyle =
  'flex flex-col justify-center flex-[1_0_0] self-stretch text-muted-foreground text-sm font-medium leading-normal font-sans';
const tableCellStyle = `flex-row h-[3.25rem] min-w-[5.3125rem] p-4 items-center gap-[10px] self-stretch`;

type AttendantTabProps = {
  tickets: TicketsData[];
};

const AttendantTab = ({ tickets }: AttendantTabProps) => {
  const [showAll, setShowAll] = useState(false);
  const [tab, setTab] = useState('appointments');

  const displayedTickets = showAll ? tickets : tickets.slice(0, 5);
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && (
        <Select
          onValueChange={(value) => setTab(value)}
          value={tab}
          defaultValue="appointments"
        >
          <SelectTrigger className="flex h-10 px-3 py-2 justify-between items-center self-stretch rounded-md border border-input bg-white w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="appointments">Atendimentos</SelectItem>
              <SelectItem value="documents" disabled>
                Documentos
              </SelectItem>
              <SelectItem value="schedules" disabled>
                Agendamentos
              </SelectItem>
              <SelectItem value="feedback" disabled>
                Feedback
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
      <Tabs
        className="hidden md:block"
        value={tab}
        onValueChange={(tab) => setTab(tab)}
      >
        <TabsList className="flex items-center p-1 mb-4 self-stretch rounded-md bg-muted">
          <TabsTrigger value="appointments" className={tabsTriggerStyle}>
            <p className="text-base font-medium">Atendimentos</p>
          </TabsTrigger>
          <TabsTrigger value="documents" className={tabsTriggerStyle} disabled>
            <p className="text-base font-medium opacity-50">Documentos</p>
          </TabsTrigger>
          <TabsTrigger value="schedules" className={tabsTriggerStyle} disabled>
            <p className="text-base font-medium opacity-50">Agendamentos</p>
          </TabsTrigger>
          <TabsTrigger value="feedback" className={tabsTriggerStyle} disabled>
            <p className="text-base font-medium opacity-50">Feedback</p>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {tab === 'appointments' && (
        <Card className="p-0">
          <CardHeader className="flex flex-col items-start gap-1 self-stretch pt-6 px-7 pb-0">
            <p className="text-lg font-semibold leading-7 text-foreground font-sans">
              Atendimentos recentes
            </p>
            <p className="self-stretch text-sm font-normal leading-5 text-muted-foreground font-sans">
              Últimos atendimentos registrados no sistema
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
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
                  <TableHead className={tableHeadStyle}>
                    <p className={tableHeadTextStyle}>Status</p>
                  </TableHead>
                  <TableHead className={tableHeadStyle}>
                    <p className={tableHeadTextStyle}>Atualização</p>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedTickets.map((ticket, i) => (
                  <TableRow key={i}>
                    <TableCell className={tableCellStyle}>
                      #{ticket.protocol}
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      {ticket.userName}
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      {ticket.serviceName}
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      <Badge
                        className={getStatusBadgeClass(ticket.current_status)}
                      >
                        {statusMap[ticket.current_status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                      {format(new Date(ticket.updated_at), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex flex-col items-start gap-2 py-6 self-stretch">
              <Button
                className="flex h-[2.75rem] px-8 py-2 justify-center items-center gap-2 self-stretch rounded-md border border-input bg-background"
                onClick={() => setShowAll(true)}
              >
                <p className="text-foreground text-base font-medium leading-normal font-sans">
                  Ver todos os atendimentos
                </p>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AttendantTab;
