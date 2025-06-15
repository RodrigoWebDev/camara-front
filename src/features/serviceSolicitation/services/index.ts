/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddedField } from '@/features/newService/services';
import apiClient from '@/services/apiClient';

type Category =
  | 'documents'
  | 'certificates'
  | 'complaints'
  | 'suggestions'
  | 'others';

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

export interface UserResponse {
  user_id: number;
  full_name: string;
  email: string;
  roleName: string;
  phone?: string | null;
  password_hash: string;
  status: string;
  created_at: string;
  updated_at: string;
  role_id: string;
  document: string;
  birth_date: string;
  gender: string;
  photo?: string;
  cep?: string;
  address?: string;
  state?: string;
  city?: string;
  number?: string;
  servicePermissions: string[];
}

export interface NewUserResponse extends UserResponse {
  isNew: boolean;
}

export interface FileResponse {
  url: string;
}

type Field = {
  name: string;
  value: File | Date | string | number;
};

export interface CreateTicketDto {
  user_id: number;
  service_id: string;
  current_status: string;
  fields: Field[];
  whatsapp_number?: string | null;
  attendantId?: number;
  attendantName?: string;
}

export interface CreateTicketResponse extends CreateTicketDto {
  id: string;
  protocol: number;
  created_at: string;
  updated_at: string;
}

export interface CreateNpsDto {
  ticketId: string;
  clientId: number;
  attendantId?: number;
  rating: number;
  feedback?: string;
}

interface CreateNpsResponse extends CreateNpsDto {
  id: string;
}

export interface CreateTicketHistoryDto {
  ticket_id: string;
  action: string;
  message?: string;
  attachment?: string;
}

export interface CreateTicketHistoryResponse extends CreateTicketHistoryDto {
  history_id: number;
  performed_by: number;
  performedByName: string | null;
  created_at: Date;
}

export async function getService(id: string): Promise<ServiceResponse> {
  try {
    const { data: response } = await apiClient.get<ServiceResponse>(
      `/services/${id}`
    );
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Erro ao buscar serviço'
    );
  }
}

export async function createTicket(
  data: CreateTicketDto
): Promise<CreateTicketResponse> {
  try {
    const { data: response } = await apiClient.post<CreateTicketResponse>(
      `/tickets`,
      data
    );
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Erro ao criar ticket'
    );
  }
}

export async function createTicketHistory(
  data: CreateTicketHistoryDto
): Promise<CreateTicketHistoryResponse> {
  try {
    const { data: response } =
      await apiClient.post<CreateTicketHistoryResponse>(
        `/ticket-history`,
        data
      );
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Erro ao criar histórico do ticket'
    );
  }
}

export async function createNps(
  data: CreateNpsDto,
  handleNext: () => void
): Promise<CreateNpsResponse> {
  try {
    const { data: response } = await apiClient.post<CreateNpsResponse>(
      '/nps',
      data
    );
    handleNext();
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Erro ao criar feedback'
    );
  }
}

export async function getUser(userId: number): Promise<UserResponse> {
  try {
    const { data: response } = await apiClient.get<UserResponse>(
      `/users/${userId}`
    );
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Erro ao buscar usuário'
    );
  }
}

export async function getAllUser(): Promise<UserResponse[]> {
  try {
    const { data: response } = await apiClient.get<UserResponse[]>('/users');
    return response;
  } catch (error: any) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      'Erro ao buscar os usuários';

    alert(msg);
    throw new Error(msg);
  }
}

export async function uploadFile(file: File): Promise<FileResponse> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const { data: response } = await apiClient.post<FileResponse>(
      '/files/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Erro ao fazer upload do arquivo.'
    );
  }
}
