import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { Dispatch, SetStateAction } from 'react';
import { Filter } from '@/pages/serviceCatalog';

type ServiceFilterProps = {
  setFilter: Dispatch<SetStateAction<Filter>>;
};

const ServiceFilter = ({ setFilter }: ServiceFilterProps) => {
  return (
    <div className="flex flex-col items-start gap-2 self-stretch md:flex-row">
      <div className="relative w-full">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={16}
        />
        <input
          type="text"
          placeholder="Buscar serviços..."
          className="w-full h-10 pl-10 pr-3 py-2 rounded-md border border-input text-sm text-foreground bg-card"
          onChange={(e) =>
            setFilter((filter) => ({
              ...filter,
              search: e.target.value,
            }))
          }
        />
      </div>
      <Select
        onValueChange={(value) =>
          setFilter((filter) => ({
            ...filter,
            recent: value === 'mais-recentes',
          }))
        }
      >
        <SelectTrigger className="flex h-10 py-2 px-3 justify-between items-center self-stretch data-[placeholder]:text-foreground data-[size]:!h-auto md:w-auto w-full">
          <SelectValue placeholder="Ordenar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="mais-recentes">Mais recentes</SelectItem>
            <SelectItem value="mais-antigos">Mais antigos</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ServiceFilter;
