import { Eye, FileText } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { useNavigate } from 'react-router';

type SolicitacionProgressProps = {
  id: string;
  type: string;
  number: string;
  date: string;
  progress: number;
  currentStage: string;
  nextStage: string;
  estimatedTime: string;
  lastUpdate: string;
};

const SolicitacionProgress = ({
  id,
  type,
  number,
  date,
  progress,
  currentStage,
  nextStage,
  estimatedTime,
  lastUpdate,
}: SolicitacionProgressProps) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white border border-zinc-200 rounded-md w-full flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <FileText className="w-10 h-10 text-blue-600" />
          <div className="flex flex-col">
            <p className="text-base font-medium leading-6 text-neutral-900">
              {type}
            </p>
            <span className="text-sm text-zinc-500">
              #{number} • {date}
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 py-1.5 gap-1 text-sm font-medium text-neutral-900 border border-zinc-200 bg-white hover:bg-zinc-100"
          onClick={() => navigate(`/detalhes-solicitacao`, { state: { id } })}
        >
          <Eye className="w-4 h-4" />
          Ver detalhes
        </Button>
      </div>
      <div className="border-t border-zinc-200" />
      <div className="flex flex-col gap-1">
        <span className="text-sm text-zinc-500">Progresso</span>
        <div className="w-full h-2 bg-zinc-100 rounded-full">
          <div
            className="h-2 bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
        <div>
          <p className="truncate text-sm font-normal leading-5 text-zinc-500">
            Etapa atual
          </p>
          <p className="truncate text-sm font-medium leading-5 text-neutral-900">
            {currentStage}
          </p>
        </div>
        <div>
          <p className="truncate text-sm font-normal leading-5 text-zinc-500">
            Próxima etapa
          </p>
          <p className="truncate text-sm font-medium leading-5 text-neutral-900">
            {nextStage}
          </p>
        </div>
        <div>
          <p className="truncate text-sm font-normal leading-5 text-zinc-500">
            Tempo estimado
          </p>
          <p className="truncate text-sm font-medium leading-5 text-neutral-900">
            {estimatedTime}
          </p>
        </div>
        <div>
          <p className="truncate text-sm font-normal leading-5 text-zinc-500">
            Última atualização
          </p>
          <p className="truncate text-sm font-medium leading-5 text-neutral-900">
            {lastUpdate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolicitacionProgress;
