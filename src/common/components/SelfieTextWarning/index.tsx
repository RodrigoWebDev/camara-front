const SelfieTextWarning = () => {
  return (
    <div className="flex flex-col items-start gap-2 px-6 self-stretch">
      <span className="text-lg font-medium leading-7 text-foreground">
        Tire uma selfie
      </span>
      <span className="w-[47.75rem] text-base font-normal leading-6 text-muted-foreground">
        Agora, precisamos que você tire uma selfie para confirmarmos que é você
        mesmo. Esta foto será comparada com a do seu documento.
      </span>
    </div>
  );
};

export default SelfieTextWarning;
