import apiClient from '@/services/apiClient';

type Category = 'text' | 'number' | 'select';

type FieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'multiSelect'
  | 'file'
  | 'date';

export interface AddedField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  hint: string;
  value?: Date | File | string | number;
  display?: string;
  options?: string[];
  placeholder?: string;
}

export interface Service {
  id: string;
  requested: boolean;
  name: string;
  description: string;
  estimatedTime: number;
  createdAt: string;
  category: Category;
  availability: boolean;
  addedFields: AddedField[];
  rating?: number;
  ratingQuantity?: number;
  documents?: number;
  schedule?: string;
}

type ScheduleStatus = 'pending' | 'confirmed' | 'completed' | 'canceled';

export interface CreateScheduleDto {
  name: string;
  description: string;
  status: ScheduleStatus;
  date: Date;
  location: string;
  userName: string;
  userId: number;
  attendantId: number;
  serviceId?: string;
  reminderWpp?: boolean;
  reminderEmail?: boolean;
  observations?: string;
}

export type CreateScheduleResponse = Omit<CreateScheduleDto, 'date'> & {
  id: string;
  date: string;
  attendantName: string;
  protocol: number;
};

export interface ScheduleData extends CreateScheduleDto {
  finished: boolean;
  reminder: string[];
  protocol: number;
}

export type Info = {
  label: string;
  value: string;
};

export async function createSchedule(
  data: CreateScheduleDto
): Promise<CreateScheduleResponse> {
  try {
    const { data: response } = await apiClient.post<CreateScheduleResponse>(
      `/schedule`,
      data
    );
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Erro ao criar schedule'
    );
  }
}

export async function updateSchedule(
  id: string,
  data: Partial<CreateScheduleDto>
): Promise<void> {
  try {
    await apiClient.put<void>(`/schedule/${id}`, data);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Erro ao atualizar schedule'
    );
  }
}
