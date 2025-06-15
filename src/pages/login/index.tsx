import AuthCard from '@/common/components/AuthCard';
import LoginForm from '@/features/login/components/LoginForm';

const LoginPage = () => {
  return (
    <AuthCard
      title="Acesso ao portal"
      description="Entre com suas credenciais para acessar os serviços"
      isLogin={true}
    >
      <LoginForm />
    </AuthCard>
  );
};

export default LoginPage;
