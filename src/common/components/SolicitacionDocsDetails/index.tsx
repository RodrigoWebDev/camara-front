import { format, isValid, parseISO } from 'date-fns';

type DetailItem = {
  name: string;
  value: string;
};

type SolicitacionDocsDetailsProps = {
  items: DetailItem[];
};

const SolicitacionDocsDetails = ({ items }: SolicitacionDocsDetailsProps) => {
  const formatValue = (value: string) => {
    const date = parseISO(value);
    if (isValid(date) && value.includes('T')) {
      return format(date, 'dd/MM/yyyy');
    }
    return value;
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-border rounded-lg w-full">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-foreground">Detalhes</h3>
        <p className="text-sm text-muted-foreground">
          Informações fornecidas no formulário
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-1 min-w-[20rem] h-[4.5rem] p-4 items-center gap-2 bg-muted rounded-md"
          >
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-normal text-muted-foreground truncate">
                {item.name}
              </p>
              <p className="text-sm font-medium text-foreground truncate">
                {formatValue(item.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolicitacionDocsDetails;
