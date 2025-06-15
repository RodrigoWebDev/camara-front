'use-client';

import PageHeader from '@/common/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AwaitingEvaluationTab from '@/features/feedback/components/AwaitingEvaluationTab';
import MyReviewsTab from '@/features/feedback/components/MyReviewsTab';

const FeedbackPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen border-l bg-background">
      <PageHeader
        title="Feedback e Avaliações"
        description="Avalie os serviços utilizados e veja suas avaliações anteriores"
      />
      <Tabs defaultValue="myReviews" className="p-4 gap-4 flex-grow">
        <TabsList className="w-full">
          <TabsTrigger value="myReviews">Minhas avaliações</TabsTrigger>
          <TabsTrigger value="awaitingEvaluation">
            Aguardando avaliação
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="myReviews"
          className="flex flex-col justify-between"
        >
          <MyReviewsTab />
        </TabsContent>
        <TabsContent
          value="awaitingEvaluation"
          className="flex flex-col justify-between"
        >
          <AwaitingEvaluationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedbackPage;
