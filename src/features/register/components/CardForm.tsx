import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { Button } from '@/common/components/ui/button';
import { ArrowLeft, Aperture } from 'lucide-react';
import { ICardForm } from '../model';

const CardForm = ({
  form,
  isAllFilled,
  inputCPFRef,
  inputBirthRef,
  onSubmit,
}: ICardForm) => {
  return (
    <Card className="min-w-[35%]">
      <CardHeader className="gap-0">
        <div className="flex items-center justify-between">
          <div className="flex">
            <Button variant="ghost">
              <ArrowLeft />
            </Button>
            <CardTitle className="text-2xl">Criar uma conta</CardTitle>
          </div>
          <Aperture />
        </div>
        <CardDescription>Preencha com seus dados pessoais</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full items-center"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome completo" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CPF"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu CPF"
                      {...field}
                      ref={inputCPFRef}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Data de nascimento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="DD/MM/AAA"
                      {...field}
                      ref={inputBirthRef}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Gênero</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu gênero" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                      <SelectItem value="notAnswer">
                        Prefiro não responder
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button
              disabled={!isAllFilled}
              className="w-full bg-[#0369A1]"
              type="submit"
            >
              Enviar código de recuperação
            </Button>
            <div className="flex items-center justify-center text-center p-1">
              <p className="text-sm mr-2">Lembrou sua senha?</p>
              <span className="text-[#0369A1] font-medium">Faça login</span>
            </div>
            <hr className="my-5" />
            <p className="text-center text-[#71717A] text-sm">
              © 2025 Câmara de Vereadores de Florianópolis
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CardForm;
