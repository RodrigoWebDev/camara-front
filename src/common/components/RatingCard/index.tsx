import StarRating from "@/common/components/StarRating";

type RatingCardProps = {
  titulo: string;
  data: string;
  nota: number;
  comentario: string;
  resposta?: string;
};

const RatingCard = ({
  titulo,
  data,
  nota,
  comentario,
  resposta,
}: RatingCardProps) => {
  const hasResposta = Boolean(resposta);

  return (
    <div className="w-full border border-zinc-200 rounded-lg p-4 bg-white">
      <div className={`flex ${hasResposta ? "flex-row gap-4" : "flex-col"}`}>
        {/* Solicitação - ocupa toda a largura se não houver resposta */}
        <div
          className={`${hasResposta ? "w-1/2" : "w-full"} flex flex-col gap-4`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base leading-6 font-medium text-zinc-950 font-sans">
                {titulo}
              </h3>
              <p className="text-xs leading-none font-normal text-zinc-500 font-sans">
                Avaliado em {data}
              </p>
            </div>
            <StarRating rating={nota} />
          </div>

          <div className="min-h-[80px] p-2 px-3 w-full resize-none rounded-md border border-zinc-200 bg-zinc-50 text-sm font-normal text-zinc-500 font-sans">
            {comentario}
          </div>
        </div>

        {/* resposta da camara (opcional) */}
        {hasResposta && (
          <div className="w-1/2 flex flex-col gap-2 bg-sky-50 p-3 rounded-md border border-sky-100 min-h-[80px]">
            <p className="text-sm leading-none font-medium text-zinc-900 font-sans">
              Resposta da Câmara Municipal
            </p>
            <div className="p-2 px-3 w-full bg-sky-50 text-sm font-normal text-zinc-700 font-sans max-h-[160px] overflow-y-auto">
              {resposta}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingCard;
