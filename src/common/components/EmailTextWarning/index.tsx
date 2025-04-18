const EmailTextWarning = () => {
  return (
    <div className="flex flex-col items-start gap-2 px-6 self-stretch">
      <span className="text-lg font-medium leading-7 text-foreground">
        Confirme seu e-mail
      </span>
      <span className="w-[47.75rem] text-base font-normal leading-6 text-muted-foreground" />
      {/* Para finalizar a verificação, precisamos confirmar que você tem acesso ao e-mail cadastrado. Enviamos um código de 6 dígitos para (email via props) */}
      <span />
    </div>
  );
};

export default EmailTextWarning;
