import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type PasswordSuccessProps = {
  title: string;
  description: string;
};

const PasswordSuccess = ({ title, description }: PasswordSuccessProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="p-4 bg-green-100 rounded-full flex items-center justify-center w-max">
        <Check size={32} className="text-success" />
      </div>
      <span className="text-base font-medium leading-6 text-center text-foreground">
        {title}
      </span>
      <span className="text-sm font-normal leading-5 text-center text-muted-foreground mb-5">
        {description}
      </span>
      <Button className="w-full" onClick={() => navigate('/login')}>
        Fazer login
      </Button>
    </div>
  );
};

export default PasswordSuccess;
