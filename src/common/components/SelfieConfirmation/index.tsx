import { useRef } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '../ui/button';

type SelfieConfirmationProps = {
  photo?: File;
  onGetPhoto: (photo: File) => void;
};

const SelfieConfirmation = ({ photo, onGetPhoto }: SelfieConfirmationProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onGetPhoto(file);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-start gap-2 px-6 flex-1 self-stretch">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col justify-center items-center gap-4 p-4 flex-1 self-stretch rounded-lg border border-dashed border-border">
        {photo ? (
          <div className="flex flex-col items-center gap-2">
            <span
              className="w-20 h-20 rounded-full bg-background bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${URL.createObjectURL(photo)})` }}
            ></span>
            <span className="text-sm font-medium leading-5 text-success text-center">
              Selfie enviada com sucesso!
            </span>
            <span className="text-sm font-normal leading-5 text-muted-foreground text-center">
              Sua foto está em análise
            </span>
            <div>
              <Button
                type="button"
                onClick={openFilePicker}
                className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md bg-secondary"
              >
                <span className="text-base font-medium leading-6 text-secondary-foreground">
                  Tirar outra selfie
                </span>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 p-3 rounded-full">
                <Camera className="w-6 h-6" />
              </div>
              <span className="text-sm font-normal leading-5 text-muted-foreground text-center">
                Clique no botão abaixo para ativar sua câmera e tirar uma selfie
              </span>
            </div>

            <div>
              <Button
                type="button"
                onClick={openFilePicker}
                className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md bg-secondary"
              >
                <span className="text-base font-medium leading-6 text-secondary-foreground">
                  Tirar selfie
                </span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SelfieConfirmation;
