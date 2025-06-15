import CustomAlert from '@/common/components/CustomAlert';
import { Button } from '@/common/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, CircleCheck, Info } from 'lucide-react';
import ReviewField from './ReviewField';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import {
  createTicket,
  CreateTicketDto,
  createTicketHistory,
  CreateTicketResponse,
  ServiceResponse,
  uploadFile,
  UserResponse,
} from '../services';
import { AddedField } from '@/features/newService/services';

type ReviewTabProps = {
  service: ServiceResponse;
  handleBack: () => void;
  client: UserResponse;
  handleNext: () => void;
  setTicket?: (ticket: CreateTicketResponse) => void;
  attendant?: UserResponse | null;
};

const ReviewTab = ({
  service,
  handleBack,
  client,
  attendant,
  setTicket,
  handleNext,
}: ReviewTabProps) => {
  const [terms, setTerms] = useState<boolean>(false);

  const handleSendSolicitation = async () => {
    const fields = await Promise.all(service.addedFields.map(mapField));

    const data: CreateTicketDto = {
      service_id: service.id,
      current_status: attendant ? 'em_andamento' : 'pendente',
      whatsapp_number: client.phone,
      user_id: client.user_id,
      attendantId: attendant?.user_id,
      attendantName: attendant?.full_name,
      fields,
    };
    const response = await createTicket(data);
    if (!response) return;

    const historyData = {
      ticket_id: response.id,
      action: 'Status atualizado',
    };
    const historyResponse = await createTicketHistory(historyData);
    if (!historyResponse) return;

    handleNext();

    if (!!setTicket) {
      setTicket(response);
    }
  };

  const mapField = async (field: AddedField) => {
    const { label: name, type, value: fieldValue } = field;

    if (type === 'file' && fieldValue instanceof File) {
      const response = await uploadFile(fieldValue);
      const value = response.url;
      return { name, value };
    }
    const value = fieldValue ?? '';
    return { name, value };
  };

  const fileFields = service.addedFields.filter(
    (field) => field.type === 'file'
  );

  return (
    <Card className="p-4 m-4">
      <CardHeader className="px-0 rounded">
        <CardTitle>Revisão da Solicitação</CardTitle>
        <CardDescription>
          Revise todas as informações antes de enviar a solicitação
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 flex flex-col gap-4">
        <CustomAlert
          title="Atenção"
          description="Verifique cuidadosamente todas as informações antes de enviar. Após o envio, alterações só poderão ser feitas mediante solicitação ao atendimento."
          Icon={Info}
          type="alert"
        />
        <span className="text-base font-medium leading-6 text-popover-foreground">
          Revisão da Solicitação
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service.addedFields
            .filter((field) => field.type !== 'file')
            .map((field, i) => (
              <ReviewField
                key={i}
                isFile={false}
                label={field.label}
                value={field.display ?? ''}
              />
            ))}
        </div>
        {fileFields.length > 0 && (
          <>
            <span className="text-base font-medium leading-6 text-popover-foreground">
              Documentos enviados
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fileFields.map((field, i) => (
                <ReviewField
                  key={i}
                  isFile
                  label={field.label}
                  value={field.display ?? ''}
                />
              ))}
            </div>
          </>
        )}
        <span className="text-base font-medium leading-6 text-popover-foreground">
          Informações do Serviço
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ReviewField
            isFile={false}
            label="Serviço Solicitado"
            value={service.name}
          />
          <ReviewField
            isFile={false}
            label="Tempo estimado"
            value={
              service.estimatedTime > 1
                ? `${service.estimatedTime} dias úteis`
                : `${service.estimatedTime} dia útil`
            }
          />
        </div>
        <div className="flex gap-2 md:p-4 md:bg-muted rounded-md mt-4">
          <Checkbox
            id="terms"
            checked={terms}
            onCheckedChange={(checked) => setTerms(!!checked)}
          />
          <span className="text-sm font-medium leading-none text-foreground">
            Declaro que li e conferi todas as informações e documentos, e que
            estão corretos e de acordo com as exigências do serviço.
          </span>
        </div>
        <hr className="my-4 -mx-4" />
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="w-full md:w-auto"
          >
            <ArrowLeft />
            <span>Voltar</span>
          </Button>
          <div className="flex flex-col gap-2 md:flex-row md:gap-4 md:w-auto w-full">
            {/* <Button variant="outline" className="w-full md:w-auto">
              <Save />
              <span>Salvar rascunho</span>
            </Button> */}
            <Button onClick={handleSendSolicitation} disabled={!terms}>
              <CircleCheck />
              <span>Enviar solicitação</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewTab;
