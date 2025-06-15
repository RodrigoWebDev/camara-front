import { useRef } from 'react';
import { Card } from '@/common/components/ui/card';
import { Button } from '@/common/components/ui/button';
import { MessageSquare, X, CircleHelp, Paperclip } from 'lucide-react';

type ActionCardProps = {
  isAction?: boolean;
  isUploadCard?: boolean;
  title?: string;
  description?: string;
  uploadButtonLabel?: string;
  onFileChange?: (file: File) => void;
};

const ActionCard = ({
  isAction,
  isUploadCard,
  title,
  description,
  uploadButtonLabel = 'Anexar documento',
  onFileChange,
}: ActionCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileChange) {
      onFileChange(file);
    }
  };

  return (
    <Card className="flex flex-col items-start gap-4 p-4 self-stretch rounded-md border border-border bg-card shadow-sm">
      {isUploadCard ? (
        <>
          <div className="flex items-center gap-2">
            <CircleHelp className="w-4 h-4 text-primary" />
            <p className="text-base font-medium leading-6 text-primary">
              {title || 'Enviar documento adicional'}
            </p>
          </div>

          <p className="text-base font-normal leading-6 text-muted-foreground pl-6">
            {description ||
              'Se necessário, você pode enviar documentos adicionais para complementar sua solicitação.'}
          </p>

          {/* input oculto para seleção de arquivo */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <Button
            onClick={handleButtonClick}
            variant="outline"
            className="self-start flex items-center gap-2"
          >
            <Paperclip className="w-4 h-4" />
            {uploadButtonLabel}
          </Button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold leading-7 text-foreground">
            {isAction ? 'Ações' : title || 'Precisa de ajuda?'}
          </h2>

          {!isAction && (
            <div className="flex flex-col items-start gap-4 self-stretch">
              <div className="flex flex-col items-start gap-1 self-stretch">
                <div className="flex items-center gap-2">
                  <CircleHelp className="w-6 h-6 text-primary" />
                  <p className="text-base font-medium leading-6 text-foreground">
                    Dúvidas sobre sua solicitação?
                  </p>
                </div>
                <p className="text-base font-normal leading-6 text-muted-foreground pl-8">
                  {description ||
                    'Entre em contato com nosso suporte para obter ajuda.'}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col items-start gap-2 self-stretch">
            <Button
              variant="outline"
              className="flex h-10 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border border-border bg-muted"
            >
              <MessageSquare className="h-4 w-4" />
              Falar com atendente
            </Button>

            {isAction && (
              <Button
                variant="outline"
                className="flex h-10 px-4 py-2 justify-center items-center gap-2 self-stretch rounded-md border border-border bg-muted text-destructive"
              >
                <X className="h-4 w-4" />
                Cancelar solicitação
              </Button>
            )}
          </div>
        </>
      )}
    </Card>
  );
};

export default ActionCard;
