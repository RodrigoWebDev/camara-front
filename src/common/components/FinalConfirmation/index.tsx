import { BadgeCheck } from 'lucide-react';

const FinalConfirmation = () => {
  return (
    // sucesso
    <div className="flex flex-col items-start gap-2 px-6 flex-1 self-stretch min-h-fill-available">
      {/* Sucesso>Upload */}
      <div className="flex flex-col justify-center items-center gap-4 p-4 flex-1 self-stretch rounded-lg border border-dashed border-success bg-green-50">
        {/* Sucesso>Upload>Text */}
        <div className="flex flex-col items-center gap-2">
          {/* Sucesso>Upload>Text>Icon */}
          <div className="flex items-center gap-2 p-4 rounded-full bg-green-100">
            <BadgeCheck className="w-8 h-8"></BadgeCheck>
          </div>
          <span className="text-success text-center text-sm font-medium leading-5">
            E-mail verificado com sucesso!
          </span>
          <span className="text-muted-foreground text-center text-sm font-normal leading-5">
            Você pode prosseguir para concluir a verificação
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinalConfirmation;
