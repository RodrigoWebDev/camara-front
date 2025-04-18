type DocTextWarningProps = {
  type: 'document' | 'selfie' | 'email';
};

const DocTextWarning = ({ type }: DocTextWarningProps) => {
  const content = {
    document: {
      title: 'Envie um documento com foto',
      text: 'Para verificarmos sua identidade, precisamos que você envie uma foto de um documento oficial com foto. Você pode enviar seu RG, CNH ou Passaporte.',
    },
    selfie: {
      title: 'Tire uma selfie',
      text: 'Agora, precisamos que você tire uma selfie para confirmarmos que é você mesmo. Esta foto será comparada com a do seu documento.',
    },
    email: {
      title: 'Confirme seu e-mail',
      text: 'Para finalizar a verificação, precisamos confirmar que você tem acesso ao e-mail cadastrado. Enviamos um código de 6 dígitos para kayodante@gmail.com.',
    },
  };

  const { title, text } = content[type];

  return (
    <div className="flex flex-col items-start gap-2 px-6 self-stretch">
      <span className="text-lg font-medium leading-7 text-foreground">
        {title}
      </span>
      <span className="w-[47.75rem] text-base font-normal leading-6 text-muted-foreground">
        {text}
      </span>
    </div>
  );
};

export default DocTextWarning;
