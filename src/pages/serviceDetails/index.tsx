import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '@/services/apiClient';
import DocDetails from '@/common/components/DocDetails';
import PageHeader from '@/common/components/PageHeader';
import StarRating from '@/common/components/StarRating';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Paperclip, MessageSquare } from 'lucide-react';

type serviceDetail = {
  id: string;
  name: string;
  description: string;
  schedule: string;
  documents: number;
  rating: number;
  ratingQuantity: number;
  category: string;
  availability: boolean;
  estimatedTime: number;
  addedFields: {
    label: string;
    placeholder: string;
    type: string;
    hint: string;
    required: boolean;
    options: string[];
  }[];
  createdAt: string;
  updatedAt: string;
  faqs?: { question: string; answer: string }[];
  reviews?: { rating: number; comment: string }[];
};

const ServiceDetails = () => {
  const isManager = localStorage.getItem('roleName') === 'Administrador';
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state as { id: string };

  const [service, setService] = useState<serviceDetail | null>(null);

  useEffect(() => {
    if (id) {
      apiClient
        .get(`/services/${id}`)
        .then((res) => setService(res.data))
        .catch((err) => console.error('Erro ao buscar serviço:', err));
    }
  }, [id]);

  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-muted-foreground">Carregando serviço...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-full overflow-x-hidden min-h-screen bg-[--elevation-surface]">
      <div className="flex flex-col flex-1 border-l border-border bg-background">
        {/* header responsivo */}
        <div className="flex flex-col px-4 pt-4 gap-2 w-full">
          <Button
            className="flex h-9 px-3 py-2 justify-center items-center gap-2 rounded-md bg-transparent w-fit"
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-base font-medium leading-6 text-foreground">
              Voltar para serviços
            </span>
          </Button>

          <PageHeader title={service.name} description={service.description} />
        </div>

        {/* conteudo principal */}
        <div className="flex flex-col lg:flex-row gap-6 px-4 pb-12 w-full mt-4">
          {/* coluna esquerda */}
          <div className="flex flex-col gap-4 w-full lg:w-3/5">
            <DocDetails
              title={service.name}
              description={service.description}
              badgeLabel="Documentos"
              estimatedTime={String(service.estimatedTime) || 'Consultar prazo'}
              targetAudience="Consultar público"
              cost="Gratuito"
              validity="Consultar validade"
              documents={service.addedFields
                .filter((e) => e.type === 'file')
                .map((f) => f.label)}
              requirements={['Preenchimento do formulário online']}
              steps={[
                'Consultar etapas',
                'Envio dos documentos necessários',
                'Análise da documentação',
                'Emissão do documento',
                'Agendamento para retirada',
              ]}
              legislation=""
              alertTitle="Observações importantes"
              alertDescription="Verifique os requisitos do serviço antes de enviar."
              isManager={isManager}
            />
          </div>

          {/* coluna direita */}
          <div className="flex flex-col gap-4 w-full lg:w-2/5">
            {/* avaliações */}
            <div className="flex flex-col items-start gap-4 p-4 rounded-md border border-border bg-card shadow-sm w-full">
              <div className="flex flex-col gap-2 w-full">
                <h3 className="text-lg font-semibold text-popover-foreground">
                  Avaliações
                </h3>
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold text-popover-foreground">
                    {service.rating?.toFixed(1) || 0}
                  </h3>
                  <StarRating rating={service.rating || 0} />
                </div>
                <span className="text-base font-normal text-muted-foreground">
                  {service.ratingQuantity !== 1
                    ? `${service.ratingQuantity || 0} avaliações`
                    : '1 avaliação'}
                </span>
              </div>
            </div>
            {isManager && (
              <>
                {/* perguntas frequentes */}
                <div className="flex flex-col gap-4 p-4 rounded-md border border-border bg-card shadow-sm w-full">
                  <h3 className="text-lg font-semibold text-popover-foreground">
                    Perguntas frequentes
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {(
                      service.faqs || [
                        {
                          question: 'Como solicitar este serviço?',
                          answer:
                            'Preencha os formulários e envie os documentos.',
                        },
                        {
                          question: 'Onde acompanho a solicitação?',
                          answer: 'Acompanhe em "Minhas Solicitações".',
                        },
                        {
                          question: 'O serviço é gratuito?',
                          answer: 'Consulte a descrição ou fale com a equipe.',
                        },
                      ]
                    ).map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="no-underline hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="flex w-full">
                    <Button
                      variant="ghost"
                      className="flex h-10 px-4 py-2 gap-2 flex-1 rounded-md border border-input bg-background"
                    >
                      <Paperclip className="w-4 h-4" />
                      <p className="text-base font-medium text-foreground">
                        Mais perguntas e respostas
                      </p>
                    </Button>
                  </div>
                </div>

                {/* ajuda */}
                <div className="flex flex-col gap-2 p-4 rounded-md border border-border bg-card shadow-sm w-full">
                  <h3 className="text-base font-medium text-foreground">
                    Precisa de ajuda?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Se você tiver dúvidas sobre este serviço, entre em contato
                    com nossa equipe de atendimento.
                  </p>
                  <Button className="w-full">
                    <MessageSquare className="w-4 h-4" />
                    <p className="text-base font-medium text-primary-foreground">
                      Falar com um atendente
                    </p>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
