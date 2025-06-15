import { ArrowLeft, Info, Search } from 'lucide-react';
import { useNavigate } from 'react-router';

const PageError = () => {
  const navigate = useNavigate();
  const roleName = localStorage.getItem('roleName');

  console.log('PageError', roleName);
  return (
    <div className="relative flex flex-col justify-between items-center w-full min-h-screen p-0 bg-[--elevation-surface] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-[linear-gradient(180deg,_var(--muted-foreground)_0%,_rgba(255,255,255,0)_100%)]" />

      <div className="relative z-10 flex justify-center items-center flex-1 self-stretch px-4 py-10">
        <div className="flex flex-col justify-center items-center gap-6 w-full max-w-md">
          <div className="flex flex-col justify-center items-center gap-6 p-6 sm:p-8 rounded-2xl bg-background shadow-[0_0_1px_rgba(9,30,66,0.31),0_8px_12px_rgba(9,30,66,0.15)] w-full">
            <div className="flex w-24 h-24 sm:w-32 sm:h-32 p-2 justify-center items-center rounded-full bg-sky-200">
              <Search className="w-[2.75rem] h-[2.75rem] sm:w-[3.5rem] sm:h-[3.5rem] text-foreground" />
            </div>

            <div className="flex flex-col items-center gap-1 text-center pb-2">
              <h1 className="text-foreground text-2xl font-semibold leading-8">
                Página não encontrada
              </h1>
              <p className="text-muted-foreground text-base leading-6">
                Não conseguimos encontrar a página que você está procurando.
              </p>
            </div>

            <div className="flex flex-col gap-4 p-4 rounded-lg border border-border bg-background w-full">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-base font-medium text-foreground">
                  Possíveis motivos:
                </span>
              </div>
              <ul className="list-disc pl-6 text-sm text-foreground space-y-1">
                <li>O endereço pode ter sido digitado incorretamente</li>
                <li>A página pode ter sido movida ou excluída</li>
                <li>Você pode não ter permissão para acessar esta página</li>
              </ul>
            </div>

            <div className="flex flex-col items-start gap-4 p-4 self-stretch rounded-lg border border-primary bg-sky-50 text-center sm:text-start w-full">
              <p className="text-primary text-xs font-normal leading-4">
                Você pode voltar para a página anterior, ir para a página
                inicial, ou entrar em contato com o suporte se precisar de
                ajuda.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <button
                onClick={() => navigate(-1)}
                className="cursor-pointer flex h-[2.75rem] p-2 px-8 justify-center items-center gap-2 flex-1 rounded-md border border-input bg-background text-foreground text-base font-medium leading-6 whitespace-nowrap hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
              <button
                onClick={() =>
                  roleName === 'administrador'
                    ? navigate('/perfil')
                    : navigate('/')
                }
                className="cursor-pointer flex h-[2.75rem] p-2 px-8 justify-center items-center gap-2 flex-1 rounded-md bg-primary text-primary-foreground text-base font-normal leading-4 whitespace-nowrap hover:bg-primary/90 transition-colors"
              >
                Ir para a página inicial
              </button>
            </div>

            <div className="flex flex-col itens-center text-center md:flex-row gap-1 text-sm text-muted-foreground mt-2">
              <span>Precisa de ajuda?</span>
              <a
                href="#"
                className="text-primary itens-center no-underline hover:underline cursor-pointer"
              >
                Entre em contato com o suporte
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageError;
