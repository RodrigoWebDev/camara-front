import PageHeader from '@/common/components/PageHeader';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InfosTab from '@/features/serviceSolicitation/components/InfosTab';
import DocumentsTab from '@/features/serviceSolicitation/components/DocumentsTab';
import ReviewTab from '@/features/serviceSolicitation/components/ReviewTab';
import {
  CreateTicketResponse,
  getService,
  getUser,
  ServiceResponse,
  UserResponse,
} from '@/features/serviceSolicitation/services';
import Stepper from '@/common/components/Stepper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import FeedbackTab from '@/features/serviceSolicitation/components/FeedbackTab';
import ThankYouTab from '@/features/serviceSolicitation/components/ThankYouTab';
import { cn } from '@/common/components/lib/utils';

const ServiceSolcitationPage = () => {
  const [service, setService] = useState<ServiceResponse | null>(null);
  const [client, setClient] = useState<UserResponse | null>(null);
  const [hasFeedback, setHasFeedback] = useState<boolean>(false);
  const [ticket, setTicket] = useState<CreateTicketResponse | null>(null);
  const [step, setStep] = useState<number>(1);

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    fecthData();
  }, [id]);

  const fecthData = async () => {
    const storageUserId = localStorage.getItem('id');
    const userId = parseInt(storageUserId ?? '');
    const user = await getUser(userId);
    const service = await getService(id ?? '');

    setService(service);
    setClient(user);
  };

  const handleBack = () => setStep((step) => step - 1);
  const handleNext = () => setStep((step) => step + 1);
  const getStep = (step: number) => (hasAnyFile ? step + 1 : step);

  const hasAnyFile = service?.addedFields.some(
    (field) => field.type === 'file'
  );
  const fileStep = hasAnyFile ? [{ id: 2, title: 'Documentos' }] : [];
  const steps = [
    { id: 1, title: 'Informações' },
    ...fileStep,
    { id: getStep(2), title: 'Revisão' },
  ];

  const renderOnlyCard = !!ticket;
  const shouldRenderInfos = step === 1 && service;
  const shouldRenderDocuments = step === 2 && hasAnyFile && service;
  const shouldRenderReview = step === getStep(2) && client && service;
  const shouldRenderFeedback = step === getStep(3) && ticket;
  const shouldRenderSuccess = step === getStep(4);

  return (
    <div
      className={cn(
        'flex flex-col gap-2 w-full h-full border-l bg-background',
        renderOnlyCard && 'items-center justify-center'
      )}
    >
      {!renderOnlyCard && (
        <>
          <PageHeader
            handleBack={() => navigate('/catalogo-servicos')}
            title={`Solicitar ${service?.name}`}
            description={service?.description}
          />
          <Stepper current={step} steps={steps} />
        </>
      )}
      {shouldRenderInfos && (
        <InfosTab
          addedFields={service?.addedFields}
          handleBack={() => navigate('/catalogo-servicos')}
          handleNext={handleNext}
          setService={setService}
        />
      )}
      {shouldRenderDocuments && (
        <DocumentsTab
          addedFields={service.addedFields}
          handleNext={handleNext}
          handleBack={handleBack}
          setService={setService}
        />
      )}
      {shouldRenderReview && (
        <ReviewTab
          service={service}
          handleBack={handleBack}
          client={client}
          handleNext={handleNext}
          setTicket={setTicket}
        />
      )}
      {shouldRenderFeedback && (
        <FeedbackTab
          handleNext={(formFilled) => {
            handleNext();
            setHasFeedback(formFilled);
          }}
          ticketId={ticket.id}
          protocol={ticket.protocol}
        />
      )}
      {shouldRenderSuccess && <ThankYouTab hasFeedback={hasFeedback} />}
      {!renderOnlyCard && (
        <Card className="p-4 m-4 mt-0">
          <CardHeader className="px-0 rounded gap-0">
            <CardTitle className="text-lg font-semibold leading-7 text-popover-foreground">
              Precisa de ajuda?
            </CardTitle>
            <CardDescription className="text-base font-normal leading-6 text-muted-foreground">
              Se você tiver dúvidas sobre o preenchimento do formulário ou sobre
              os documentos necessários, entre em contato com nossa equipe de
              atendimento.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Button variant="outline" className="w-full">
              <MessageSquare />
              <span>Falar com um atendente</span>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServiceSolcitationPage;
