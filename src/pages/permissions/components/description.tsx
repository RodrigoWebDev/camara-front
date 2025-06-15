const Description = ({ text }: { text: string }) => {
  return (
    <p className="text-muted-foreground font-sans text-base font-normal leading-6">
      {text}
    </p>
  );
};

export default Description;
