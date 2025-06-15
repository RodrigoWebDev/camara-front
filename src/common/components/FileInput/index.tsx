import { useRef, useState } from 'react';
import { cn } from '@/common/components/lib/utils';
import { Upload } from 'lucide-react';

type FileInputProps = {
  placeholder: string;
  value: File | null;
  onChange: (file: File) => void;
  invalid: boolean;
};

const FileInput = ({
  value,
  placeholder,
  onChange,
  invalid,
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <div>
      <div
        className={cn(
          'border border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer bg-background',
          isDragOver && 'bg-muted/50',
          invalid && 'border-destructive ring-destructive'
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) onChange(file);
        }}
      >
        <Upload className={cn('mb-2', invalid && 'text-destructive')} />
        <p
          className={cn(
            'text-sm font-normal leading-5 text-center text-muted-foreground',
            invalid && 'text-destructive'
          )}
        >
          Clique para selecionar ou arraste o arquivo
        </p>
        <p
          className={cn(
            'text-sm font-normal leading-5 text-center text-muted-foreground',
            invalid && 'text-destructive'
          )}
        >
          {placeholder}
        </p>
        {value?.name && (
          <p className="mt-2 text-sm font-medium">{value.name}</p>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
      />
    </div>
  );
};

export default FileInput;
