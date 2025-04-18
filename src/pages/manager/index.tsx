import SearchInput from '@/common/components/SearchInput';
import Notification from '@/common/components/Notification';
import { Button } from '@/components/ui/button';
import {
  Check,
  Settings,
  Download,
  Users,
  Clock3,
  CircleCheckBig,
  DollarSign,
  TriangleAlert,
  Activity,
  TrendingUp,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import CustomAlert from '@/common/components/CustomAlert';
import StatusCardManager from '@/common/components/StatusCardManager';
import PieChartCard from '@/common/components/PieChart';
import LineChartCard from '@/common/components/LineChart';
import BarChartCard from '@/common/components/BarChart';

const Manager = () => {
  const mock1 = [
    {
      name: 'informations',
      label: 'Informações',
      value: 200,
      fill: 'var(--chart-1)',
    },
    {
      name: 'documents',
      label: 'Documentos',
      value: 275,
      fill: 'var(--chart-2)',
    },
    { name: 'others', label: 'Outros', value: 90, fill: 'var(--chart-3)' },
    {
      name: 'certificates',
      label: 'Certidões',
      value: 173,
      fill: 'var(--chart-4)',
    },
    {
      name: 'complaints',
      label: 'Reclamações',
      value: 187,
      fill: 'var(--chart-5)',
    },
  ];

  const mock2 = [
    { month: 'Janeiro', value: 186 },
    { month: 'Fevereiro', value: 305 },
    { month: 'Março', value: 237 },
    { month: 'Abril', value: 73 },
    { month: 'Maio', value: 209 },
    { month: 'Junho', value: 214 },
  ];

  const mock3 = [
    { name: 'Atendimento', value1: 186, value2: 80 },
    { name: 'Jurídico', value1: 305, value2: 200 },
    { name: 'Protocolo', value1: 237, value2: 120 },
    { name: 'Administrativo', value1: 73, value2: 190 },
    { name: 'Outros', value1: 209, value2: 130 },
  ];

  return (
    <div>
      <section className="h-20 flex justify-between items-center px-4 border-b border-[var(--border)]">
        <SearchInput placeholder="Buscar atendimento, cidadão ou protocolo" />
        <div className="flex gap-4">
          <Notification hasNotification={true} />
          <Button variant="ghost">
            <Check className="text-[var(--primary)]" />
          </Button>
        </div>
      </section>
      <div className="flex flex-col gap-8 pt-8 p-4">
        <section className="flex items-end justify-between">
          <div>
            <h1 className="text-[var(--card-foreground)] font-sans text-2xl font-semibold leading-8">
              Dashboard
            </h1>
            <p className="text-[var(--muted-foreground)] font-sans font-normal leading-6">
              Visão geral do desempenho do sistema e métricas-chave
            </p>
          </div>
          <div className="flex gap-4">
            <Select defaultValue="last30">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last30">Últimos 30 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Settings />
              <span>Configurar dashboard</span>
            </Button>
            <Button>
              <Download />
              <span>Exportar relatório</span>
            </Button>
          </div>
        </section>
        <section className="flex gap-4">
          <StatusCardManager
            number={1248}
            title="Total de Atendimentos"
            Icon={Users}
            statistic={12}
          />
          <StatusCardManager
            number={3.2}
            title="Tempo Médio de Resolução"
            Icon={Clock3}
            statistic={-8.1}
            days={true}
          />
          <StatusCardManager
            number={94.3}
            title="Taxa de Resolução"
            Icon={CircleCheckBig}
            statistic={2.1}
            percentage={true}
          />
          <StatusCardManager
            number={8.7}
            title="NPS"
            Icon={DollarSign}
            statistic={0.3}
          />
        </section>
        <section>
          <h2 className="text-[var(--card-foreground)] font-sans text-lg font-semibold leading-7 mb-4">
            Alertas do sistema
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <CustomAlert
              title="Tempo de espera elevado"
              description='O tempo médio de espera para o serviço "Denúncia" está 30% acima do normal. Recomenda-se alocar mais recursos.'
              Icon={TriangleAlert}
              isDestructive={true}
            />
            <CustomAlert
              title="Queda na satisfação"
              description='O serviço "Solicitação de Documentos" teve uma queda de 15% na satisfação nos últimos 7 dias.'
              Icon={TriangleAlert}
              isDestructive={true}
            />
            <CustomAlert
              title="Alto volume de atendimentos"
              description="O volume de atendimentos aumentou 25% em relação à média. Considere aumentar a equipe de atendimento."
              Icon={Activity}
            />
            <CustomAlert
              title="Tendência de crescimento"
              description='O serviço "Certidão Negativa" apresenta tendência de crescimento de 18% para o próximo mês.'
              Icon={TrendingUp}
            />
          </div>
        </section>
        <section>
          <h2 className="text-[var(--card-foreground)] font-sans text-lg font-semibold leading-7 mb-4">
            Alertas do sistema
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <PieChartCard
              title="Atendimentos por Tipo"
              description="Distribuição de atendimentos por categoria"
              data={mock1}
              height={21.875}
            />
            <LineChartCard
              title="Atendimentos por Período"
              description="Evolução de atendimentos ao longo do tempo"
              data={mock2}
              label="Atendimentos"
              height={21.875}
            />
            <BarChartCard
              title="Atendimentos por Departamento"
              description="Comparativo de volume e eficiência entre departamentos"
              className="col-span-2"
              labels={['Atendimentos', 'Tempo médio']}
              data={mock3}
              height={21.875}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Manager;
