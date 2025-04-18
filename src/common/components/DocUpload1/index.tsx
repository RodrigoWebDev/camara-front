import { Upload } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '../ui/button';

type DocUpload1Props = {
  onUploadDocument: (file: File) => void;
};

const DocUpload1 = ({ onUploadDocument }: DocUpload1Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilePick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUploadDocument(file);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex flex-col justify-center items-center gap-4 p-4 flex-1 self-stretch rounded border border-dashed border-border">
        <div className="flex flex-col items-center gap-2">
          <span className="w-6 h-6">
            <Upload />
          </span>
          <span className="text-sm font-normal leading-5 text-muted-foreground text-center">
            Arraste e solte seu documento aqui, ou clique para selecionar
          </span>
        </div>

        <div>
          <Button
            type="button"
            onClick={handleFilePick}
            className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md bg-primary"
          >
            Selecionar documento
          </Button>
        </div>
      </div>
    </>
  );
};

export default DocUpload1;
