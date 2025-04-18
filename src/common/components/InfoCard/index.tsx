import { Info } from 'lucide-react';

type InfoCardProps =
  | { type: 'document' }
  | { type: 'selfie' }
  | { type: 'email'; email: string }
  | { type: 'final' };

const InfoCard = (props: InfoCardProps) => {
  const renderContent = () => {
    switch (props.type) {
      case 'document':
        return (
          <>
            <div className="text-zinc-900 font-sans text-base font-medium leading-normal">
              Dicas para o envio
            </div>
            <ul className="flex flex-col gap-1 text-sm text-zinc-900 font-sans leading-5">
              <li>Certifique-se de que o documento está legível</li>
              <li>Todas as informações devem estar visíveis</li>
              <li>Evite reflexos ou sombras na imagem</li>
              <li>Formatos aceitos: JPG, PNG ou PDF</li>
            </ul>
          </>
        );
      case 'selfie':
        return (
          <>
            <div className="text-zinc-900 font-sans text-base font-medium leading-normal">
              Dicas para a selfie
            </div>
            <ul className="flex flex-col gap-1 text-sm text-zinc-900 font-sans leading-5">
              <li>Escolha um local bem iluminado</li>
              <li>Mantenha uma expressão neutra</li>
              <li>Não use óculos escuros ou chapéu</li>
              <li>Certifique-se de que seu rosto está totalmente visível</li>
            </ul>
          </>
        );
      case 'email':
        return (
          <>
            <div className="text-zinc-900 font-sans text-base font-medium leading-normal">
              Confirme seu e-mail
            </div>
            <p className="text-sm text-muted-foreground leading-5">
              Para finalizar a verificação, precisamos confirmar que você tem
              acesso ao e-mail cadastrado.
              <br />
              Enviamos um código de 6 dígitos para{' '}
              <span className="text-foreground font-medium">{props.email}</span>
              .
            </p>
          </>
        );
      case 'final':
        return (
          <>
            <div className="text-zinc-900 font-sans text-base font-medium leading-normal">
              Tudo certo!
            </div>
            <p className="text-sm text-muted-foreground leading-5">
              Sua identidade foi verificada com sucesso. Você pode concluir o
              processo clicando no botão abaixo.
            </p>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 px-6 self-stretch">
      <div className="flex flex-col justify-center items-start gap-2 self-stretch px-6 py-4 border border-zinc-200 rounded-lg bg-muted/30">
        <div className="flex gap-2 items-start">
          <Info className="w-6 h-6 text-zinc-500 mt-0.5 flex-shrink-0" />
          <div className="flex flex-col gap-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
