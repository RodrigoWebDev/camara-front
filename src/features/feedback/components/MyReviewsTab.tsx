import Pagination from '@/common/components/Pagination';
import RatingCard from '@/common/components/RatingCard';

const MyReviewsTab = () => {
  const mock = [
    {
      title: 'Solicitação de documentos',
      date: '15/05/2023',
      comment: 'Excelente atendimento! Rápido e eficiente.',
      rating: 5,
      answer:
        'Agradecemos seu feedback! Ficamos felizes em saber que nosso serviço atendeu às suas expectativas.',
    },
    {
      title: 'Solicitação de documentos',
      date: '15/05/2023',
      comment: 'Bom atendimento, mas demorou um pouco mais do que o esperado.',
      rating: 4,
    },
    {
      title: 'Solicitação de documentos',
      date: '15/05/2023',
      comment: 'Atendimento regular. Poderia ser mais rápido.',
      rating: 3,
      answer:
        'Agradecemos seu feedback. Estamos trabalhando para melhorar nosso tempo de atendimento.',
    },
  ];

  const qntPages = 1;
  const page = 1;

  return (
    <>
      <div className="flex flex-col gap-4">
        {mock.map((feedback, i) => (
          <RatingCard
            key={i}
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

export default MyReviewsTab;
