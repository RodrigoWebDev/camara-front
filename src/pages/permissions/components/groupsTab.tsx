import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Description from './description';
import Title from './tittle';
import { Checkbox } from '@/components/ui/checkbox';
import Modal from '@/common/components/Modal';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/common/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/common/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import useHook from '../hooks';

const GroupsTab = () => {
  const {
    onSubmitGroups,
    setOpenModalGroups,
    modalFormGroups,
    openModalGroups,
    permissionOptions,
  } = useHook();

  const {
    formState: {
      isValid: isValidFormGroups,
      isSubmitting: isSubmittingFormGroups,
    },
  } = modalFormGroups;

  return (
    <Card className="p-5">
      <div className="flex items-start md:items-center flex-col md:flex-row md:flex-wrap">
        <div className="flex flex-col items-start flex-[1_0_0]">
          <Title text="Grupos de Acesso" />
          <Description text="Gerencie os grupos de acesso e suas permissões." />
        </div>
        <Modal
          onOpenChange={setOpenModalGroups}
          open={openModalGroups}
          tittle="Novo Grupo de Acesso"
          description="Preencha os dados abaixo para adicionar um novo grupo de acesso ao sistema."
          classNameContent="!max-w-[90%] md:!max-w-[576px]"
          classNameHeader="gap-0"
          classNameTittle="text-left"
          classNameDescription="text-left"
          classNameButtonX="w-full md:w-auto"
          button={
            <Button
              onClick={() => {
                setOpenModalGroups(true);
              }}
              className="flex justify-center items-center mt-2 w-full md:mt-0 md:w-auto"
            >
              + Novo grupo
            </Button>
          }
        >
          <Form {...modalFormGroups}>
            <form
              className="flex flex-col gap-2 md:gap-4"
              onSubmit={modalFormGroups.handleSubmit(onSubmitGroups)}
            >
              <FormField
                control={modalFormGroups.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Administradores" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={modalFormGroups.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o que este grupo poderá fazer"
                        className="resize-none min-h-[98px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={modalFormGroups.control}
                name="accessLevel"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nível de acesso</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione um nível de acesso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Completo</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediário
                          </SelectItem>
                          <SelectItem value="guest">Basic</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormLabel>Permissões</FormLabel>
              <div>
                {permissionOptions.map((item) => {
                  return (
                    <FormField
                      key={item.id}
                      control={modalFormGroups.control}
                      name="permissions"
                      render={({ field }) => (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
              <div className="flex mt-4 justify-end md:mt-0 !flex-col md:!flex-row">
                <AlertDialogCancel
                  onClick={() => {
                    setOpenModalGroups(false);
                  }}
                >
                  Cancelar
                </AlertDialogCancel>
                <Button
                  disabled={!isValidFormGroups || isSubmittingFormGroups}
                  className="md:ml-2 mt-2 md:mt-0"
                  type="submit"
                >
                  Salvar alterações
                </Button>
              </div>
            </form>
          </Form>
        </Modal>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="text-muted-foreground">
              Nome do Grupo
            </TableHead>
            <TableHead className="text-muted-foreground">Descrição</TableHead>
            <TableHead className="text-muted-foreground">Usuários</TableHead>
            <TableHead className="text-muted-foreground">
              Nível de Acesso
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Administradores</TableCell>
            <TableCell>Acesso completo ao sistema</TableCell>
            <TableCell>3</TableCell>
            <TableCell>
              <Badge>Completo</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default GroupsTab;
