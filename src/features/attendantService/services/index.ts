import { PaginationType } from '@/common/utils/types';
import { UserResponse } from '@/features/serviceSolicitation/services';
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

export interface ServiceResponse {
  id: string;
  name: string;
  schedule?: string;
  documents?: number;
  rating?: number;
  ratingQuantity?: number;
  description: string;
  status?: string;
  progress?: number;
  currentStep?: string;
  dateOfRequest?: string;
  estimatedTime: number;
  nextStep?: string;
  lastUpdate?: string;
  estimatedCompletionDate?: string;
  category: Category;
  availability: boolean;
  addedFields: AddedField[];
  createdAt: string;
  updatedAt: string;
}

export async function getServices(): Promise<ServiceResponse[]> {
  try {
    const { data: response } =
      await apiClient.get<PaginationType<ServiceResponse>>('/services');
    return response.results;
  } catch (error: any) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      'Erro ao tentar buscar serviços.';
    alert(msg);
    throw new Error(error.response?.data?.message || error.message || msg);
  }
}

export async function getUserByDocument(
  document: string
): Promise<UserResponse | null> {
  try {
    const { data: response } = await apiClient.get<UserResponse>(
      `users/document/${document}`
    );
    return response;
  } catch (error: any) {
    return null;
  }
}
