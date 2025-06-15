import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createNps } from '../services';

const schema = z.object({
  rating: z.number().min(0).max(5),
  feedback: z.string().max(500).optional(),
});

export type FormValues = z.infer<typeof schema>;

export default function useFeedbackHook() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const isRatingFilled = !!form.watch('rating');

  const onSubmit = async (
    data: FormValues,
    ticketId: string,
    handleNext: () => void
  ) => {
    const userId = parseInt(localStorage.getItem('id') ?? '');
    const request = {
      clientId: userId,
      rating: data.rating,
      ticketId: ticketId,
      feedback: data.feedback,
    };
    await createNps(request, handleNext);
  };

  return { form, isRatingFilled, onSubmit };
}
