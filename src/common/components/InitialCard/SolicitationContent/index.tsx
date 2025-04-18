type SolicitationContentProps = {
  inProgress: string;
  completed: string;
};

// Solicitations Card
const SolicitationContent = ({
  inProgress = '00',
  completed = '00',
}: SolicitationContentProps) => {
  return (
    <>
      <div className="flex justify-center items-center self-stretch">
        <p className="flex-[1_0_0] text-base font-medium leading-6 text-foreground font-sans">
          Em andamento
        </p>
        <p className="text-base font-semibold leading-6 text-muted-foreground font-sans">
          {inProgress}
        </p>
      </div>
      <div className="flex justify-center items-center self-stretch">
        <p className="flex-[1_0_0] text-base font-medium leading-6 text-foreground font-sans">
          Concluídas
        </p>
        <p className="text-base font-semibold leading-6 text-muted-foreground font-sans">
          {completed}
        </p>
      </div>
    </>
  );
};

export default SolicitationContent;
