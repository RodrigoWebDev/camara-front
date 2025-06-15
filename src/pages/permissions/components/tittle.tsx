const Tittle = ({
  text,
  classNameContainer,
}: {
  text: string;
  classNameContainer?: string;
}) => {
  return (
    <h1
      className={`text-card-foreground font-sans font-semibold text-lg leading-none mb-1 ${classNameContainer}`}
    >
      {text}
    </h1>
  );
};

export default Tittle;
