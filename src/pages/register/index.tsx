import RegisterForm from '@/features/register/components/RegisterForm';
import AuthCard from '@/common/components/AuthCard';
import { useState } from 'react';
import PasswordForm from '@/common/components/PasswordForm';
import PasswordSuccess from '@/common/components/PasswordSuccess';
import { FirstStepForm, IFormData } from '@/features/register/model';
import useRegisterHook from '@/features/register/hooks';
import { IPasswordFormData } from '@/features/recover/model';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState<IFormData>({
    username: '',
    email: '',
    CPF: '',
    birth: '',
    gender: '',
    password: '',
  });

  const infos = [
    {
      title: 'Criar uma conta',
      description: 'Preencha com seus dados pessoais',
    },
    {
      title: 'Definir senha',
      description: 'Defina uma senha para sua conta',
    },
    {
      title: 'Criar uma conta',
      description: null,
    },
  ];

  const { onSubmit } = useRegisterHook();
  const navigate = useNavigate();

  const handleNext = () => setStep((step) => step + 1);
  const handleBack = () =>
    step === 2 ? setStep((step) => step - 1) : navigate('/login');

  const firstStepSubmit = (data: FirstStepForm) => {
    setFormValues((values) => ({ ...values, ...data }));
    handleNext();
  };

  const secondStepSubmit = (data: IPasswordFormData) => {
    const values = { ...formValues, ...data };
    onSubmit(values, handleNext);
  };

  return (
    <AuthCard
      title={infos[step - 1].title}
      description={infos[step - 1].description}
      showCopyright={step === 1}
      showLoginButton={step === 2}
      isRegister={true}
      handleBack={handleBack}
    >
      {step === 1 && <RegisterForm onSubmit={firstStepSubmit} />}
      {step === 2 && (
        <PasswordForm
          onSubmit={secondStepSubmit}
          handleBack={handleBack}
          isRegister={true}
        />
      )}
      {step === 3 && (
        <PasswordSuccess
          title="Cadastro realizado com sucesso!"
          description="Sua conta foi criada e você já pode fazer login com suas credenciais."
        />
      )}
    </AuthCard>
  );
};

export default RegisterPage;
