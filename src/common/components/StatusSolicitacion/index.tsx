type StatusSolicitacaoProps = {
  status: string;
  progresso: number;
  etapaAtual: string;
  proximaEtapa: string;
  dataSolicitacao: string;
  ultimaAtualizacao: string;
  tempoEstimado: string;
  previsaoConclusao: string;
};

const StatusSolicitacao = ({
  status,
  progresso,
  etapaAtual,
  proximaEtapa,
  dataSolicitacao,
  ultimaAtualizacao,
  tempoEstimado,
  previsaoConclusao,
}: StatusSolicitacaoProps) => {
  return (
    <div className="p-4 border border-zinc-200 rounded-lg bg-white flex flex-col gap-4 w-full">
      {/* cabecalho */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg leading-7 font-semibold text-zinc-950 font-sans">
          Status da Solicitação
        </h2>
        <span className="text-xs leading-4 font-semibold text-zinc-900 font-sans">
          {status}
        </span>
      </div>

      {/* Progresso */}
      <div className="flex flex-col gap-1">
        {/* Linha superior com título e percentual */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-500">Progresso</span>
          <span className="text-sm leading-5 font-normal text-zinc-500 font-sans">
            {progresso}%
          </span>
        </div>

        {/* Barra de progresso */}
        <div className="w-full h-2 bg-zinc-100 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full"
            style={{ width: `${progresso}%` }}
          ></div>
        </div>
      </div>

      {/* etapas */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="self-stretch text-sm leading-5 font-normal text-zinc-500 font-sans overflow-hidden text-ellipsis line-clamp-1">
            Etapa atual
          </p>
          <p className="self-stretch text-sm leading-5 font-medium text-zinc-900 font-sans overflow-hidden text-ellipsis line-clamp-1">
            {etapaAtual}
          </p>
        </div>
        <div>
          <p className="self-stretch text-sm leading-5 font-normal text-zinc-500 font-sans overflow-hidden text-ellipsis line-clamp-1">
            Próxima etapa
          </p>
          <p className="self-stretch text-sm leading-5 font-medium text-zinc-900 font-sans overflow-hidden text-ellipsis line-clamp-1">
            {proximaEtapa}
          </p>
        </div>
      </div>

      {/* datas */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="self-stretch text-sm leading-5 font-normal text-zinc-500 font-sans overflow-hidden text-ellipsis line-clamp-1">
            Data da solicitação
          </p>
          <p className="self-stretch text-sm leading-5 font-medium text-zinc-900 font-sans overflow-hidden text-ellipsis line-clamp-1">
            {dataSolicitacao}
          </p>
        </div>
        <div>
          <p className="self-stretch text-sm leading-5 font-normal text-zinc-500 font-sans overflow-hidden text-ellipsis line-clamp-1">
            Última atualização
          </p>
          <p className="self-stretch text-sm leading-5 font-medium text-zinc-900 font-sans overflow-hidden text-ellipsis line-clamp-1">
            {ultimaAtualizacao}
          </p>
        </div>
        <div>
          <p className="self-stretch text-sm leading-5 font-normal text-zinc-500 font-sans overflow-hidden text-ellipsis line-clamp-1">
            Tempo estimado
          </p>
          <p className="self-stretch text-sm leading-5 font-medium text-zinc-900 font-sans overflow-hidden text-ellipsis line-clamp-1">
            {tempoEstimado}
          </p>
        </div>
        <div>
          <p className="self-stretch text-sm leading-5 font-normal text-zinc-500 font-sans overflow-hidden text-ellipsis line-clamp-1">
            Previsão de conclusão
          </p>
          <p className="self-stretch text-sm leading-5 font-medium text-zinc-900 font-sans overflow-hidden text-ellipsis line-clamp-1">
            {previsaoConclusao}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusSolicitacao;