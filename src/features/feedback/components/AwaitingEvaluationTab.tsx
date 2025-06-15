import Pagination from '@/common/components/Pagination';
import RatingCard from '@/common/components/RatingCard';

type Rating = {
  title: string;
  comment: string;
  date: string;
  rating: number;
  answer: string;
};

const AwaitingEvaluationTab = () => {
  const mock: Rating[] = [];

  const qntPages = 1;
  const page = 1;

  return (
    <>
      <div className="flex flex-col gap-4">
        {mock.map((feedback) => (
          <RatingCard
            title={feedback.title}
            comment={feedback.comment}
            date={feedback.date}
            rating={feedback.rating}
            answer={feedback.answer}
          />
        ))}
      </div>

      <Pagination page={page} setPage={() => {}} total={qntPages} />
    </>
  );
};

export default AwaitingEvaluationTab;
