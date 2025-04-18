import useHook from '@/features/register/hooks';
import RegisterForm from '@/features/register/components/RegisterForm';
import LoginCard from '@/common/components/LoginCard';

const RegisterPage = () => {
  const { form, inputBirthRef, inputCPFRef, isAllFilled, onSubmit } = useHook();

  return (
    <LoginCard
      title="Criar uma conta"
      description="Preencha com seus dados pessoais"
    >
      <RegisterForm
        form={form}
        inputBirthRef={inputBirthRef}
        inputCPFRef={inputCPFRef}
        isAllFilled={isAllFilled}
        onSubmit={onSubmit}
      />
    </LoginCard>
  );
};

export default RegisterPage;
