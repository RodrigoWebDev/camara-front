import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";

const ServiceFilter = () => {
  return (
    <div className="flex items-start gap-2 self-stretch">
      {/* Campo de busca */}
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={16}
        />
        <input
          type="text"
          placeholder="Buscar serviços..."
          className="w-full h-10 pl-10 pr-3 py-2 rounded-md border border-input text-sm text-foreground bg-card"
        />
      </div>

      {/* Select de Categorias */}
      <div className="flex items-start gap-2 self-stretch">
        <Select>
          <SelectTrigger className="flex h-10 py-2 px-3 justify-between items-center self-stretch data-[placeholder]:text-foreground data-[size]:!h-auto">
            <SelectValue placeholder="Categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="protocolos">Protocolos</SelectItem>
              <SelectItem value="pets">Pet's</SelectItem>
              <SelectItem value="audiencia">Audiência</SelectItem>
              <SelectItem value="ouvidoria">Ouvidoria</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Select de Ordenação */}
        <Select>
          <SelectTrigger className="flex h-10 py-2 px-3 justify-between items-center self-stretch data-[placeholder]:text-foreground data-[size]:!h-auto">
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
    </div>
  );
};

export default ServiceFilter;
