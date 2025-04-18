import CustomAlert from '@/common/components/CustomAlert';
import InitialCard from '@/common/components/InitialCard';
import PageHeader from '@/common/components/PageHeader';
import ServiceCard from '@/common/components/ServiceCard';

const Initial = () => {
  const name = 'Pedro';

  return (
    <div className="flex items-center h-auto">
      <article className="flex flex-col h-[100vh] items-start shrink-0">
        <PageHeader
          pageHeaderTitle={`Olá, ${name}!`}
          pageHeaderText={
            'Bem-vindo(a) ao Portal de Serviços da Câmara de Vereadores de Florianópolis'
          }
        />
        <div className="flex flex-col p-4 items-start gap-4 flex-[1_0_0] self-stretch">
          <CustomAlert isVerify />
          <div className="flex items-start gap-4 self-stretch">
            <InitialCard />
            <InitialCard isSchedule />
            <ServiceCard />
          </div>
        </div>
      </article>
    </div>
  );
};

export default Initial;
