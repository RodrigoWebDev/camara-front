import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IDataActivityLog, IDataServices } from '../interface';
import { useState } from 'react';
import { z } from 'zod';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import { useMask } from '@react-input/mask';
import { mask } from '@/common/utils/masks';
import apiClient from '@/services/apiClient';

const useHook = () => {
  const [openModalUser, setOpenModalUser] = useState(false);
  const [openModalGroups, setOpenModalGroups] = useState(false);
  const [openModalActivityLog, setOpenModalActivityLog] = useState(false);
  const [openModalEditUser, setOpenModalEditUser] = useState(false);

  const [selectedServices, setSelectedServices] = useState<
    IDataServices[] | null
  >(null);
  const [selectedLog, setSelectedLog] = useState<IDataActivityLog | null>(null);

  const permissionOptions = [
    {
      id: 'dashboard',
      label: 'Dashboard',
    },
    {
      id: 'atendimentos',
      label: 'Atendimentos',
    },
    {
      id: 'serviços',
      label: 'Serviços',
    },
    {
      id: 'cidadaos',
      label: 'Cidadaos',
    },
    {
      id: 'eelatorios',
      label: 'Relatórios',
    },
    {
      id: 'configuracoes',
      label: 'Configurações',
    },
  ] as const;

  const errorsMessage = {
    require: 'Esse campo é obrigatório',
    invalid: 'O valor preenchido é inválido',
  };

  const schemaFormUsers = z.object({
    name: z.string().nonempty(errorsMessage.require),
    email: z
      .string()
      .email(errorsMessage.invalid)
      .nonempty(errorsMessage.require),
    profile: z.string().nonempty(errorsMessage.require),
    cpf: z
      .string()
      .nonempty(errorsMessage.require)
      .refine((val) => isValidCPF(val), {
        message: errorsMessage.invalid,
      }),
    date: z.string().nonempty(errorsMessage.require).min(10).max(10),
    //activeUser: z.boolean(),
  });

  const schemaFormGroups = z.object({
    name: z.string().nonempty(errorsMessage.require),
    description: z.string().nonempty(errorsMessage.require),
    accessLevel: z.string().nonempty(errorsMessage.require),
    permissions: z.array(z.string()).nonempty(errorsMessage.require),
  });

  const inputBirthRef = useMask({
    mask: mask.date,
    replacement: mask.replacement,
  });
  const inputCPFRef = useMask({
    mask: mask.cpf,
    replacement: mask.replacement,
  });

  const modalFormUsers = useForm({
    resolver: zodResolver(schemaFormUsers),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      profile: '',
      cpf: '',
      date: '',
      //activeUser: false,
    },
  });

  const modalFormGroups = useForm({
    resolver: zodResolver(schemaFormGroups),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      accessLevel: '',
      permissions: [],
    },
  });

  const passwordHash = () =>
    crypto
      .getRandomValues(new Uint8Array(8))
      .reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '')
      .slice(0, 8);

  const onSubmitUsers = async (data: any, fetchUsers: () => void) => {
    try {
      const password = passwordHash();
      const gender = 'notAnswer';
      const regexOnlyNumber = /[^0-9]/g;
      const document = data.cpf.replace(regexOnlyNumber, '');

      const formattedData = {
        email: data.email,
        full_name: data.name,
        role_id: data.profile,
        birth_date: data.date,
        document,
        password,
        gender,
      };

      await apiClient.post(`/users`, formattedData);
      const { data: user } = await apiClient.get(`/users/document/${document}`);
      await apiClient.put(`/users/${user.user_id}`, {
        role_id: data.profile,
      });

      fetchUsers();
      setOpenModalUser(false);
      modalFormUsers.reset();
    } catch (error: any) {
      const message = error?.response?.data?.message;
      alert(message);
    }
  };

  const onSubmitGroups = async (data: any) => {
    console.log('data: ', data);
    setOpenModalGroups(false);
    modalFormGroups.reset();
  };

  const onChangeService = (service: string, name: string, index: number) => {
    if (selectedServices) {
      const newSelectedServices = [...selectedServices];

      const { permissions } = newSelectedServices[index];

      const newPermissions = permissions.map((data) => {
        return {
          name: data.name,
          value: data.name === name ? service : data.value,
        };
      });

      newSelectedServices[index].permissions = newPermissions;

      setSelectedServices(newSelectedServices);
    }
  };

  const onSubmitService = async () => {
    if (selectedServices) {
      const formattedServices = selectedServices.map((service) => {
        return {
          serviceId: service.serviceId,
          permissions: service.permissions,
        };
      });

      console.log('formattedServices: ', formattedServices);
    }
  };

  return {
    onSubmitUsers,
    onSubmitGroups,
    onSubmitService,
    setOpenModalUser,
    setOpenModalGroups,
    setOpenModalActivityLog,
    onChangeService,
    setSelectedLog,
    setSelectedServices,
    selectedServices,
    selectedLog,
    modalFormUsers,
    modalFormGroups,
    openModalGroups,
    openModalUser,
    openModalActivityLog,
    permissionOptions,
    openModalEditUser,
    inputBirthRef,
    inputCPFRef,
    setOpenModalEditUser,
  };
};

export default useHook;
