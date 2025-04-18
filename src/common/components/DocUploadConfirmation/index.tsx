import { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '../ui/button';

const DocUploadConfirmation = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Documento selecionado:', file);
      // aqui você pode acionar uma função de upload, como:
      // uploadDocument(file);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 px-6 flex-1 self-stretch">
      {/* input escondido que dispara o gerenciador de arquivos */}
      <input
        type="file"
        accept="image/*,.pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* upload>upload */}
      <div className="flex flex-col justify-center items-center gap-4 p-4 flex-1 self-stretch rounded-lg border border-dashed border-border">
        {/* texto e ícone */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 p-3 rounded-full bg-green-100">
            <Upload className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium leading-5 text-success text-center">
            Arraste e solte seu documento aqui, ou clique para selecionar
          </span>
          <span className="text-sm font-normal leading-5 text-muted-foreground text-center">
            Seu documento está em análise
          </span>
        </div>

        {/* botão que abre o gerenciador */}
        <div>
          <Button
            type="button"
            onClick={handleOpenFilePicker}
            className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md bg-secondary"
          >
            <span className="text-base font-medium leading-6 text-secondary-foreground">
              Enviar outro arquivo
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocUploadConfirmation;
