import CustomAlert from '@/common/components/CustomAlert';
import PageHeader from '@/common/components/PageHeader';
import StepperProgress from '@/common/components/StepperProgress';
import CitizenTab from '@/features/attendantService/components/CitizenTab';
import ServiceTab from '@/features/attendantService/components/ServiceTab';
import { ServiceResponse } from '@/features/attendantService/services';
import DocumentsTab from '@/features/serviceSolicitation/components/DocumentsTab';
import InfosTab from '@/features/serviceSolicitation/components/InfosTab';
import ReviewTab from '@/features/serviceSolicitation/components/ReviewTab';
import {
  CreateTicketResponse,
  NewUserResponse,
  UserResponse,
} from '@/features/serviceSolicitation/services';
import apiClient from '@/services/apiClient';
import { CircleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const AttendantServicePage = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] =
    useState<ServiceResponse | null>(null);
  const [client, setClient] = useState<NewUserResponse | null>(null);
  const [attendant, setAttendant] = useState<UserResponse | null>(null);
  const [ticket, setTicket] = useState<CreateTicketResponse | null>(null);

  const attendantId = parseInt(localStorage.getItem('id') ?? '');

  useEffect(() => {
    apiClient
      .get(`users/${attendantId}`)
      .then((res) => setAttendant(res.data))
      .catch((err) => console.error('Erro ao retornar atendente:', err));
  }, []);

  const hasAnyFile = selectedService?.addedFields.some(
    (field) => field.type === 'file'
  );

  const fileStep = hasAnyFile
    ? [{ id: 4, title: 'Documentos', show: true }]
    : [];

  const steps = [
    { id: 1, title: 'Serviço', show: true },
    { id: 2, title: 'Cidadão', show: true },
    { id: 3, title: 'Formulário', show: true },
    ...fileStep,
    { id: hasAnyFile ? 5 : 4, title: 'Revisão', show: true },
  ];

  const shouldRenderHeader = !ticket;
  const shouldRenderService = step === 1;
  const shouldRenderCitizen = step === 2 && selectedService;
  const shouldRenderInfos = step === 3 && selectedService;
  const shouldRenderDocuments = step === 4 && selectedService && hasAnyFile;
  const shouldRenderReview =
    step === (hasAnyFile ? 5 : 4) && selectedService && client;
  //const shouldRenderSuccess = step === (hasAnyFile ? 6 : 5) && ticket && client && selectedService;

  const handleBack = () => setStep((step) => step - 1);
  const handleNext = () => setStep((step) => step + 1);

  const navigate = useNavigate();

  const selectService = (service: ServiceResponse) => {
    setSelectedService(service);
    handleNext();
  };

  return (
    <div className="flex flex-col w-full min-h-screen border-l bg-background gap-8">
      {shouldRenderHeader && (
        <>
          <PageHeader
            title="Novo Atendimento"
            handleBack={() => navigate(-1)}
          />
          <StepperProgress current={step - 1} steps={steps} />
        </>
      )}
      {shouldRenderService && <ServiceTab selectService={selectService} />}
      {shouldRenderCitizen && (
        <CitizenTab
          client={client}
          setClient={setClient}
          serviceName={selectedService?.name}
          serviceDescription={selectedService?.description}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {shouldRenderInfos && (
        <>
          {client?.isNew && (
            <div className="px-4 mb-[-32px]">
              <CustomAlert
                Icon={CircleAlert}
                title="Cidadão cadastrado para verificação. Os dados serão verificados pela equipe de atendimento. O cidadão receberá notificações sobre o processo."
                type="alert"
              />
            </div>
          )}
          <InfosTab
            addedFields={selectedService.addedFields}
            setService={setSelectedService}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </>
      )}
      {shouldRenderDocuments && (
        <DocumentsTab
          addedFields={selectedService.addedFields}
          setService={setSelectedService}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {shouldRenderReview && (
        <ReviewTab
          handleBack={handleBack}
          service={selectedService}
          client={client}
          attendant={attendant}
          setTicket={setTicket}
          handleNext={() => window.location.reload()}
        />
      )}
      {/* {shouldRenderSuccess && (
        <SuccessTab client={client} service={selectedService} ticket={ticket} />
      )} */}
    </div>
  );
};

export default AttendantServicePage;
