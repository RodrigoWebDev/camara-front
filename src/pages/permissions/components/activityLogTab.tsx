import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import Description from './description';
import Title from './tittle';
import { Button } from '@/common/components/ui/button';
import { ActivityLogTabProps } from '../interface';
import Modal from '@/common/components/Modal';
import { CalendarDays, Clock, User, MapPin, FileText } from 'lucide-react';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import useHook from '../hooks';

const ActivityLogTab = ({ data }: ActivityLogTabProps) => {
  const {
    setOpenModalActivityLog,
    setSelectedLog,
    openModalActivityLog,
    selectedLog,
  } = useHook();

  return (
    <Card className="p-5">
      <div className="flex items-start md:items-center flex-col md:flex-row md:flex-wrap">
        <div className="flex flex-col items-start flex-[1_0_0]">
          <Title text="Usuários do Sistema" />
          <Description text="Gerencie os usuários e suas permissões de acesso." />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="text-muted-foreground">Data/Hora</TableHead>
            <TableHead className="text-muted-foreground">Usuário</TableHead>
            <TableHead className="text-muted-foreground">Ação</TableHead>
            <TableHead className="text-muted-foreground">IP</TableHead>
            <TableHead className="text-muted-foreground">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(
            ({ date: dateIso, email, action, browser, user, ip, os }) => {
              const date = new Date(dateIso);

              return (
                <TableRow>
                  <TableCell className="py-5 font-medium">
                    {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{action}</TableCell>
                  <TableCell>{ip}</TableCell>
                  <TableCell>
                    <Modal
                      open={openModalActivityLog}
                      onOpenChange={setOpenModalActivityLog}
                      tittle="Detalhes do Log de Atividade"
                      description="Informações detalhadas sobre a atividade registrada no sistema."
                      classNameContent="!max-w-[90%] md:!max-w-[576px]"
                      classNameHeader="gap-0"
                      classNameTittle="text-left"
                      classNameDescription="text-left"
                      classNameButtonX="w-full md:w-auto"
                      button={
                        <Button
                          onClick={() => {
                            setOpenModalActivityLog(true);
                            setSelectedLog({
                              date: dateIso,
                              email,
                              action,
                              ip,
                              user,
                              browser,
                              os,
                            });
                          }}
                          className="p-2"
                          variant="outline"
                        >
                          Visualizar
                        </Button>
                      }
                    >
                      <div className="flex flex-col gap-4">
                        <Card className="p-4 mt-3">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                              <CalendarDays className="w-4 h-4 mr-1.5 text-muted-foreground" />
                              <label>
                                <span className="font-medium mr-1.5">
                                  Data:
                                </span>
                                <span>
                                  {new Date(
                                    selectedLog?.date || ''
                                  ).toLocaleDateString()}
                                </span>
                              </label>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1.5 text-muted-foreground" />
                              <label>
                                <span className="font-medium mr-1.5">
                                  Hora:
                                </span>
                                <span>
                                  {new Date(
                                    selectedLog?.date || ''
                                  ).toLocaleTimeString()}
                                </span>
                              </label>
                            </div>
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1.5 text-muted-foreground" />
                              <label>
                                <span className="font-medium mr-1.5">
                                  Usuário:
                                </span>
                                <span>
                                  {`${selectedLog?.user} (${selectedLog?.email})`}
                                </span>
                              </label>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1.5 text-muted-foreground" />
                              <label>
                                <span className="font-medium mr-1.5">IP:</span>
                                <span>{selectedLog?.ip}</span>
                              </label>
                            </div>
                          </div>
                        </Card>
                        <span className="font-medium text-lg leading-none">
                          Ação realizada
                        </span>
                        <Card className="p-4">
                          <div>
                            <span className="font-medium">
                              Criação de serviço
                            </span>
                            <p className="text-muted-foreground leading-5">
                              Criou o serviço '{selectedLog?.action}' com ID
                              #12345
                            </p>
                          </div>
                        </Card>
                        <span className="font-medium text-lg leading-none">
                          Outros
                        </span>
                        <Card className="p-4">
                          <div className="flex w-full">
                            <div className="w-full">
                              <div className="flex flex-col leading-5 mb-3">
                                <span className="text-muted-foreground">
                                  Navegador
                                </span>
                                <span>{selectedLog?.browser}</span>
                              </div>
                              <div className="flex flex-col leading-5">
                                <span className="text-muted-foreground">
                                  Entidade
                                </span>
                                <span>{selectedLog?.action}</span>
                              </div>
                            </div>
                            <div className="w-full">
                              <div className="flex flex-col leading-5 mb-3">
                                <span className="text-muted-foreground">
                                  Sistema Operacional
                                </span>
                                <span>{selectedLog?.os}</span>
                              </div>
                              <div className="flex flex-col leading-5">
                                <span className="text-muted-foreground">
                                  ID da Entidade
                                </span>
                                <span>12345</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                        <div className="flex mt-4 justify-end !flex-col md:!flex-row">
                          <AlertDialogCancel
                            onClick={() => {
                              setOpenModalActivityLog(false);
                            }}
                          >
                            <Button
                              variant="outline"
                              className="w-full md:w-auto"
                            >
                              Fechar
                            </Button>
                          </AlertDialogCancel>
                          <Button
                            className="w-full md:w-auto md:ml-2 mt-4 md:mt-0"
                            type="submit"
                          >
                            <FileText />
                            Exportar log
                          </Button>
                        </div>
                      </div>
                    </Modal>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ActivityLogTab;
