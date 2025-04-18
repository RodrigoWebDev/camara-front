import LoginCard from '@/common/components/LoginCard';
import LoginForm from '@/features/login/components/LoginForm';
import useLoginHook from '@/features/login/hooks';

const LoginPage = () => {
  const { form, isAllFilled, onSubmit } = useLoginHook();

  return (
    <LoginCard
      title="Acesso ao portal"
      description="Entre com suas credenciais para acessar os serviços"
    >
      <LoginForm form={form} onSubmit={onSubmit} isAllFilled={isAllFilled} />
    </LoginCard>
  );
};

export default LoginPage;
