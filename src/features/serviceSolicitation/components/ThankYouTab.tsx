import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, Home, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ThankYouTabProps = {
  hasFeedback: boolean;
};

const ThankYouTab = ({ hasFeedback }: ThankYouTabProps) => {
  const navigate = useNavigate();

  return (
    <Card className="w-auto mx-4 md:w-[70%] md:mx-auto">
      <CardContent className="flex flex-col gap-8 items-center">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-background-green p-4 mb-4">
            {hasFeedback ? (
              <Sparkles size={32} className="text-success" />
            ) : (
              <CircleCheck size={32} className="text-success" />
            )}
          </div>
          <h1 className="text-center text-success text-xl font-semibold leading-normal">
            {hasFeedback
              ? 'Obrigado pelo seu feedback!'
              : 'Serviço solicitado com sucesso!'}
          </h1>
          <p className="text-center text-muted-foreground">
            {hasFeedback
              ? 'Sua opinião é fundamental para melhorarmos nossos serviços'
              : 'Os dados foram registrados no sistema'}
          </p>
        </div>
        {hasFeedback && (
          <p className="text-center text-foreground text-lg font-normal leading-normal">
            Suas respostas foram registradas com sucesso e serão utilizadas para
            aprimorar a experiência de todos os cidadãos.
          </p>
        )}
        <Button onClick={() => navigate('/inicio')}>
          <Home />
          <span>Voltar ao início</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThankYouTab;
