import apiClient from '@/services/apiClient';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'multiSelect'
  | 'file'
  | 'date';

type Category =
  | 'documents'
  | 'certificates'
  | 'complaints'
  | 'suggestions'
  | 'others';

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

export interface ServiceDTO {
  name: string;
  description: string;
  estimatedTime: number;
  category: string;
  availability: boolean;
  addedFields: Omit<AddedField, 'id'>[];
  rating?: number | null;
  ratingQuantity?: number | null;
  documents?: number | null;
  schedule?: string | null;
  status?: string | null;
  progress?: number | null;
  currentStep?: string | null;
  dateOfRequest?: string | null;
  nextStep?: string | null;
  lastUpdate?: string | null;
  estimatedCompletionDate?: string | null;
  id: string;
  requested?: boolean;
}

export interface CreateServiceResponse {
  id: string;
  requested: boolean;
  name: string;
  schedule: string;
  documents: number;
  rating: number;
  ratingQuantity: number;
  description: string;
  category: Category;
  availability: boolean;
  addedFields: AddedField[];
}

export async function createService(
  data: ServiceDTO
): Promise<CreateServiceResponse> {
  try {
    const { data: response } = await apiClient.post<CreateServiceResponse>(
      '/services',
      data
    );
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Erro ao tentar criar serviço.'
    );
  }
}
