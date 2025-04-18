import { ShieldCheck } from 'lucide-react';

const AccountVerificationWarning = () => {
  return (
    // aviso verificacao de conta / Header
    <div className="flex flex-col justify-center items-start px-4 py-6 gap-2 self-stretch border-b border-yellow-100 bg-yellow-50">
      {/* Header > Content */}
      <div className="flex items-center gap-4">
        {/* Header>Content>SideBar */}
        <div className="flex w-10 h-10 p-2.5 justify-center items-center gap-2 rounded-full bg-yellow-100">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
        </div>
        {/* Header > Content > Text */}
        <div className="flex w-[23.375rem] flex-col items-start">
          <span className="self-stretch text-foreground text-2xl font-semibold leading-none">
            Verificação de Conta
          </span>
          <span className="self-stretch text-muted-foreground text-sm font-normal leading-normal">
            Complete os passos abaixo para verificar sua identidade
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationWarning;
