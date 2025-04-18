import { useState } from 'react';
import { useNavigate } from 'react-router';
import AccountVerificationWarning from '@/common/components/AccountVerificationWarning';
import DocTextWarning from '@/common/components/DocTextWarning';
import DocUpload1 from '@/common/components/DocUpload1';
import DocUploadConfirmation from '@/common/components/DocUploadConfirmation';
import InfoCard from '@/common/components/InfoCard';
import UploadProgress from '@/common/components/UploadProgress';
import SelfieConfirmation from '@/common/components/SelfieConfirmation';
import EmailValidation from '@/common/components/EmailValidation';
import FinalConfirmation from '@/common/components/FinalConfirmation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AccountVerification = () => {
  const [step, setStep] = useState(0);
  const [document, setDocument] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = (step / (totalSteps - 1)) * 100;

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      navigate('/inicio');
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const getInfoCardProps = (): {
    type: 'document' | 'selfie' | 'final' | 'email';
  } => {
    if (step === 0 || step === 1) return { type: 'document' };
    if (step === 2) return { type: 'selfie' };
    if (step === 3) return { type: 'email' };
    if (step === 4) return { type: 'final' };
    return { type: 'document' };
  };

  return (
    <div className="flex flex-col w-full min-h-screen border-l bg-background">
      <div className="flex h-20 px-4 items-center gap-4 flex-shrink-0 self-stretch">
        <Button
          className="flex h-9 px-3 py-2 justify-center items-center gap-2 rounded-md bg-transparent"
          variant="ghost"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-base font-medium leading-6 text-foreground">
            Voltar para o perfil
          </span>
        </Button>
      </div>

      <div className="flex p-4 items-start gap-4 flex-1 self-stretch">
        <div className="flex flex-col justify-between pb-6 gap-8 flex-1 self-stretch rounded-lg border border-yellow-100 bg-card">
          <div className="flex flex-col justify-center items-start gap-2 px-4 py-6 self-stretch border-b border-yellow-100 bg-yellow-50">
            <AccountVerificationWarning />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col items-start gap-4 px-6 self-stretch">
              <UploadProgress progress={progress} />
            </div>

            {step === 0 && (
              <>
                <DocTextWarning type="document" />
                <InfoCard {...getInfoCardProps()} email="example@example.com" />
                <DocUpload1
                  onUploadDocument={(e) => {
                    setDocument(e);
                    setStep(1);
                  }}
                />
              </>
            )}

            {step === 1 && (
              <>
                <DocTextWarning type="document" />
                <InfoCard {...getInfoCardProps()} email="example@example.com" />
                <DocUploadConfirmation />
              </>
            )}

            {step === 2 && (
              <>
                <DocTextWarning type="selfie" />
                <InfoCard {...getInfoCardProps()} email="example@example.com" />
                <SelfieConfirmation
                  photo={photo || undefined}
                  onGetPhoto={(file) => setPhoto(file)}
                />
              </>
            )}

            {step === 3 && (
              <>
                <DocTextWarning type="email" />
                <InfoCard {...getInfoCardProps()} email="example@example.com" />
                <EmailValidation
                  email={'usuario@email.com'}
                  onValidated={() => setEmailConfirmed(true)}
                />
              </>
            )}

            {step === 4 && (
              <>
                <InfoCard {...getInfoCardProps()} email="example@example.com" />
                <FinalConfirmation />
              </>
            )}
          </div>

          <div className="mt-auto flex justify-between px-6 w-full">
            <Button
              onClick={prevStep}
              className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md border border-input bg-background"
            >
              <span className="text-base font-medium leading-6 text-foreground">
                Voltar
              </span>
            </Button>

            <Button
              onClick={nextStep}
              className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md bg-primary text-primary-foreground"
              disabled={
                (step === 2 && !photo) ||
                (step === 3 && !emailConfirmed) ||
                (step === 0 && !document)
              }
            >
              <span className="text-base font-medium leading-6 text-primary-foreground">
                {step === 4 ? 'Concluir verificação' : 'Próximo'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerification;
