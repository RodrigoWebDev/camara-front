import { Card } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { MessageSquare, X, CircleHelp } from "lucide-react";

type ActionCardProps = {
  isAction?: boolean;
};

const ActionCard = ({ isAction }: ActionCardProps) => {
  return (
    <Card className="flex flex-col items-start gap-4 p-4 self-stretch rounded-md border border-zinc-200 bg-white shadow-sm">
      <h2 className="text-lg font-semibold leading-7 text-neutral-950">
        {isAction ? "Ações" : "Precisa de ajuda?"}
      </h2>

      {!isAction && (
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex flex-col items-start gap-1 self-stretch">
            <div className="flex items-center gap-2">
              <CircleHelp className="w-6 h-6 text-primary" />
              <p className="text-base font-medium leading-6 text-neutral-900">
                Dúvidas sobre sua solicitação?
              </p>
            </div>
            <p className="flex w-[388px] px-0 pl-8 py-px justify-center items-center">
              Entre em contato com nosso suporte para obter ajuda.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-start gap-2 self-stretch">
        <Button
          variant="outline"
          className="flex h-10 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border border-zinc-200 bg-zinc-50"
        >
          <MessageSquare className="h-4 w-4" />
          Falar com atendente
        </Button>

        {isAction && (
          <Button
            variant="outline"
            className="flex h-10 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border border-zinc-200 bg-zinc-50 text-[#DC2626]"
          >
            <X className="h-4 w-4" />
            Cancelar solicitação
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ActionCard;
