import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { SelectValue } from '@radix-ui/react-select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import PreferenceCard from '../PreferenceCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { mask } from '@/common/utils/masks';
import apiClient from '@/services/apiClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from '@react-input/mask';
import { z } from 'zod';
import FormInfoContent from './Form';
import {
  isValidCPF,
  isValidCEP,
  isValidPhone,
} from '@brazilian-utils/brazilian-utils';

type InfoTabProps = {
  name: string;
  email: string;
  phone: string;
  document: string;
  birth_date: string;
  photo?: string;
  number?: string;
  cep?: string;
  address?: string;
  city?: string;
  state?: string;
};

const InfoContent = ({
  name,
  email,
  phone,
  document,
  birth_date,
  // photo,
  number,
  cep,
  address,
  city,
  state,
}: InfoTabProps) => {
  const [selected, setSelected] = useState('personalInfo');
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const errorsMessage = {
    require: 'Esse campo é obrigatório',
    invalid: 'O valor preenchido é inválido',
  };

  const schema = z.object({
    name: z.string().nonempty(errorsMessage.require).max(80),
    email: z.string().nonempty(errorsMessage.require).email(),
    tel: z
      .string()
      .nonempty(errorsMessage.require)
      .refine((val) => isValidPhone(val), {
        message: errorsMessage.invalid,
      }),
    cpf: z
      .string()
      .nonempty(errorsMessage.require)
      .refine((val) => isValidCPF(val), {
        message: errorsMessage.invalid,
      }),
    date: z.string().nonempty(errorsMessage.require).min(10).max(10),
    cep: z
      .string()
      .nonempty(errorsMessage.require)
      .refine((val) => isValidCEP(val), {
        message: errorsMessage.invalid,
      }),
    number: z.string().nonempty(errorsMessage.require).max(5),
    address: z.string().nonempty(errorsMessage.require).max(100),
    city: z.string().nonempty(errorsMessage.require).max(40),
    state: z.string().nonempty(errorsMessage.require).max(40),
  });

  const defaultValues = {
    name,
    email,
    tel: format(phone, { mask: mask.tel, replacement: mask.replacement }),
    cpf: format(document, { mask: mask.cpf, replacement: mask.replacement }),
    date: birth_date,
    cep: cep
      ? format(cep, { mask: mask.cep, replacement: mask.replacement })
      : '',
    address,
    city,
    state,
    number,
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { watch, setValue } = form;
  const cepValue = watch('cep');

  const getViaCep = async (cep: string) => {
    if (cep.length === 9) {
      try {
        setIsLoadingCep(true);
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        setValue('address', data?.logradouro || '');
        setValue('city', data?.localidade || '');
        setValue('state', data?.uf || '');
      } catch (e) {
        alert('Ocorreu um erro na consulta do CEP.');
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const userId = localStorage.getItem('id');
      const regexOnlyNumber = /[^0-9]/g;

      const formattedData = {
        email: data.email,
        full_name: data.name,
        phone: data.tel.replace(regexOnlyNumber, ''),
        cep: String(data.cep.replace(regexOnlyNumber, '')),
        address: data.address,
        city: data.city,
        state: data.state,
        number: data.number,
        birth_date: new Date(data.date).toISOString(),
        updated_at: new Date().toISOString(),
        document: data.cpf.replace(regexOnlyNumber, ''),
      };

      const response = await apiClient.put(`/users/${userId}`, formattedData);

      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message;

      alert(message);
    }
  };

  const userInfo = [
    {
      label: 'Nome completo',
      name: 'name',
      placeholder: 'Ex: Jonh Doe',
      type: 'text',
    },
    {
      label: 'E-mail',
      name: 'email',
      placeholder: 'Ex: exemplo123@gmail.com',
      type: 'email',
    },
    {
      label: 'Telefone',
      name: 'tel',
      placeholder: 'Ex: (48) 99999-9999',
      type: 'tel',
      mask: mask.tel,
    },
    {
      label: 'CPF',
      name: 'cpf',
      placeholder: 'Ex: 123.456.789-00',
      type: 'text',
      mask: mask.cpf,
    },
    {
      label: 'Data de Nascimento',
      name: 'date',
      type: 'text',
      placeholder: 'Ex: 25/01/1990',
      mask: mask.date,
    },
    {
      label: 'CEP',
      name: 'cep',
      placeholder: 'Ex: 00000-000',
      type: 'text',
      mask: mask.cep,
    },
    {
      label: 'Endereço',
      name: 'address',
      placeholder: 'Ex: Rua Tal',
      type: 'text',
      readOnly: true,
    },
    {
      label: 'Número',
      name: 'number',
      placeholder: '0000',
      type: 'text',
      mask: mask.number,
    },
    {
      label: 'Cidade',
      name: 'city',
      placeholder: 'Ex: Florianópolis',
      type: 'text',
      readOnly: true,
    },
    {
      label: 'Estado',
      name: 'state',
      placeholder: 'Ex: SC',
      type: 'text',
      readOnly: true,
    },
  ];

  const textStyle =
    'text-base font-medium leading-6 text-center text-foreground font-sans whitespace-nowrap';

  useEffect(() => {
    getViaCep(cepValue);
  }, [cepValue]);

  return (
    <>
      <Tabs className="hidden md:block" defaultValue="personalInfo">
        <TabsList className="flex h-10 p-1 mb-4 justify-center items-center self-stretch rounded-md bg-muted">
          <TabsTrigger
            value="personalInfo"
            className="flex px-3 py-[6px] justify-center items-center gap-2 flex-[1_0_0] self-stretch rounded-sm focus:bg-card focus:shadow-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            <p className={textStyle}>Informações pessoais</p>
          </TabsTrigger>
          <TabsTrigger
            value="preference"
            disabled={true}
            className="flex px-3 py-[6px] justify-center items-center gap-2 flex-[1_0_0] self-stretch rounded-sm focus:bg-card focus:shadow-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            <p className={textStyle + ' opacity-50'}>Preferências</p>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            disabled={true}
            className="flex px-3 py-[6px] justify-center items-center gap-2 flex-[1_0_0] self-stretch rounded-sm focus:bg-card focus:shadow-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
          >
            <p className={textStyle + ' opacity-50'}>Segurança</p>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personalInfo" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle className="self-stretch text-2xl font-semibold leading-8 text-card-foreground font-sans">
                Informações pessoais
              </CardTitle>
              <CardDescription className="self-stretch text-base font-normal leading-6 text-muted-foreground font-sans">
                Gerencie seus dados cadastrais
              </CardDescription>
            </CardHeader>
            <FormInfoContent
              form={form}
              onSubmit={onSubmit}
              isLoadingCep={isLoadingCep}
              userInfo={userInfo}
            />
          </Card>
        </TabsContent>
        <TabsContent value="preference">
          <Card>
            <CardHeader>
              <CardTitle className="self-stretch text-2xl font-semibold leading-8 text-card-foreground font-sans">
                Preferências
              </CardTitle>
              <CardDescription className="self-stretch text-base font-normal leading-6 text-muted-foreground font-sans">
                Escolha como deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-5 flex-[1_0_0] self-stretch">
              <div className="flex justify-between items-center p-4 self-stretch rounded-md border border-border">
                <div className="flex flex-col items-start gap-0 flex-[1_0_0]">
                  <p className="self-stretch text-base font-medium leading-6 text-foreground font-sans">
                    E-mail
                  </p>
                  <p className="self-stretch text-sm font-normal leading-5 text-muted-foreground font-sans">
                    Receba notificações por e-mail
                  </p>
                </div>
                <Switch className="flex items-start gap-2 bg-primary" />
              </div>

              <div className="flex justify-between items-center p-4 self-stretch rounded-md border border-border">
                <div className="flex flex-col items-start gap-0 flex-[1_0_0]">
                  <p className="self-stretch text-base font-medium leading-6 text-foreground font-sans">
                    WhatsApp
                  </p>
                  <p className="self-stretch text-sm font-normal leading-5 text-muted-foreground font-sans">
                    Receba notificações por WhatsApp
                  </p>
                </div>
                <Switch className="flex items-start gap-2 bg-primary" />
              </div>

              <div className="flex justify-between items-center p-4 self-stretch rounded-md border border-border">
                <div className="flex flex-col items-start gap-0 flex-[1_0_0]">
                  <p className="self-stretch text-base font-medium leading-6 text-foreground font-sans">
                    Notificações Push
                  </p>
                  <p className="self-stretch text-sm font-normal leading-5 text-muted-foreground font-sans">
                    Receba notificações no navegador
                  </p>
                </div>
                <Switch className="flex items-start gap-2 bg-primary" />
              </div>

              <PreferenceCard
                title="Preferências de Contato"
                description="Suas preferências de notificação serão aplicadas a todos os serviços e agendamentos. Você pode alterar essas configurações a qualquer momento."
              />
            </CardContent>
            <CardFooter className="flex justify-end items-center gap-4 self-stretch">
              <Button className="flex h-10 px-4 py-2 justify-center items-center gap-2 bg-transparent">
                <p className="text-base font-medium leading-6 text-foreground font-sans">
                  Cancelar
                </p>
              </Button>
              <Button
                type="submit"
                className="flex h-10 px-4 py-2 justify-center items-center gap-2"
              >
                <p>Salvar alterações</p>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="self-stretch text-2xl font-semibold leading-8 text-card-foreground font-sans">
                Segurança
              </CardTitle>
              <CardDescription className="self-stretch text-base font-normal leading-6 text-muted-foreground font-sans">
                Gerencie a segurança da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-5 self-stretch">
              <div className="flex flex-col min-w-[192px] items-start gap-2 self-stretch">
                <Label
                  htmlFor="password"
                  className="self-stretch text-base font-medium leading-none text-foreground font-sans"
                >
                  {' '}
                  Senha Atual{' '}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha atual"
                  className="flex h-10 px-3 py-2 items-center gap-1 self-stretch rounded-md border border-input bg-background"
                />
              </div>

              <div className="flex flex-col min-w-[192px] items-start gap-2 self-stretch">
                <Label
                  htmlFor="password"
                  className="self-stretch text-base font-medium leading-none text-foreground font-sans"
                >
                  {' '}
                  Nova senha{' '}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua nova atual"
                  className="flex h-10 px-3 py-2 items-center gap-1 self-stretch rounded-md border border-input bg-background"
                />
              </div>

              <div className="flex flex-col min-w-[192px] items-start gap-2 self-stretch">
                <Label
                  htmlFor="password"
                  className="self-stretch text-base font-medium leading-none text-foreground font-sans"
                >
                  {' '}
                  Confirmar nova senha{' '}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Confirmar nova atual"
                  className="flex h-10 px-3 py-2 items-center gap-1 self-stretch rounded-md border border-input bg-background"
                />
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-4 self-stretch">
              <Button className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md bg-primary">
                <p className="text-base font-medium leading-6 text-primary-foreground font-sans">
                  Alterar senha
                </p>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col items-center gap-6 self-stretch md:hidden">
        <Select defaultValue="personalInfo" onValueChange={setSelected}>
          <SelectTrigger className="flex h-10 px-3 py-2 justify-between items-center self-stretch rounded-md border border-input bg-white w-full">
            <SelectValue placeholder="Selecione um serviço" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Serviços</SelectLabel>
              <SelectItem value="personalInfo">Informações pessoais</SelectItem>
              <SelectItem value="preference">Preferências</SelectItem>
              <SelectItem value="security">Segurança</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {selected === 'personalInfo' && (
          <div className="flex flex-col p-6 items-start gap-8 self-stretch rounded-lg border border-input bg-white shadow-sm">
            <div className="flex p-0 items-center gap-4 self-stretch">
              <div className="flex items-start gap-2 flex-[1_0_0]">
                <div className="flex flex-col items-start flex-[1_0_0]">
                  <p className="self-stretch text-2xl font-semibold leading-8 text-card-foreground font-sans">
                    Informações pessoais
                  </p>
                  <p className="self-stretch text-base font-normal leading-6 text-muted-foreground font-sans">
                    Gerencie seus dados cadastrais
                  </p>
                </div>
              </div>
            </div>
            <FormInfoContent
              form={form}
              onSubmit={onSubmit}
              isLoadingCep={isLoadingCep}
              userInfo={userInfo}
            />
          </div>
        )}

        {selected === 'preference' && (
          <div className="flex flex-col p-6 items-start gap-8 self-stretch rounded-lg border border-input bg-white shadow-sm">
            <div className="flex p-0 items-center gap-4 self-stretch">
              <div className="flex items-start gap-2 flex-[1_0_0]">
                <div className="flex flex-col items-start flex-[1_0_0]">
                  <p className="self-stretch text-2xl font-semibold leading-8 text-card-foreground font-sans">
                    Preferências de Notificaçãos
                  </p>
                  <p className="self-stretch text-base font-normal leading-6 text-muted-foreground font-sans">
                    Escolha como deseja receber notificações
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 self-stretch rounded-md border border-border">
              <div className="flex flex-col items-start gap-0 flex-[1_0_0]">
                <p className="self-stretch text-base font-medium leading-6 text-foreground font-sans">
                  E-mail
                </p>
                <p className="self-stretch text-sm font-normal leading-5 text-muted-foreground font-sans">
                  Receba notificações por e-mail
                </p>
              </div>
              <Switch className="flex items-start gap-2 bg-primary" />
            </div>

            <div className="flex justify-between items-center p-4 self-stretch rounded-md border border-border">
              <div className="flex flex-col items-start gap-0 flex-[1_0_0]">
                <p className="self-stretch text-base font-medium leading-6 text-foreground font-sans">
                  WhatsApp
                </p>
                <p className="self-stretch text-sm font-normal leading-5 text-muted-foreground font-sans">
                  Receba notificações por WhatsApp
                </p>
              </div>
              <Switch className="flex items-start gap-2 bg-primary" />
            </div>

            <div className="flex justify-between items-center p-4 self-stretch rounded-md border border-border">
              <div className="flex flex-col items-start gap-0 flex-[1_0_0]">
                <p className="self-stretch text-base font-medium leading-6 text-foreground font-sans">
                  Notificações Push
                </p>
                <p className="self-stretch text-sm font-normal leading-5 text-muted-foreground font-sans">
                  Receba notificações no navegador
                </p>
              </div>
              <Switch className="flex items-start gap-2 bg-primary" />
            </div>
            <PreferenceCard
              title="Preferências de Contato"
              description="Suas preferências de notificação serão aplicadas a todos os serviços e agendamentos. Você pode alterar essas configurações a qualquer momento."
            />
            <div className="flex flex-col justify-center gap-2 self-stretch">
              <Button className="flex h-10 px-4 py-2 justify-center items-center gap-2 bg-transparent">
                <p className="text-base font-medium leading-6 text-foreground font-sans">
                  Cancelar
                </p>
              </Button>
              <Button className="flex h-10 px-4 py-2 justify-center items-center gap-2">
                <p>Salvar alterações</p>
              </Button>
            </div>
          </div>
        )}

        {selected === 'security' && (
          <div className="flex flex-col p-6 items-start gap-8 self-stretch rounded-lg border border-input bg-white shadow-sm">
            <div className="flex p-0 items-center gap-4 self-stretch">
              <div className="flex items-start gap-2 flex-[1_0_0]">
                <div className="flex flex-col items-start flex-[1_0_0]">
                  <p className="self-stretch text-2xl font-semibold leading-8 text-card-foreground font-sans">
                    Segurança da Conta
                  </p>
                  <p className="self-stretch text-base font-normal leading-6 text-muted-foreground font-sans">
                    Gerencie a segurança da sua conta
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col min-w-[192px] items-start gap-2 self-stretch">
              <Label
                htmlFor="password"
                className="self-stretch text-base font-medium leading-none text-foreground font-sans"
              >
                {' '}
                Senha Atual{' '}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha atual"
                className="flex h-10 px-3 py-2 items-center gap-1 self-stretch rounded-md border border-input bg-background"
              ></Input>
            </div>

            <div className="flex flex-col min-w-[192px] items-start gap-2 self-stretch">
              <Label
                htmlFor="password"
                className="self-stretch text-base font-medium leading-none text-foreground font-sans"
              >
                {' '}
                Nova senha{' '}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua nova atual"
                className="flex h-10 px-3 py-2 items-center gap-1 self-stretch rounded-md border border-input bg-background"
              ></Input>
            </div>

            <div className="flex flex-col min-w-[192px] items-start gap-2 self-stretch">
              <Label
                htmlFor="password"
                className="self-stretch text-base font-medium leading-none text-foreground font-sans"
              >
                {' '}
                Confirmar nova senha{' '}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Confirmar nova atual"
                className="flex h-10 px-3 py-2 items-center gap-1 self-stretch rounded-md border border-input bg-background"
              ></Input>
            </div>
            <div className="flex flex-col justify-center gap-2 self-stretch">
              <Button className="flex h-10 px-4 py-2 justify-center items-center gap-2 rounded-md bg-primary">
                <p className="text-base font-medium leading-6 text-primary-foreground font-sans">
                  Alterar senha
                </p>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InfoContent;
