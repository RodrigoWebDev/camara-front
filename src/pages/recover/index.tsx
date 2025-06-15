import AuthCard from '@/common/components/AuthCard';
import PasswordSuccess from '@/common/components/PasswordSuccess';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecoverCPFForm from '@/features/recover/components/RecoverCPFForm';
import RecoverEmailForm from '@/features/recover/components/RecoverEmailForm';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const RecoverPage = () => {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleNext = () => setStep((step) => step + 1);
  const handleBack = () => navigate('/login');

  return (
    <AuthCard
      title="Recuperar senha"
      description="Informe seu e-mail ou CPF para recuperar sua senha"
      showCopyright={step === 1}
      handleBack={handleBack}
    >
      {step === 1 && (
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-5">
            <TabsTrigger value="email">E-mail</TabsTrigger>
            <TabsTrigger value="cpf">CPF</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <RecoverEmailForm handleNext={handleNext} />
          </TabsContent>
          <TabsContent value="cpf">
            <RecoverCPFForm handleNext={handleNext} />
          </TabsContent>
        </Tabs>
      )}
      {step === 2 && (
        <PasswordSuccess
          title="E-mail enviado com sucesso!"
          description="Agora você pode alterar sua senha pelo e-mail."
        />
      )}
    </AuthCard>
  );
};

export default RecoverPage;
