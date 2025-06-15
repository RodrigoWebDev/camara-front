import { Badge } from '@/components/ui/badge';
import { getStatusBadgeClass } from '../AttedantServiceTable';
import { statusMap } from '@/pages/attendantServicesPage';
import { addDays, format, parseISO } from 'date-fns';

type StatusSolicitationProps = {
  status: string;
  createdAt: string;
  updatedAt: string;
  estimatedTime: number;
};

const StatusSolicitation = ({
  status,
  createdAt,
  updatedAt,
  estimatedTime,
}: StatusSolicitationProps) => {
  const formatDateBR = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch {
      return '';
    }
  };

  const getPrevision = () => {
    if (!createdAt || !estimatedTime) return '';
    try {
      const previsionDate = addDays(parseISO(createdAt), estimatedTime);
      return format(previsionDate, 'dd/MM/yyyy');
    } catch {
      return '';
    }
  };

  return (
    <div className="p-4 border border-zinc-200 rounded-lg bg-white flex flex-col gap-4 w-full">
      <div className="flex justify-between items-start">
        <h2 className="text-lg leading-7 font-semibold text-zinc-950 font-sans">
          Status da Solicitação
        </h2>
        <Badge className={getStatusBadgeClass(status)}>
          {statusMap[status]?.label}
        </Badge>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-500">Progresso</span>
          <span className="text-sm text-zinc-500">{0}%</span>
        </div>
        <div className="w-full h-2 bg-zinc-100 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${0}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-zinc-500">Etapa atual</p>
          <p className="text-sm font-medium text-zinc-900">
            {statusMap[status]?.label}
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-500">Próxima etapa</p>
          <p className="text-sm font-medium text-zinc-900">
            {statusMap[status]?.label}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-zinc-500">Data da solicitação</p>
          <p className="text-sm font-medium text-zinc-900">
            {formatDateBR(createdAt)}
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-500">Última atualização</p>
          <p className="text-sm font-medium text-zinc-900">
            {formatDateBR(updatedAt)}
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-500">Tempo estimado</p>
          <p className="text-sm font-medium text-zinc-900">
            {estimatedTime > 0 && `${estimatedTime} dias`}
            {estimatedTime === 1 && `${estimatedTime} dia`}
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-500">Previsão de conclusão</p>
          <p className="text-sm font-medium text-zinc-900">{getPrevision()}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusSolicitation;
