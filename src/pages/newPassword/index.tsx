import { useState } from 'react';
import PasswordSuccess from '@/common/components/PasswordSuccess';
import PasswordForm from '@/common/components/PasswordForm';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthCard from '@/common/components/AuthCard';
import usePasswordHook from '@/features/recover/hooks/usePasswordHook';
import { IPasswordFormData } from '@/features/recover/model';

const NewPasswordPage = () => {
  const [step, setStep] = useState(1);
  const { onPasswordSubmit } = usePasswordHook();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const navigate = useNavigate();

  const handleNext = () => setStep((step) => step + 1);

  const onSubmit = (data: IPasswordFormData) =>
    onPasswordSubmit(data, token ?? '', handleNext);

  const description = [
    'Crie uma nova senha para sua conta',
    'Sua senha foi redefinida com sucesso!',
  ];

  const handleBack = () => navigate('/recuperacao');

  return (
    <AuthCard
      title="Recuperar senha"
      description={description[step - 1]}
      showLoginButton={step === 1}
      handleBack={handleBack}
    >
      {step === 1 && (
        <PasswordForm
          onSubmit={onSubmit}
          handleBack={handleBack}
          isRegister={false}
        />
      )}
      {step === 2 && (
        <PasswordSuccess
          title="Senha redefinida com sucesso!"
          description="Sua senha foi alterada. Agora você pode fazer login com sua nova senha."
        />
      )}
    </AuthCard>
  );
};

export default NewPasswordPage;
