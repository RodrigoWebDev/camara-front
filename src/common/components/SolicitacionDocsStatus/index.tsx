import { FileText, Download } from 'lucide-react';
import PageHeader from '../PageHeader';
import { Button } from '../ui/button';

type Document = {
  name: string;
  file: string;
};

interface SolicitacionDocsStatusProps {
  documents: Document[];
}

const SolicitacionDocsStatus = ({ documents }: SolicitacionDocsStatusProps) => {
  const downloadFile = async (doc: Document) => {
    const response = await fetch(doc.file);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-start gap-4 pb-4 px-0 self-stretch rounded-md border border-border bg-card shadow-sm">
      <PageHeader
        title="Documentos da Solicitação"
        description="Documentos enviados e seu status atual"
      />
      <div className="flex flex-col items-start gap-2 py-0 px-4 self-stretch">
        {documents.map((doc, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-4 px-4 w-full rounded-md bg-muted"
          >
            <div className="flex items-center gap-4 flex-1">
              <FileText className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {doc.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => downloadFile(doc)}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ação para novo upload */}
      {/* <div className="flex flex-col items-start gap-4 py-0 px-4 self-stretch">
        <ActionCard isUploadCard />
      </div> */}
    </div>
  );
};

export default SolicitacionDocsStatus;
