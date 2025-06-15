import { UsersTabProps } from '../interface';
import { Badge } from '@/components/ui/badge';
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
import useHook from '../hooks';
import { useEffect, useMemo, useState } from 'react';
import {
  ServiceResponse,
  getServices,
} from '@/features/attendantService/services';
import { Loader } from '@/common/components/Loader';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import apiClient from '@/services/apiClient';
import {
  UserResponse,
  getAllUser,
} from '@/features/serviceSolicitation/services';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface IGetRolesResponse {
  id: string;
  roleName: string;
}

const ITEMS_PER_PAGE = 5;

const UsersTab = ({}: UsersTabProps) => {
  const {
    onSubmitUsers,
    setOpenModalUser,
    modalFormUsers,
    openModalUser,
    openModalEditUser,
    setOpenModalEditUser,
    inputBirthRef,
    inputCPFRef,
  } = useHook();

  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [activeUserId, setACtiveUserId] = useState<number | null>(null);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [actualRoleId, setActualRoleId] = useState<string | null>(null);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [roles, setRoles] = useState<IGetRolesResponse[]>([]);
  const [page, setPage] = useState(1);

  const editUserSchema = z.object({
    role_id: z.string().nonempty('Esse campo é obrigatório'),
    servicePermissions: z.array(z.string()),
  });

  const editUserForm = useForm({
    resolver: zodResolver(editUserSchema),
    mode: 'onChange',
    defaultValues: {
      role_id: '',
      servicePermissions: [],
    },
  });

  const findUser = () => users.find((item) => item.user_id === activeUserId);

  const {
    formState: {
      isValid: isValidFormUsers,
      isSubmitting: isSubmittingFormUsers,
    },
  } = modalFormUsers;

  const {
    formState: {
      isValid: isValidEditUserForm,
      isSubmitting: isSubmittingEditUserForm,
      isDirty,
    },
  } = editUserForm;

  const getRoles = async () => {
    return await apiClient.get(`/roles`);
  };

  const setEditFormDefaultValues = () => {
    const user = findUser();
    editUserForm.setValue('role_id', user && activeUserId ? user?.role_id : '');

    editUserForm.setValue(
      'servicePermissions',
      user && activeUserId ? user.servicePermissions : []
    );
  };

  const fetchUsers = () => {
    setIsLoadingUsers(true);

    getAllUser()
      .then((res) => {
        setUsers(res);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  };

  const onSubmitEditUser = async (formData: any) => {
    setIsUpdatingUser(true);

    try {
      if (activeUserId) {
        await apiClient.put(`/users/${activeUserId}`, formData);
      } else {
        throw new Error('Ocorreu um erro');
      }

      setOpenModalEditUser(false);
      editUserForm.reset();
      fetchUsers();
    } catch (e) {
      alert('Ocorreu um erro');
    } finally {
      setIsUpdatingUser(false);
    }
  };

  useEffect(() => {
    setIsLoadingServices(true);
    getServices()
      .then((res) => {
        setServices(res);
      })
      .finally(() => {
        setIsLoadingServices(false);
      });

    fetchUsers();

    getRoles()
      .then((res) => {
        setRoles(res.data);
      })
      .finally(() => {
        setIsLoadingRoles(false);
      });
  }, []);

  useEffect(() => {
    if (openModalEditUser === false) {
      setACtiveUserId(null);
      editUserForm.reset();
    }
  }, [openModalEditUser]);

  useEffect(() => {
    setEditFormDefaultValues();
  }, [activeUserId]);

  const order = ['Administrador', 'Atendente', 'Cliente'];

  const sortedUsers = [...users].sort((a, b) => {
    const indexA = order.indexOf(a.roleName);
    const indexB = order.indexOf(b.roleName);

    return (
      (indexA === -1 ? order.length : indexA) -
      (indexB === -1 ? order.length : indexB)
    );
  });

  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedUsers.slice(startIndex, endIndex);
  }, [page, sortedUsers]);

  if (isLoadingServices || isLoadingUsers || isLoadingRoles) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader />
      </div>
    );
  } else {
    return (
      <Card className="p-5">
        <div className="flex items-start md:items-center flex-col md:flex-row md:flex-wrap">
          <div className="flex items-start flex-col flex-[1_0_0]">
            <Title text="Usuários do Sistema" />
            <Description text="Gerencie os usuários e suas permissões de acesso." />
          </div>
          <Modal
            open={openModalUser}
            onOpenChange={setOpenModalUser}
            tittle="Novo Usuário"
            description="Preencha os dados abaixo para adicionar um novo usuário ao sistema."
            classNameContent="!max-w-[90%] md:!max-w-[576px]"
            classNameHeader="gap-0"
            classNameTittle="text-left"
            classNameDescription="text-left"
            classNameButtonX="w-full md:w-auto"
            button={
              <Button
                onClick={() => {
                  setOpenModalUser(true);
                }}
                className="flex justify-center items-center mt-2 w-full md:mt-0 md:w-auto"
              >
                + Novo usuário
              </Button>
            }
          >
            <Form {...modalFormUsers}>
              <form
                className="flex flex-col gap-4"
                onSubmit={modalFormUsers.handleSubmit((data) =>
                  onSubmitUsers(data, fetchUsers)
                )}
              >
                <FormField
                  control={modalFormUsers.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: João Paulo" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={modalFormUsers.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="nome@camara.gov.br" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={modalFormUsers.control}
                  name="profile"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Perfil</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um perfil" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem value={role.id}>
                                {role.roleName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={modalFormUsers.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="123.456.789-00"
                          ref={inputCPFRef}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={modalFormUsers.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="DD/MM/AAAA"
                          ref={inputBirthRef}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={modalFormUsers.control}
                  name="activeUser"
                  render={({ field }) => (
                    <FormItem className="flex justify-between w-full flex-wrap">
                      <FormLabel>Usuário ativo</FormLabel>
                      <FormControl>
                        <Switch
                          id="airplane-mode"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                /> */}
                <div className="flex mt-4 justify-end md:mt-0 !flex-col md:!flex-row">
                  <AlertDialogCancel
                    onClick={() => {
                      setOpenModalUser(false);
                    }}
                  >
                    Cancelar
                  </AlertDialogCancel>
                  <Button
                    disabled={!isValidFormUsers || isSubmittingFormUsers}
                    className="md:ml-2 mt-4 md:mt-0"
                    type="submit"
                  >
                    Salvar alterações
                  </Button>
                </div>
              </form>
            </Form>
          </Modal>

          <Modal
            open={openModalEditUser}
            onOpenChange={setOpenModalEditUser}
            tittle="Editar Usuário"
            description="Preencha os dados abaixo para editar o usuário no sistema."
            classNameContent="!max-w-[90%] md:!max-w-[576px]"
            classNameHeader="gap-0"
            classNameTittle="text-left"
            classNameDescription="text-left"
            classNameButtonX="w-full md:w-auto"
          >
            <Form {...editUserForm}>
              <form
                className="flex flex-col gap-4"
                onSubmit={editUserForm.handleSubmit(onSubmitEditUser)}
              >
                <FormField
                  control={editUserForm.control}
                  name="role_id"
                  render={({ field }) => {
                    setActualRoleId(field.value);
                    return (
                      <FormItem className="w-full">
                        <FormLabel>Perfil</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione um perfil" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem value={role.id}>
                                  {role.roleName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                {roles.find((e) => e.id === actualRoleId)?.roleName ===
                  'Atendente' && <FormLabel>Permissões de serviços</FormLabel>}

                {roles.find((e) => e.id === actualRoleId)?.roleName ===
                  'Atendente' &&
                  services.map((item) => {
                    return (
                      <FormField
                        key={item.id}
                        control={editUserForm.control}
                        name="servicePermissions"
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
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                <div className="flex mt-4 justify-end md:mt-0 !flex-col md:!flex-row">
                  <AlertDialogCancel
                    disabled={isUpdatingUser || isSubmittingEditUserForm}
                    onClick={() => {
                      setOpenModalUser(false);
                    }}
                  >
                    Cancelar
                  </AlertDialogCancel>
                  <Button
                    disabled={
                      !isValidEditUserForm ||
                      isSubmittingEditUserForm ||
                      !isDirty ||
                      isUpdatingUser
                    }
                    className="md:ml-2 mt-4 md:mt-0"
                    type="submit"
                  >
                    {isUpdatingUser ? <Loader /> : 'Salvar alterações'}
                  </Button>
                </div>
              </form>
            </Form>
          </Modal>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="text-muted-foreground">Nome</TableHead>
              <TableHead className="text-muted-foreground">E-mail</TableHead>
              <TableHead className="text-muted-foreground">Perfil</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map(
              ({ full_name, email, roleName, status, user_id }, index) => {
                let stateStyle;

                switch (status) {
                  case 'Ativo':
                    stateStyle = `text-success bg-background-green`;
                    break;
                  case 'Inativo':
                    stateStyle = `text-alert bg-background-yellow`;
                    break;
                }

                return (
                  <TableRow key={index}>
                    <TableCell className="py-5">{full_name}</TableCell>
                    <TableCell className="py-5">{email}</TableCell>
                    <TableCell className="py-5">{roleName}</TableCell>
                    <TableCell className="py-5">
                      <Badge className={stateStyle}>{status}</Badge>
                    </TableCell>
                    <TableCell className="py-5">
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={async () => {
                          setOpenModalEditUser(true);
                          setACtiveUserId(user_id);
                        }}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between w-full py-4">
          <p className="text-sm text-muted-foreground">
            Mostrando {paginatedUsers.length} de {sortedUsers.length} usuários
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground mr-4">
              Página {page} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }
};

export default UsersTab;
