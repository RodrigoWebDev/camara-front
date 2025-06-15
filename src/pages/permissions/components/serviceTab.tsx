import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import Title from './tittle';
import Description from './description';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { ServiceTabProps } from '../interface';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useHook from '../hooks';

const ServiceTab = ({ data }: ServiceTabProps) => {
  const { onSubmitService, setSelectedServices, onChangeService } = useHook();

  useEffect(() => {
    setSelectedServices(data);
  }, [data]);

  return (
    <Card className="p-5">
      <div className="flex items-start md:items-center flex-col md:flex-row md:flex-wrap">
        <div className="flex flex-col items-start flex-[1_0_0]">
          <Title text="Permissões por Serviço" />
          <Description text="Configure quais grupos têm acesso a cada serviço." />
        </div>
        <Button
          onClick={onSubmitService}
          className="flex justify-center items-center mt-2 w-full md:mt-0 md:w-auto"
        >
          <Save />
          Salvar permissões
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="text-muted-foreground">Serviço</TableHead>
            {data[0]?.permissions.map(({ name }) => {
              return (
                <TableHead className="text-muted-foreground">{name}</TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(({ service, permissions }, indexData) => {
            return (
              <TableRow key={indexData}>
                <TableCell className="py-5">{service}</TableCell>
                {permissions.map(({ name, value }, indexPermissions) => {
                  return (
                    <TableCell key={indexPermissions} className="py-5">
                      <Select
                        onValueChange={(service) =>
                          onChangeService(service, name, indexData)
                        }
                        defaultValue={value}
                      >
                        <SelectTrigger className="w-[170px]">
                          <SelectValue placeholder={name} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Completo">Completo</SelectItem>
                          <SelectItem value="Intermediário">
                            Intermediário
                          </SelectItem>
                          <SelectItem value="Basico">Básico</SelectItem>
                          <SelectItem value="Visualizar">Visualizar</SelectItem>
                          <SelectItem value="Editar">Editar</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ServiceTab;
